import Grid from '@mui/material/Grid';
import EntriesTable from '../components/EntriesTable';
import EntriesAggregationsTable from '../components/EntriesAggregationsTable';
import AddTransactionButton from '../components/AddTransactionButton';

function Home() {
  return (
    <Grid align="center">
      <EntriesAggregationsTable />
      <EntriesTable />
      <br />
      <AddTransactionButton />
    </Grid>
  );
}

export default Home;