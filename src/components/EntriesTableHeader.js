import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Chip, TableCell, TableRow } from '@mui/material';
import AddTransaction from '../components/AddTransaction';
import dayjs from 'dayjs';
import currency from 'currency.js';
import { daysNameArray } from '../utils';
import { useState } from 'react';

function EntriesTableHeader({ data }) {
  const date = dayjs(data.date);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 360 }} size="small" aria-label="simple dense table">
          <TableBody>
            <TableRow
              onClick={handleClickOpen}
              sx={{
                '&:hover': { cursor: 'pointer' }
              }}
            >
              <TableCell sx={{ whiteSpace: 'nowrap' }} width={"25%"} align="left">
                <Box component="span" fontSize={16} sx={{ fontWeight: 'medium' }}>
                  <Box component="span" sx={{ position: 'relative', top: '2px' }}>
                    {date.format('DD')}&nbsp;
                  </Box>
                </Box>
                <Chip
                  label={daysNameArray[date.day()].substring(0, 3)}
                  size="small"
                  sx={{
                    borderRadius: 2,
                    color: 'white',
                    backgroundColor: '#999',
                  }}
                />
                </TableCell>
              <TableCell sx={{ color: 'success.main' }} width={"25%"} align="center">
                {currency(data.aggregations.income, { separator: ',', symbol: '$'}).format()}
                </TableCell>
              <TableCell sx={{ color: 'error.main' }} width={"25%"} align="right">
                {currency(data.aggregations.expense, { separator: ',', symbol: '$'}).format()}
              </TableCell>
              <TableCell width={"25%"} align="right">
                {currency(data.aggregations.total, { separator: ',', symbol: '$'}).format()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <AddTransaction entry={{ createdAt: date }} open={open} handleClose={handleClose} />
    </>
  );
}

export default EntriesTableHeader;