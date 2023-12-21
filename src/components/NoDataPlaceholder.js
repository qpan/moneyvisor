import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Sailing } from '@mui/icons-material';

function NoDataPlaceholder() {
  return (
    <Box
      sx={{ color: `${grey[500]}` }}
    >
      <Typography><Sailing fontSize='large' /></Typography>
      <Typography>No data available.</Typography>
    </Box>
  );
}

export default NoDataPlaceholder;