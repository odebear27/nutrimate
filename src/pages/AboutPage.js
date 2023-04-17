import React from 'react'
import { Container, Box, Button, Stack, TextField, Typography } from "@mui/material";
import NavbarHeader from '../components/Navbar';
import Footer from '../components/Footer';
import Banner from '../components/Banner';

const AboutPage = () => {
  return (
    <div>
        <NavbarHeader/>
        <Banner />
        <Container maxWidth="lg">
        <Box position="relative" mb="72px">
      <Typography variant="h3" textAlign='center' mt='50px'>Our Story</Typography>
        </Box>
        <Box position="relative" mb="72px">
        <Typography variant="p" textAlign='center' >We are passionate foodies who believe that cooking should be enjoyable, accessible, and most importantly, delicious. Our goal is to inspire people to get creative in the kitchen and to make cooking a part of their daily routine.

We started this website because we saw a need for a place where people could find easy-to-follow recipes that are both healthy and flavorful. We understand that in today's fast-paced world, it can be hard to find the time and energy to cook a wholesome meal, but we believe that with the right recipe, anyone can become a master chef.

Our team is made up of experienced cooks and food writers who are dedicated to providing you with the best possible content. We test and refine every recipe before sharing it with you, so you can trust that each one has been thoroughly vetted and is sure to impress your taste buds.

Whether you're a beginner or a seasoned cook, we have something for everyone on our website. From quick and easy weeknight meals to elaborate dinner party dishes, we have a wide variety of recipes to suit any occasion.

Thank you for visiting our website, and we hope you enjoy exploring our collection of delicious recipes.



</Typography>
        </Box>
        </Container>
        <Footer />
    </div>
  )
}

export default AboutPage
