import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

import { useFetchEntriesByYearMonth } from "../hooks/use-fetch-entries-by-year-month";
import EntriesTableRow from './EntiresTableRow';
import { groupBy, map } from 'lodash';
import { Divider, Stack, TableCell, TableRow } from '@mui/material';
import dayjs from 'dayjs';

function EntriesTable() {
  const { data, error, isFetching } = useFetchEntriesByYearMonth();

  const dataGroupByCreatedAt = groupBy(data, (entry) => (
    // Grab substring before 'T'
    entry.createdAt.substring(0, entry.createdAt.indexOf("T"))
  ));

  let content;
  if (isFetching) {
    content = (
      <Stack spacing={12}>
        <Box>
          <br />
          <Skeleton height={20} animation="wave" />
          <Skeleton height={40} animation="wave" />
          <br />
          <Skeleton height={20} animation="wave" />
          <Skeleton height={40} animation="wave" />
          <br />
          <Skeleton height={20} animation="wave" />
          <Skeleton height={40} animation="wave" />
        </Box>
      </Stack>
    );
  } else if (error) {
    content = <div>Error loading entries</div>
  } else {
    content = (
      <>
        {map(dataGroupByCreatedAt, (data, key) => {
          return (
            <Box key={key}>
              <Divider />
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 360 }} size="small" aria-label="simple dense table">
                  <TableBody>
                    <TableRow>
                    <TableCell width={"33.33%"} align="left">
                      {dayjs(key).format('MM/DD/YYYY')}
                      </TableCell>
                    <TableCell width={"33.33%"} align="center">
                      {dayjs(key).format('MM/DD/YYYY')}
                      </TableCell>
                    <TableCell width={"33.33%"} align="right">
                      {dayjs(key).format('MM/DD/YYYY')}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 360 }} size="small" aria-label="simple dense table">
                  <TableBody>
                    {data.map((row) => {
                      return (
                        <EntriesTableRow row={row} key={row.id} />
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <br />
            </Box>
          );
        })}
      </>
    );
  }

  return (
    <>
      { content }
    </>
  );
}

export default EntriesTable;