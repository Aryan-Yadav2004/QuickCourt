import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function BasicRating({setValue, rating}) {

  return (
    <Box sx={{ '& > legend': { mt: 2 } }}>
      <Rating
        name="simple-controlled"
        value={rating}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      
    </Box>
  );
}