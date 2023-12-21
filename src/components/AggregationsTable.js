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

const { ENTRY } = require('../constants');

function AggregationsTable({ data }) {
const skeleton = <Skeleton height={20} animation="wave" />

  return (
    <TableContainer component={Paper}>
      <Table sx={{
        minWidth: 360,
        '.MuiTableRow-root.MuiTableRow-hover': {
          '&:hover': {
            backgroundColor: 'white',
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
                { data
                  ? currency(data.income, { separator: ',', symbol: '$'}).format()
                  : skeleton
                }
              </Box>
            </TableCell>
            <TableCell sx={{ padding: '6px' }} align="center">
              <div>{capitalize(ENTRY.EXPENSE)}</div>
              <Box sx={{ color: 'error.main' }}>
                { data
                  ? currency(data.expense, { separator: ',', symbol: '$'}).format()
                  : skeleton
                }
              </Box>
            </TableCell>
            <TableCell sx={{ padding: '6px' }} align="center">
              <div>{capitalize(ENTRY.TOTAL)}</div>
              <Box sx={{ fontWeight: 'medium' }}>
                { data
                  ? currency(data.total, { separator: ',', symbol: '$'}).format()
                  : skeleton
                }
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AggregationsTable;