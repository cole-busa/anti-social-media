import React, { useContext, useEffect, useState } from 'react';

import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, FormControl, ThemeProvider, Container, createTheme, Box, Typography, CssBaseline, Grid, Link } from '@mui/material';

const Login = () => {
    //Navigation variable
    const navigate = useNavigate();

    //Default theme for Material UI elements
    const defaultTheme = createTheme();

    //Storage for user list in database
    const [users, setUsers] = useState([]);

    //Error message for login form
    const [errorMessage, setErrorMessage] = useState('');

    const setUser = async () => {
        try {
            //GET all users from database
            const response = await api.get("/User/");

            //Store user list in local variable
            setUsers(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    //Function to handle submitting the login form
    const handleSubmit = e => {
        //Prevent default behavior on the submit
        e.preventDefault();
        
        //Access data from form data
        const data = new FormData(e.currentTarget);

        //Get inputted username and password
        const username = data.get('username');
        const password = data.get('password');

        //Update users in case one was just created
        setUsers(localStorage.getItem('users'));

        //Make sure both username and password are non-null
        if (username.length > 0 && password.length > 0) {
            //Check for match in database with username and password
            let match = false;
            for (let i = 0; i < users.length; i++) {
                if (users[i].username === username && users[i].password === password) {
                    match = true;
                }
            }
            
            if (match) {
                //If there is a match, set no error message
                setErrorMessage("");

                //Set current user to the username
                localStorage.setItem('currentUser', username);

                //Navigate to the user's home page
                navigate("/home");
            } else {
                //Otherwise, display the proper error message
                setErrorMessage("Username or Password is incorrect.");
            }
        }
    }
    
    //React function that calls on component render
    useEffect(() => {
        //By default we want to load all users from the database
        setUser();
    },[]);

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
                    {/* Form for loggin in */}
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