import className from 'classnames';
import currency from 'currency.js';
import {
  toLower,
  startCase,
} from 'lodash';

import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import Emoji from '../components/Emoji';
import { useState } from 'react';
import EditTransaction from './EditTransaction';
const { ENTRY } = require('../constants');

function EntriesTableRow({ row }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = (entry) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const entryTypeClasses = className(
    { 'success.main': ENTRY.INCOME === row.type.name },
    { 'error.main': ENTRY.EXPENSE === row.type.name }
  );

  return (
    <TableRow
      hover
      onClick={() => handleClickOpen(row)}
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
          <EditTransaction entry={row} open={open} handleClose={handleClose} />
        </Box>
      </TableCell>
    </TableRow>
  );
}

export default EntriesTableRow;