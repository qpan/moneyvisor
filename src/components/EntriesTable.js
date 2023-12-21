import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';


import { useFetchEntriesByYearMonth } from "../hooks/use-fetch-entries-by-year-month";
import EntriesTableRow from './EntiresTableRow';
import { groupBy, isEmpty, map } from 'lodash';
import { Divider, Stack } from '@mui/material';
import { ENTRY } from '../constants';
import NoDataPlaceholder from './NoDataPlaceholder';
import EntriesTableHeader from './EntriesTableHeader';

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
          return (
            <Box key={data.date}>
              <Divider />
              <EntriesTableHeader data={data} />
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