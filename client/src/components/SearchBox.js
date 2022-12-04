import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const SearchBox = ({ onSearchTextChanged }) => {
    return <Box
        sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off">
        <TextField
            label="Search Users"
            variant="standard"
            onChange={event => onSearchTextChanged(event.target.value)}
        />
    </Box>
}

export default SearchBox;
