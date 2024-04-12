import React from 'react'
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const Footer = () => {
  return (
    <>
        <Grid container spacing={3}>
            <Grid item xs>
                <Item>xs</Item>
            </Grid>
            <Grid item xs={6}>
                <Item>xs=6</Item>
            </Grid>
            <Grid item xs>
                <Item>xs</Item>
            </Grid>
        </Grid>
    </>
  )
}

export default Footer