import { EmissionTest } from '@/models/EmissionTest.interface';
import { Vehicle } from '@/models/Vehicle';
import { Box, Stack, Typography } from '@mui/material';

const VehicleCard = ({ vehicle }: { vehicle: Vehicle }) => {
  return (
    <Box border={1} borderRadius={6} px={2} py={4}>
      <Typography variant='h4' mb={2}>
        {vehicle.regNumber}
      </Typography>
      <Stack direction='row' justifyContent='space-between' mb={2}>
        <Typography variant='body1'>Type</Typography>
        <Typography variant='body1'>
          {vehicle.type.replace('-', ' ').charAt(0).toUpperCase() +
            vehicle.type.replace('-', ' ').slice(1)}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='space-between' mb={2}>
        <Typography variant='body1'>Year of Manufacture</Typography>
        <Typography variant='body1'> {vehicle.yearOfManufacture}</Typography>
      </Stack>
    </Box>
  );
};

export default VehicleCard;
