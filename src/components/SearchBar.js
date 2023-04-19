import React from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";



const Searchbar = ({search, setSearch, searchRecipes}) => {
   
  return (
   <Stack alignItems="center" mt='37px' justifyContent="center" p='20px'>
        <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '30px'}}}
        mb='50px' textAlign="center" >
            Search for a recipe
        </Typography>
        <Box position="relative" mb="72px">
            <TextField
            height="76px"
            name="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyPress={e => e.key === 'Enter' ? searchRecipes(e) : null}
            placeholder="Search recipes"
            type="text"
            sx={{
                input: { fontWeight: 700, border: 'none', borderRadius: '4px' },
                width: { lg: '1170px', xs: '350px'},
                backgroundColor: '#FFF',
                borderRadius: '40px'
            }}
            />
           <Button variant="contained" sx={{
            height: '55px',
            width: { lg: '175px', xs: '80px'},
            position: 'absolute',
           }}
           onClick={searchRecipes}
           >Search</Button>

        </Box>
    </Stack>
  );
}

export default Searchbar;