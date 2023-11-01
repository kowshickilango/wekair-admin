import VehicleStatusCard from '@/components/VehicleStatusCard';
import { EmissionTest } from '@/models/EmissionTest.interface';
import axiosInstance from '@/utils/axios';
import { bearerToken } from '@/utils/constants';
import { Box } from '@mui/material';
import { AxiosRequestConfig } from 'axios';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

const Index = ({
  test,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Box mt={4}>
      <VehicleStatusCard test={test} />
    </Box>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const config: AxiosRequestConfig = {
    headers: { Authorization: `Bearer ${bearerToken}` },
  };
  const tid = context.params?.tid;

  const testRes = await axiosInstance.get<EmissionTest>(
    `emission-tests/${tid}`,
    config
  );

  return {
    props: { test: testRes.data },
  };
}

export default Index;
