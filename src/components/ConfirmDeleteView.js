import {
  capitalize,
} from 'lodash';
import { Box, Button, Modal, Stack } from "@mui/material";
import { useState } from "react";
import { REST } from '../constants';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};


function ConfirmDeleteView({ onDelete, result }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        color="error"
        variant="outlined"
        fullWidth
        onClick={handleOpen}
      >
        {capitalize(REST.DELETE)}
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={{ ...style, width: 200 }}>
          <p id="confirm delete modal description">
            Are you sure you want to delete?
          </p>
          <Stack justifyContent={"space-around"} spacing={2} direction={"row"}>
            <Button
              variant="outlined"
              color="error"
              disabled={result.isLoading}
              onClick={onDelete}
            >
              Yes
            </Button>
            <Button
              variant="outlined"
              disabled={result.isLoading}
              onClick={handleClose}
            >
              No
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

export default ConfirmDeleteView;