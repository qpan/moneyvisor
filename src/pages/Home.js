import Grid from '@mui/material/Grid';
import EntriesTable from '../components/EntriesTable';
import EntriesAggregationsTable from '../components/EntriesAggregationsTable';
import AddTransactionButton from '../components/AddTransactionButton';
import { Box } from '@mui/material';
import DatePaginator from '../components/DatePaginator';

function Home() {
  return (
    <Grid
      align="center"
      sx={{
        height: 'calc(100% - 57px)',
        'button.addTransactionButton': {
          borderRadius: 50,
          position: 'absolute',
          bottom: '12px',
          right: 'calc(50% - 36px)'
        }
      }}
    >
      <DatePaginator />
      <EntriesAggregationsTable />
      <Box
        sx={{
          height: 'calc(100% - 87px)',
          overflow: 'auto',
        }}
      >
        <EntriesTable />
        <Box sx={{ paddingBottom: '44px' }}></Box>
        <AddTransactionButton />
      </Box>
    </Grid>
  );
}

export default Home;