import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';


import { useFetchEntriesByYearMonth } from "../hooks/use-fetch-entries-by-year-month";
import EntriesTableRow from './EntiresTableRow';
import { groupBy, isEmpty, map } from 'lodash';
import { Chip, Divider, Stack, TableCell, TableRow } from '@mui/material';
import dayjs from 'dayjs';
import { ENTRY } from '../constants';
import currency from 'currency.js';
import { daysNameArray } from '../utils';
import NoDataPlaceholder from './NoDataPlaceholder';

function EntriesTable() {
  const { data, error, isFetching } = useFetchEntriesByYearMonth();

  const dataGroupByCreatedAt = groupBy(data, (entry, a, b, c) => (
    // Grab substring before 'T'
    entry.createdAt.substring(0, entry.createdAt.indexOf("T"))
  ));

  const dataGroupByCreatedAtWithAggregates = map(dataGroupByCreatedAt, (value, key) => {
    let income = 0;
    let expense = 0;
    let total = 0;

    value.forEach(date => {
      if (date.type.name === ENTRY.INCOME) {
        income += date.amount;
      } else {
        expense += date.amount
      }
    });

    total += income - expense;

    return {
      value,
      date: key,
      aggregations: {
        income,
        expense,
        total
      }
    }
  });

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
  } else if (isEmpty(data)) {
    content = (
      <Box sx={{ marginTop: '80px'}}>
        <NoDataPlaceholder />
      </Box>
    )
  } else {
    content = (
      <>
        {map(dataGroupByCreatedAtWithAggregates, (data) => {
          const date = dayjs(data.date);

          return (
            <Box key={data.date}>
              <Divider />
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 360 }} size="small" aria-label="simple dense table">
                  <TableBody>
                    <TableRow>
                      <TableCell width={"25%"} align="left">
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
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 360 }} size="small" aria-label="simple dense table">
                  <TableBody>
                    {data.value.map((row) => {
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