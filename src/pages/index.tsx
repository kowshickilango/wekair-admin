import axios from '../utils/axios';
import { getSession, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import Link from 'next/link';
import TollTerminalChart from '../components/TollTerminalChart/TollTerminalChart';
import { bearerToken } from '@/utils/constants';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import axiosInstance from '../utils/axios';
import { AxiosRequestConfig } from 'axios';
import { EmissionTest } from '@/models/EmissionTest.interface';
import { config } from 'process';
import PreviewTable from '@/components/PreviewTable/PreviewTable';

const Index = ({
  testsData,
  totalCount,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Box maxWidth={1080} mx='auto' my={4}>
      <Typography variant='h4' mb={2}>
        Latest High Emitting Vehicels
      </Typography>
      <PreviewTable emissions={testsData} />
      <Stack direction='row' justifyContent='flex-end' marginTop={4}>
        <Link href='high-emitters'>
          <Stack direction='row' alignItems='center' spacing={2}>
            <Typography variant='subtitle2'>More</Typography>
            <ArrowForwardIosRoundedIcon />
          </Stack>
        </Link>
      </Stack>
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
