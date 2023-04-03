import { Box, Button, TextField } from '@mui/material';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import AddIcon from '@mui/icons-material/Add';

export const NewEntry = () => {
  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      <Button startIcon={<AddIcon />} fullWidth variant="outlined">
        Add New Entry
      </Button>
      <TextField
        fullWidth
        sx={{ marginY: 2 }}
        // placeholder="New Entry"
        autoFocus
        multiline
        label="New Entry"
        helperText="Add a new entry"
      />
      <Box display={'flex'} gap={1}>
        <Button variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button variant="outlined" color="info" endIcon={<BookmarkAddIcon />}>
          Save
        </Button>
      </Box>
    </Box>
  );
};
