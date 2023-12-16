import Grid from '@mui/material/Grid';
import { Add } from '@mui/icons-material';

import EntriesTable from '../components/EntriesTable';
import EntriesAggregationsTable from '../components/EntriesAggregationsTable';
import { Button } from '@mui/material';
import { useState } from 'react';
import AddTransactionModal from '../components/AddTransactionModal';

function Home() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid align="center">
      <EntriesAggregationsTable />
      <EntriesTable />
      <Button sx={{ borderRadius: 50 }} variant="contained" color="error"  onClick={handleClickOpen}>
        <Add />
      </Button>
      <AddTransactionModal open={open} handleClose={handleClose} />
    </Grid>
  );
}

export default Home;