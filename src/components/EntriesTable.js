import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

import { useFetchEntriesByYearMonthQuery } from '../store';
import EntriesTableRow from './EntiresTableRow';
import { groupBy, map } from 'lodash';
import { Divider, TableCell, TableRow } from '@mui/material';
import dayjs from 'dayjs';

function EntriesTable() {
  const { data, error, isFetching } = useFetchEntriesByYearMonthQuery();

  const dataGroupByCreatedAt = groupBy(data, (entry) => (
    // Grab substring before 'T'
    entry.createdAt.substring(0, entry.createdAt.indexOf("T"))
  ));

  let content;
  if (isFetching) {
    content = (
      <Box sx={{ width: 300 }}>
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
      </Box>
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