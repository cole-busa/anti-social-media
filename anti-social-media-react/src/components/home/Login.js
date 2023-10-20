import React, { useContext, useEffect, useState } from 'react';

import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, FormControl, ThemeProvider, Container, createTheme, Box, Typography, CssBaseline, Grid, Link } from '@mui/material';

const Login = () => {
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');
    const [users, setUsers] = useState();

    const setUser = async () => {
        try {
            const response = await api.get("/User/");
            setUsers(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const username = data.get('username');
        const password = data.get('password');
        setUsers(localStorage.getItem('users'));
        if (username.length > 0 && password.length > 0) {
            let match = false;
            for (let i = 0; i < users.length; i++) {
                if (users[i].username === username && users[i].password === password) {
                    match = true;
                }
            }
            
            if (match) {
                setErrorMessage("");
                localStorage.setItem('currentUser', username);
                navigate("/home");
            } else {
                setErrorMessage("Username or Password is incorrect.");
            }
        }
    }
    
    useEffect(() => {
        setUser();
    },[]);

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
                    <Typography component="h1" variant="h5" sx={{color:'white', fontFamily: 'Roboto'}}>Log In</Typography>
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
                                error={errorMessage !== ''}
                                helperText={errorMessage}
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
                                error={errorMessage !== ''}
                                helperText={errorMessage}
                            />
                            <Button 
                                type="submit"
                                variant='contained' 
                                fullWidth
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Log in
                            </Button>
                            <Grid item>
                                <Link href="create-account" variant="body2">
                                {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </FormControl>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Login;