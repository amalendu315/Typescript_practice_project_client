import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import Form from './Form';

const LoginPage = () => {

    const theme:any = useTheme();
    const isMobile = useMediaQuery('(min-width: 1000px)');

  return (
    <Box>
      <Box width={"100%"} sx={{ backgroundColor:theme.palette.background?.alt }} p="1rem 6%" textAlign={"center"} >
        <Typography fontWeight="bold" fontSize="32px" color="primary" >
            Sociopedia
        </Typography>
        <Box width={isMobile ? '50%':'93%'} p="2rem" m="2rem auto" borderRadius={"1.5rem"} sx={{ backgroundColor:theme.palette.background.alt }}>
            <Typography fontWeight={"500"} variant="h5" sx={{ mb:"1.5rem" }} >
                Welcome to Sociopedia, a social media platform for all types of users.
            </Typography>
            <Form />
        </Box>
      </Box>
    </Box>
  );
}

export default LoginPage