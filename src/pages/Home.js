import Grid from '@mui/material/Grid';

import EntriesTable from '../components/EntriesTable';
import EntriesAggregationsTable from '../components/EntriesAggregationsTable';

function Home() {

  return (
    <Grid align="center">
      <EntriesAggregationsTable />
      <EntriesTable />
    </Grid>
  );
}

export default Home;