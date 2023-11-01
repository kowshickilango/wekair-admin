import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';

type FormFied = {
  email: string;
  password: string;
};

export default function Index() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormFied>();
  const onSubmit = async (data: FormFied) => {};

  return (
    <Box mt={4} textAlign='center' p={4} border={2} borderRadius={6}>
      <Typography variant='h4' fontWeight='600' color='primary.main' mb={4}>
        WEKAIR
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant='h4' mb={4} textAlign='left'>
          Welcome
        </Typography>
        <Stack direction='column' spacing={2}>
          <Controller
            control={control}
            name='email'
            render={({ field }) => (
              <TextField {...field} variant='outlined' label='E-mail' />
            )}
          />
          <Controller
            control={control}
            name='password'
            render={({ field }) => (
              <TextField {...field} variant='outlined' label='Password' />
            )}
          />
        </Stack>
        <Box textAlign='left' mb={6} mt={2}>
          <Link href='/sign-up'> Create Account</Link>
        </Box>
        <Button variant='contained' color='primary'>
          Sign in
        </Button>
      </form>
    </Box>
  );
}
