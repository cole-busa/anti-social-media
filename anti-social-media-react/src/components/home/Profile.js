import React, { useEffect, useState } from 'react';

import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import PerfectScrollbar from "react-perfect-scrollbar";
import { AppBar, Box, Button, Container, CssBaseline, Drawer,List, ListItem, ListSubheader, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material';

const Profile = () => {
    const navigate = useNavigate();
    const currentUser = localStorage.getItem('currentUser');
    const defaultTheme = createTheme();

    const [users, setUsers] = useState();
    const [allUsers, setAllUsers] = useState();
    const [friends, setFriends] = useState();
    const [currentProfile, setCurrentProfile] = useState(localStorage.getItem('currentProfile'));
    const [antiSocialScore, setAntiSocialScore] = useState(1);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [loadingFriends, setLoadingFriends] = useState(true);
    const [noFriends, setNoFriends] = useState(false);
    const [allUsersAdded, setAllUsersAdded] = useState(false);
    const [userMovies, setUserMovies] = useState();
    const [userTVShows, setUserTVShows] = useState();
    const [userVideoGames, setUserVideoGames] = useState();
    const [loadingUserEditList, setLoadingUserEditList] = useState(true);

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

    const setUserMoviesTVShowsAndVideoGames = async () => {
        try {
            const userResponse = await api.get("/User/Name/" + currentProfile);
            const currentProfileId = userResponse.data.id;

            const movieResponse = await api.get("/UserMovie/Id/" + currentProfileId);
            const tvShowResponse = await api.get("/UserTVShow/Id/" + currentProfileId);
            const videoGameResponse = await api.get("/UserVideoGame/Id/" + currentProfileId);
            const movieTitles = [];
            const tvShowTitles = [];
            const videoGameTitles = [];
            for (const userMovie of movieResponse.data) {
                movieTitles.push(userMovie.movie.title);
            }
            for (const userTVShow of tvShowResponse.data) {
                tvShowTitles.push(userTVShow.tvShow.title);
            }
            for (const userVideoGame of videoGameResponse.data) {
                videoGameTitles.push(userVideoGame.videoGame.title);
            }
            setUserMovies(movieTitles);
            setUserTVShows(tvShowTitles);
            setUserVideoGames(videoGameTitles);
            setLoadingUserEditList(false);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        setCurrentUsersAndFriends();
        setUserMoviesTVShowsAndVideoGames();
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
                        </Container>
                    </Box>
                    <Box>
                        {loadingUserEditList ? (
                            <Typography>Loading user info...</Typography>
                        ) : (
                            <Box>
                                <Box style={{ display: 'flex', justifyContent: 'center' }}>
                                    <List alignItems="center">
                                        <Box textAlign="center">
                                            <ListSubheader>Movies Watched</ListSubheader>
                                        </Box>
                                        {userMovies.map((item) => (
                                            <ListItem alignItems="center" key={item} >
                                                {item}
                                            </ListItem>
                                        ))}
                                    </List>
                                    <List alignItems="center">
                                        <Box textAlign="center">
                                            <ListSubheader>TV Shows Watched</ListSubheader>
                                        </Box>
                                        {userTVShows.map((item) => (
                                            <ListItem alignItems="center" key={item} >
                                                {item}
                                            </ListItem>
                                        ))}
                                    </List>
                                    <List alignItems="center">
                                        <Box textAlign="center">
                                            <ListSubheader>Video Games Played</ListSubheader>
                                        </Box>
                                        {userVideoGames.map((item) => (
                                            <ListItem alignItems="center" key={item} >
                                                {item}
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            </Box>
                        )}
                    </Box>
                </PerfectScrollbar>
            </main>
        </ThemeProvider>
    );
}

export default Profile;