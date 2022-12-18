import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const MUIClassicLoader = ({ dynamicId }) => {
    return (
        <Box id={dynamicId} sx={{ display: "flex" }}>
            <CircularProgress />
        </Box>
    );
};

export default MUIClassicLoader;
