import React, { useEffect, useState } from 'react';

import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, FormControl, ThemeProvider, Container, createTheme, Box, Typography, CssBaseline } from '@mui/material';

const CreateAccount = () => {
    const navigate = useNavigate();

    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
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
        const password1 = data.get('password1');
        const password2 = data.get('password2');
        if (username.length > 0 && password1.length > 0 && password2.length > 0) {
            let usernameMatch = false;
            let passwordsMatch = (password1 === password2);
            for (let i = 0; i < users.length; i++) {
                if (users[i].username === username) {
                    usernameMatch = true;
                }
            }
            
            if (!usernameMatch && passwordsMatch) {
                setUsernameErrorMessage("");
                setPasswordErrorMessage("");
                const password = password1;
                api.post(
                    '/User/', 
                    JSON.stringify({ username, password }), 
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: false
                    }
                ).then(response => {console.log(response)});
                navigate("/");
            } else if (usernameMatch && passwordsMatch) {
                setUsernameErrorMessage("Username already exists.");
                setPasswordErrorMessage("");
            } else if (usernameMatch && !passwordsMatch) {
                setUsernameErrorMessage("Username already exists.");
                setPasswordErrorMessage("Passwords do not match.");
            } else {
                setUsernameErrorMessage("");
                setPasswordErrorMessage("Passwords do not match.");
            }
        }
    }
    
    useEffect(() => {
        setUser();
      },[])

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
                                error={usernameErrorMessage !== ''}
                                helperText={usernameErrorMessage}
                            />
                            <TextField
                                margin='normal'
                                id="password1"
                                name='password1'
                                type="password"
                                label="Password"
                                required
                                fullWidth
                                error={passwordErrorMessage !== ''}
                                helperText={passwordErrorMessage}
                            />
                            <TextField
                                margin='normal'
                                id="password2"
                                name='password2'
                                type="password"
                                label="Repeat Password"
                                required
                                fullWidth
                                error={passwordErrorMessage !== ''}
                                helperText={passwordErrorMessage}
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