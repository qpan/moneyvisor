import className from 'classnames';
import { entry } from '../constants';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

import { useFetchEntriesQuery } from '../store';
import Emoji from '../components/Emoji';

function Home() {
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
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {data.map((row) => {
            const entryTypeClasses = className(
              { 'success.main': entry.income === row.type },
              { 'error.main': entry.expense === row.type }
            );

            return (
              <TableRow
                key={row.id}
                hover
                onClick={() => console.log(row.id)}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">
                  {<Emoji unicode={row.category.emoji} />}&nbsp;
                  <span>{row.category.name}</span>
                </TableCell>
                <TableCell align="center">
                  <div>{row.notes}</div>
                  <div>{row.account.name}</div>
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ color: entryTypeClasses }}>{row.amount}</Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
    )
  }

  return (
    <Grid align="center">
      { content }
    </Grid>
  );
}

export default Home;