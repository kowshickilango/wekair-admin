import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import axiosInstance from '../../utils/axios';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { EmissionTest } from '@/models/EmissionTest.interface';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { AxiosRequestConfig } from 'axios';
import { bearerToken } from '@/utils/constants';
import { ToastType, appToast } from '@/utils/appToast';
import VehiclePreviewTable from '@/components/PreviewTable/VehiclePreviewTable';

const Index = ({
  testsData,
  regNo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [tests, setTests] = useState(testsData);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSendNotice = () => {
    setIsLoading(true);
    const config: AxiosRequestConfig = {
      headers: { Authorization: `Bearer ${bearerToken}` },
    };
    axiosInstance
      .post(`vehicle/mail/${regNo}`, {}, config)
      .then((res) => {
        appToast('Notice sent successfully');
        setIsLoading(false);
      })
      .catch((err) => {
        console.log('mail error', err);
        appToast('Something went wrong please try again', ToastType.error);
        setIsLoading(false);
      });
  };

  if (tests.length > 0) {
    return (
      <Box maxWidth={1080} mx='auto' my={4}>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='flex-start'
          spacing={8}
          mb={2}
        >
          <Typography variant='h4'>{router.query.regNo}</Typography>
          <Button
            variant='outlined'
            color='error'
            onClick={onSendNotice}
            disabled={isLoading}
          >
            {isLoading ? 'Loading' : 'Send Notice'}
          </Button>
        </Stack>
        <VehiclePreviewTable emissions={tests} />
      </Box>
    );
  } else {
    return (
      <Box maxWidth={1080} width='90%' mx='auto' my={4}>
        <Typography variant='h4' mt={8} align='center'>
          No Records Found!
        </Typography>
      </Box>
    );
  }
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const config: AxiosRequestConfig = {
    headers: { Authorization: `Bearer ${bearerToken}` },
  };
  const regNo = context.params?.regNo;

  const { data } = await axiosInstance.get<EmissionTest[]>(
    `emission-tests/vehicle/${regNo}`,
    config
  );

  return {
    props: { testsData: data, regNo },
  };
}

export default Index;
