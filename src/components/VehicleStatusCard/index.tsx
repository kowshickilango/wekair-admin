import { EmissionTest } from "@/models/EmissionTest.interface";
import { CO_LIMIT } from "@/utils/constants";
import formatDate from "@/utils/formatDate";
import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";

const VehicleStatusCard = ({ test }: { test: EmissionTest }) => {
  return (
    <Box border={1} borderRadius={6} px={2} py={4}>
      <Link href={`/vehicle/${test.vehicle.regNumber}`}>
        <Typography variant="h4">{test.vehicle.regNumber}</Typography>
      </Link>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="subtitle1">Tested on:</Typography>{" "}
        <Typography variant="subtitle1">
          {formatDate(test.createdAt)}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="body1">CO2</Typography>
        <Typography
          variant="body1"
          className={test.CO2 > CO_LIMIT ? "txt-red" : undefined}
        >
          {test.CO2}
        </Typography>
      </Stack>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Fault Status
      </Typography>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="body1">O2</Typography>
        <Typography variant="body1" className={test.O2 ? "txt-red" : undefined}>
          {test.O2 ? "True" : "False"}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="body1">Air Filter</Typography>
        <Typography
          variant="body1"
          className={test.airFilter ? "txt-red" : undefined}
        >
          {test.airFilter ? "True" : "False"}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="body1">Catalytic Converter</Typography>
        <Typography
          variant="body1"
          className={test.catalyticConverter ? "txt-red" : undefined}
        >
          {test.catalyticConverter ? "True" : "False"}
        </Typography>
      </Stack>
    </Box>
  );
};

export default VehicleStatusCard;
