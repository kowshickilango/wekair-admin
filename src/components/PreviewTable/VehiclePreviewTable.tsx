import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Link from 'next/link';
import { EmissionTest } from '@/models/EmissionTest.interface';
import formatDate from '@/utils/formatDate';
import { useRouter } from 'next/router';
import { CO_LIMIT } from '@/utils/constants';

const VehiclePreviewTable = ({ emissions }: { emissions: EmissionTest[] }) => {
  const router = useRouter();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Vehicle</TableCell>
            <TableCell align='center'>Date</TableCell>
            <TableCell align='center'>CO2</TableCell>
            <TableCell align='center'>O2</TableCell>
            <TableCell align='center'>Air Filter</TableCell>
            <TableCell align='center'>Other Issue</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {emissions.length > 0 &&
            emissions.map((emi) => (
              <>
                <TableRow
                  onClick={() => router.push(`test/${emi._id}`)}
                  sx={{
                    '&:last-child td, &:last-child th': {
                      border: 0,
                    },
                  }}
                >
                  <TableCell>{emi.vehicle.regNumber}</TableCell>
                  <TableCell align='center'>
                    {formatDate(emi.createdAt)}
                  </TableCell>
                  <TableCell
                    align='center'
                    className={emi.CO2 > CO_LIMIT ? 'txt-red' : undefined}
                  >
                    {emi.CO2}
                  </TableCell>
                  <TableCell
                    align='center'
                    className={emi.O2 ? 'txt-red' : undefined}
                  >
                    {emi.O2.toString()}
                  </TableCell>
                  <TableCell
                    align='center'
                    className={emi.airFilter ? 'txt-red' : undefined}
                  >
                    {emi.airFilter.toString()}
                  </TableCell>
                  <TableCell
                    align='center'
                    className={emi.otherIssue ? 'txt-red' : undefined}
                  >
                    {emi.otherIssue.toString()}
                  </TableCell>
                </TableRow>
              </>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VehiclePreviewTable;
