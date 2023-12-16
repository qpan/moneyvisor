import currency from 'currency.js';
import className from 'classnames';
import {
  toLower,
  startCase
} from 'lodash';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

import { useFetchEntriesQuery } from '../store';
import Emoji from '../components/Emoji';
const { ENTRY } = require('../constants');

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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 360 }} size="small" aria-label="simple dense table">
          <TableBody>
            {data.map((row) => {
              const entryTypeClasses = className(
                { 'success.main': ENTRY.INCOME === row.type.name },
                { 'error.main': ENTRY.EXPENSE === row.type.name }
              );

              return (
                <TableRow
                  key={row.id}
                  hover
                  onClick={() => console.log(row.id)}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': { cursor: 'pointer' }
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">
                    {row.category.emoji && <Emoji unicode={row.category.emoji} />}&nbsp;&nbsp;
                    <span>{startCase(toLower(row.category.name))}</span>
                  </TableCell>
                  <TableCell align="left">
                    <div>{row.note}</div>
                    <div>
                      {row.account.emoji && <Emoji unicode={row.account.emoji} />}&nbsp;&nbsp;
                      {startCase(toLower(row.account.name))}
                      </div>
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ color: entryTypeClasses }}>
                      {currency(row.amount, { separator: ',', symbol: '$'}).format()}
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <>
      { content }
    </>
  );
}

export default EntriesTable;