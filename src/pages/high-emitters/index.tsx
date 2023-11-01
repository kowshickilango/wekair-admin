import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import axios from '../../utils/axios';
import Stack from '@mui/system/Stack';
import PreviewTable from '../../components/PreviewTable/PreviewTable';
import { getSession, useSession } from 'next-auth/react';
import { useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { ToastType, appToast } from '@/utils/appToast';
import { bearerToken } from '@/utils/constants';
import { AxiosRequestConfig } from 'axios';
import { EmissionTest } from '@/models/EmissionTest.interface';
import axiosInstance from '../../utils/axios';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

const Index = ({
  testsData,
  totalCount,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [tests, setTests] = useState(testsData);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const [page, setPage] = useState(1);

  const handlePageChange = (e: any, value: number) => {
    setIsLoading(true);
    const headers = {
      Authorization: `Bearer ${bearerToken}`,
    };
    axios
      .get(`emission-tests/high-emitters?page=${value - 1}`, {
        headers,
      })
      .then((res) => {
        setTests(res.data.tests);
        setIsLoading(false);
        setPage(value);
      })
      .catch((err) => {
        appToast('Something went wrong!', ToastType.error);
        setIsLoading(false);
      });
  };

  return (
    <Box maxWidth={1080} width='90%' mx='auto' my={4}>
      {isLoading ? (
        <Skeleton variant='rectangular' width='fill' height={200} />
      ) : (
        <>
          <Typography variant='h4' mb={2}>
            High Emitting Vehicels
          </Typography>
          <PreviewTable emissions={tests} />
          <Stack direction='row' justifyContent='flex-end' marginTop={8}>
            <Pagination
              onChange={handlePageChange}
              count={Math.ceil(totalCount / 10)}
              variant='outlined'
              page={page}
              color='primary'
            />
          </Stack>
        </>
      )}
    </Box>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const config: AxiosRequestConfig = {
      headers: { Authorization: `Bearer ${bearerToken}` },
    };
    const { data } = await axiosInstance.get<{
      tests: EmissionTest[];
      totalCount: number;
    }>('emission-tests/high-emitters', config);
    return {
      props: { testsData: data.tests, totalCount: data.totalCount },
    };
  } catch (err) {
    return { notFound: true };
  }
}

export default Index;
