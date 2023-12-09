import * as React from 'react';
import Rating from '@mui/material/Rating';

export default function RatingSIze() {
  return (
    <>
        <h5>My Rating</h5>
        <Rating name="size-medium" defaultValue={0} precision={0.5} />    
    </>
  );
}