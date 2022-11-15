import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const ClassicLoader = ({ dynamicId }) => {
  return (
    <Box id={dynamicId} sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
};

export default ClassicLoader;