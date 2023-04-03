import { Box, Button, TextField } from '@mui/material';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import AddIcon from '@mui/icons-material/Add';
import { ChangeEvent, useContext, useState } from 'react';
import { EntriesContext } from '@/context/entries';
import { UIContext } from '@/context/ui';

export const NewEntry = () => {
  // const [isAdding, setIsAdding] = useState(false);

  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false);

  const { addNewEntry } = useContext(EntriesContext);
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

  const onTextFieldChanges = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const onSave = () => {
    if (inputValue.length === 0) return;
    addNewEntry(inputValue);
    setInputValue('');
    setIsAddingEntry(false);
    setTouched(false);
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginY: 2 }}
            // placeholder="New Entry"
            autoFocus
            multiline
            label="New Entry"
            helperText={inputValue.length <= 0 && touched && 'Add a new entry'}
            error={inputValue.length <= 0 && touched}
            value={inputValue}
            onChange={onTextFieldChanges}
            onBlur={() => setTouched(true)}
          />
          <Box display={'flex'} justifyContent="space-between">
            <Button
              onClick={() => {
                setTouched(false);
                setIsAddingEntry(false);
                // setInputValue('');
              }}
              variant="outlined"
              color="warning"
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="success"
              onClick={onSave}
              // endIcon={<BookmarkAddIcon />}
            >
              Save
            </Button>
          </Box>
        </>
      ) : (
        <Button
          onClick={() => setIsAddingEntry(true)}
          startIcon={<AddIcon />}
          fullWidth
          variant="outlined"
        >
          Add New Entry
        </Button>
      )}
    </Box>
  );
};
