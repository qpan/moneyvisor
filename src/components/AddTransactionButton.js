import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import AddTransaction from '../components/AddTransaction';
import { useState } from 'react';

function AddTransactionButton() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button sx={{ borderRadius: 50 }} variant="contained" color="error"  onClick={handleClickOpen}>
        <Add />
      </Button>
      <AddTransaction open={open} handleClose={handleClose} />
    </>
  );
}

export default AddTransactionButton;