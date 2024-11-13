import { Button, ButtonGroup, Grid, Typography, Box } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="center" 
            minHeight="100vh"
            bgcolor="#f5f5f5" // cor de fundo leve para destacar a seção
            padding={3}      // espaçamento interno
        >
            <Grid container spacing={3} maxWidth="sm">
                <Grid item xs={12}>
                    <Typography variant="h3" align="center" gutterBottom>
                        House Party
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="center" mt={2}>
                        <ButtonGroup disableElevation variant="contained">
                            <Button color="primary" to="/join" component={Link} sx={{ mr: 2 }}>
                                Join a Room
                            </Button>
                            <Button color="secondary" to="/create" component={Link}>
                                Create a Room
                            </Button>
                        </ButtonGroup>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}


export default HomePage;
