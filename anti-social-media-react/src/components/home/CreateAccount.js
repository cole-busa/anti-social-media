import React, { useEffect, useState } from 'react';

import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, FormControl, ThemeProvider, Container, createTheme, Box, Typography, CssBaseline } from '@mui/material';

const CreateAccount = () => {
    //Navigation variable
    const navigate = useNavigate();

    //Default theme for Material UI elements
    const defaultTheme = createTheme();

    //Storage for user list in database
    const [users, setUsers] = useState([]);

    //Error message for the username textfield
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');

    //Error boolean for the password textfield
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    

    //Function to get users from database
    const setUser = async () => {
        try {
            //GET all users from database
            const response = await api.get("/User/");

            //Store user list in local variable
            setUsers(response.data);

            //Store user list in local storage
            localStorage.setItem('users', response.data);
        } catch (e) {
            console.log(e);
        }
    }

    //Function to handle submitting the account creation form
    const handleSubmit = e => {
        //Prevent default behavior on the submit
        e.preventDefault();

        //Access data from form data
        const data = new FormData(e.currentTarget);

        //Get inputted username, password, and confirmed password
        const username = data.get('username');
        const password1 = data.get('password1');
        const password2 = data.get('password2');

        //Make sure both username, password, and confirmed password are non-null
        if (username.length > 0 && password1.length > 0 && password2.length > 0) {
            //Create boolean for usernames matching
            let usernameMatch = false;

            //Create boolean for passwords matching
            let passwordsMatch = (password1 === password2);
            
            //Check for match in database with username
            for (let i = 0; i < users.length; i++) {
                if (users[i].username === username) {
                    usernameMatch = true;
                }
            }
            
            //Switch for actions depending on username/passwords matching
            switch (true) {
                case (!usernameMatch && passwordsMatch):
                    //If the username does not match one in the database
                    //and the passwords inputted match
                    //Remove error messages
                    setUsernameErrorMessage("");
                    setPasswordErrorMessage("");

                    //Create local variable for correct JSON formatting
                    const password = password1;

                    //Create a new user with a POST request containing the username and password in JSON form
                    api.post(
                        '/User/', 
                        JSON.stringify({ username, password }), 
                        {
                            headers: { 'Content-Type': 'application/json' },
                            withCredentials: false
                        }
                    );

                    //Update the current user list
                    setUser().then(() => {

                        //Return to login page
                        navigate("/");
                    });
                    break;
                case (usernameMatch && passwordsMatch):
                    //If the username matches one in the database
                    //and the passwords match, only set the username error message
                    setUsernameErrorMessage("Username already exists.");
                    setPasswordErrorMessage("");
                    break;
                case (usernameMatch && !passwordsMatch):
                    //If the username matches one in the database
                    //and the passwords do not match, set both error messages
                    setUsernameErrorMessage("Username already exists.");
                    setPasswordErrorMessage("Passwords do not match.");
                    break;
                case (!usernameMatch && !passwordsMatch):
                    //If the username does not match one in the database
                    //and the passwords match, only set the password error message
                    setUsernameErrorMessage("");
                    setPasswordErrorMessage("Passwords do not match.");
                    break;
            }
        }
    }
    
    //React function that calls on component render
    useEffect(() => {
        //By default we want to load all users from the database
        setUser();
      },[])

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
                    {/* Form for creating a new account */}
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