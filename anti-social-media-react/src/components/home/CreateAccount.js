import React from 'react';

import api from '../../api/axiosConfig';
import { Button, TextField, FormControl, ThemeProvider, Container, createTheme, Box, Typography, CssBaseline, makeStyles, Grid, Link, Tab } from '@mui/material';

const CreateAccount = () => {
    const handleSubmit = e => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const username = data.get('username');
        const password = data.get('password');
        api.post(
            '/User/', 
            JSON.stringify({ username, password }), 
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: false
            }
        ).then(response => {console.log(response)});
      }
    const defaultTheme = createTheme();
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5" sx={{color:'white', fontFamily: 'Roboto'}}>Create Account</Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <FormControl>
                            <TextField
                                margin='normal'
                                id='username'
                                name='username'
                                label="Username"
                                autoFocus
                                fullWidth
                                required
                                
                            />
                            <TextField
                                margin='normal'
                                id="password"
                                name='password'
                                type="password"
                                label="Password"
                                autoComplete="current-password"
                                required
                                fullWidth
                            />
                            <Button 
                                type="submit"
                                variant='contained' 
                                fullWidth
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Create Account
                            </Button>
                        </FormControl>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default CreateAccount;
