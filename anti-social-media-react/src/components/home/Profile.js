import React, { useEffect, useState } from 'react';

import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import PerfectScrollbar from "react-perfect-scrollbar";
import { AppBar, Box, Button, Card, CardActions, CardContent, CardMedia, Container, CssBaseline, Drawer, Grid, Stack, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material';

const Profile = () => {
    const navigate = useNavigate();
    const currentUser = localStorage.getItem('currentUser');
    const defaultTheme = createTheme();
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const [users, setUsers] = useState();
    const [allUsers, setAllUsers] = useState();
    const [friends, setFriends] = useState();
    const [currentProfile, setCurrentProfile] = useState(localStorage.getItem('currentProfile'));
    const [antiSocialScore, setAntiSocialScore] = useState(1);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [loadingFriends, setLoadingFriends] = useState(true);
    const [noFriends, setNoFriends] = useState(false);
    const [allUsersAdded, setAllUsersAdded] = useState(false);

    const handleReturnHome = () => {
        localStorage.setItem('currentProfile', currentUser);
        navigate("/home");
    }

    function higherScore(a, b) {
        return a.antiSocialScore <= b.antiSocialScore;
    }
    
    const handleSendFriendRequest = (friendName) => {
        api.post("/Friend/" + currentUser + "/" + friendName);
        api.put("/User/Friends/" + currentUser + "/" + friendName);
        setCurrentUsersAndFriends().then(() => {
            window.location.reload();
        });
    }

    const handleViewProfile = (friendName) => {
        localStorage.setItem('currentProfile', friendName);
        setCurrentUsersAndFriends().then(() => {
            window.location.reload();
        });
    }

    const setCurrentUsersAndFriends = async () => {
        try {
            setCurrentProfile(localStorage.getItem('currentProfile'));
            const friendResponse = await api.get("/Friend/" + currentUser);
            const userResponse = await api.get("/User/");
            const currentUserResponse = await api.get("/User/Name/" + currentProfile);
            setAntiSocialScore(currentUserResponse.data.antiSocialScore);
            userResponse.data.sort(higherScore);
            setAllUsers(userResponse.data);
            const userFilter = [];
            userFilter.push(currentUser);
            if (friendResponse === null) {
                setNoFriends(true);
            } else {
                for (const friend of friendResponse.data) {
                    userFilter.push(friend.friendName);
                }
                setNoFriends(false);
                setFriends(friendResponse.data);
            }
            const currentUsers = [];
            let match = false;
            for (const user of userResponse.data) {
                for (const name of userFilter) {
                    if (user.username === name) {
                        match = true;
                        break;
                    }
                }
                if (!match) {
                    currentUsers.push(user);
                }
                match = false;
            }
            if (!currentUsers.length) {
                setAllUsersAdded(true);
            }
            setUsers(currentUsers);
            setLoadingUsers(false);
            setLoadingFriends(false);

        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        setCurrentUsersAndFriends();
    }, []);

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <AppBar sx={{ position: "fixed", zIndex: 1400 }}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" fontWeight='bold' noWrap>
                        {currentProfile}'s Page
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                <Drawer
                    sx={{
                        width: 240,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: 240,
                            boxSizing: 'border-box',
                            marginTop: 8,
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Typography variant="h5" fontWeight='bold' sx={{ textDecoration: 'underline' }}>
                        Current Users:
                    </Typography>
                    {loadingUsers ? (
                        <Typography>Loading users...</Typography>
                    ) : allUsersAdded ? (
                        <Typography>All users added!</Typography>
                    ) : (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            {users.map((user) => (
                                <Box key={user.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography>{user.username}</Typography>
                                    <Button variant="contained" onClick={() => handleSendFriendRequest(user.username)}>
                                        Add Friend
                                    </Button>
                                </Box>
                            ))}
                        </Box>
                    )}
                    <Typography variant="h5" fontWeight='bold' sx={{ textDecoration: 'underline' }}>
                        Current Friends:
                    </Typography>
                    {loadingFriends ? (
                        <Typography>Loading friends...</Typography>
                    ) : noFriends ? (
                        <Typography>No friends yet...</Typography>
                    ) : (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            {friends.map((friend) => (
                                <Box key={[friend.username, friend.friendName]} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography>{friend.friendName}</Typography>
                                    <Button variant="contained" onClick={() => handleViewProfile(friend.friendName)}>
                                        View Profile
                                    </Button>
                                </Box>
                            ))}
                            <Button variant="contained" onClick={() => handleReturnHome()}>
                                Return Home
                            </Button>
                        </Box>
                    )}
                </Drawer>
                <Drawer
                    sx={{
                        width: 240,
                        flexShrink: 0,
                        bgcolor: 'background.paper',
                        '& .MuiDrawer-paper': {
                            width: 240,
                            boxSizing: 'border-box',
                            marginTop: 8,
                        },
                    }}
                    variant="permanent"
                    anchor="right"
                >
                    {loadingUsers ? (
                        <Typography>Loading users...</Typography>
                    ) : (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography fontWeight='bold' color='blue' sx={{ textDecoration: 'underline' }}>Top Users</Typography>
                                <Typography fontWeight='bold' color='blue' sx={{ textDecoration: 'underline' }}>User Score</Typography>
                            </Box>
                            {allUsers.map((user) => (
                                <Box key={[user.username]} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography>{user.username}</Typography>
                                    <Typography>{user.antiSocialScore}</Typography>
                                </Box>
                            ))}
                        </Box>
                    )}
                </Drawer>
                <PerfectScrollbar suppressScrollX={true} suppressScrollY={true}>
                    <Box
                        sx={{
                            bgcolor: 'background.paper',
                            pt: 8,
                            pb: 6,
                            marginTop: 8,
                        }}
                    >
                        <Container maxWidth="sm">
                            <Typography
                                variant="h1"
                                align="center"
                                color="text.primary"
                            >
                                {currentProfile}
                            </Typography>
                            <Typography variant="h5" align="center" color="purple" fontWeight='bold' paragraph>
                                Anti-Social Score: {antiSocialScore}
                            </Typography>
                            <Stack
                                sx={{ pt: 4 }}
                                direction="row"
                                spacing={2}
                                justifyContent="center"
                            >
                            </Stack>
                        </Container>
                    </Box>
                    <Container sx={{ py: 8 }} maxWidth="md">
                        <Grid container spacing={4}>
                            {cards.map((card) => (
                                <Grid item key={card} xs={12} sm={6} md={4}>
                                    <Card
                                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                    >
                                        <CardMedia
                                            component="div"
                                            sx={{
                                                // 16:9
                                                pt: '56.25%',
                                            }}
                                            image="https://source.unsplash.com/random?wallpapers"
                                        />
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Heading
                                            </Typography>
                                            <Typography>
                                                This is a media card. You can use this section to describe the
                                                content.
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small">View</Button>
                                            <Button size="small">Edit</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </PerfectScrollbar>
            </main>
        </ThemeProvider>
    );
}

export default Profile;