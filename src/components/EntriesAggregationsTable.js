import currency from 'currency.js';
import {
  capitalize
} from 'lodash';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

import { useFetchEntriesAggregationsQuery } from '../store';
import { Divider, Stack } from '@mui/material';
const { ENTRY } = require('../constants');


function EntriesAggregationsTable() {
  const { data, error, isFetching } = useFetchEntriesAggregationsQuery();

  let content;

  if (isFetching) {
    content = (
      <Stack spacing={12}>
        <Box>
          <Divider />
          <Skeleton height={20} animation="wave" />
          <Skeleton height={40} animation="wave" />
          <Divider />
        </Box>
      </Stack>
    );
  } else if (error) {
    content = <div>Error loading entries aggregations</div>
  } else {
    content = (
      <>
        <TableContainer component={Paper}>
          <Table sx={{
            minWidth: 360,
            '.MuiTableRow-root.MuiTableRow-hover': {
              '&:hover': {
                backgroundColor: '#fff',
              }
            }
            }} aria-label="simple table">
            <TableBody>
              <TableRow
                hover
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell sx={{ padding: '6px' }} align="center" component="th" scope="row">
                  <div>{capitalize(ENTRY.INCOME)}</div>
                  <Box sx={{ color: 'success.main' }}>
                    {currency(data.income, { separator: ',', symbol: '$'}).format()}
                  </Box>
                </TableCell>
                <TableCell sx={{ padding: '6px' }} align="center">
                  <div>{capitalize(ENTRY.EXPENSE)}</div>
                  <Box sx={{ color: 'error.main' }}>
                    {currency(data.expense, { separator: ',', symbol: '$'}).format()}
                  </Box>
                </TableCell>
                <TableCell sx={{ padding: '6px' }} align="center">
                  <div>{capitalize(ENTRY.TOTAL)}</div>
                  <Box sx={{ fontWeight: 'medium' }}>
                    {currency(data.total, { separator: ',', symbol: '$'}).format()}
                  </Box>
                </TableCell>
              </TableRow>
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

export default EntriesAggregationsTable;