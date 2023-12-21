import className from 'classnames';
import currency from 'currency.js';
import {
  toLower,
  startCase,
  truncate,
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

  const handleClickOpen = () => {
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
      onClick={() => handleClickOpen()}
      sx={{
        height: '52px',
        '&:last-child td, &:last-child th': { border: 0 },
        '&:hover': { cursor: 'pointer' }
      }}
    >
      <TableCell width={"33.33%"} align="left">
        {row.category.emoji && <Emoji unicode={row.category.emoji} />}&nbsp;&nbsp;
        <span>{startCase(toLower(row.category.name))}</span>
      </TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }} width={"33.33%"} align="left">
        <div>{truncate(row.note, { length: 25 })}</div>
        <div>
          {row.account.emoji && <Emoji unicode={row.account.emoji} />}&nbsp;&nbsp;
          {startCase(toLower(row.account.name))}
          </div>
      </TableCell>
      <TableCell width={"33.33%"} align="right">
        <Box sx={{ color: entryTypeClasses }}>
          {currency(row.amount, { separator: ',', symbol: '$'}).format()}
          <EditTransaction entry={row} open={open} handleClose={handleClose} />
        </Box>
      </TableCell>
    </TableRow>
  );
}

export default EntriesTableRow;