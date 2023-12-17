import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

import { useFetchEntriesQuery } from '../store';
import EntriesTableRow from './EntiresTableRow';

function EntriesTable() {
  const { data, error, isFetching } = useFetchEntriesQuery();

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