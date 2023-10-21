import React, { useEffect, useState } from 'react';

import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, Container, CssBaseline, Drawer,List, ListItem, ListSubheader, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material';

const Profile = () => {
    //Helpful variables
    const navigate = useNavigate();
    const currentUser = localStorage.getItem('currentUser');
    const defaultTheme = createTheme();

    //Friend List variables
    const [users, setUsers] = useState();
    const [friends, setFriends] = useState();
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [loadingFriends, setLoadingFriends] = useState(true);
    const [allUsersAdded, setAllUsersAdded] = useState(false);
    const [noFriends, setNoFriends] = useState(false);

    //Top Users variables
    const [allUsers, setAllUsers] = useState();

    //Profile header variables
    const [currentProfile, setCurrentProfile] = useState(localStorage.getItem('currentProfile'));
    const [antiSocialScore, setAntiSocialScore] = useState(1);

    //Profile element variables
    const [userMovies, setUserMovies] = useState();
    const [userTVShows, setUserTVShows] = useState();
    const [userVideoGames, setUserVideoGames] = useState();
    const [loadingUserEditList, setLoadingUserEditList] = useState(true);

    
    //Function called on press of Return Home button
    const handleReturnHome = () => {
        //Change current profile to current user
        localStorage.setItem('currentProfile', currentUser);

        //Navigate home
        navigate("/home");
    };
    
    //Function called on press of Add Friend button
    const handleSendFriendRequest = (friendName) => {
        //Create a new friend with a POST request to the Friend table
        api.post("/Friend/" + currentUser + "/" + friendName);

        //Add the friend to the current user's friend list with a PUT request to the User table
        api.put("/User/Friends/" + currentUser + "/" + friendName);

        //Update the current users and friends then reload the page
        setCurrentUsersAndFriends().then(() => {
            window.location.reload();
        });
    };

    //Function called on press of View Profile button
    const handleViewProfile = (friendName) => {
        //Set the current profile in local storage to the friend name clicked on
        localStorage.setItem('currentProfile', friendName);

        //Update the current users and friends then reload the page
        setCurrentUsersAndFriends().then(() => {
            window.location.reload();
        });
    };

    //Function to sort Users by decreasing AntiSocialScore
    function higherScore(a, b) {
        return a.antiSocialScore <= b.antiSocialScore;
    };

    //Function to update/set current users (users that aren't yet friends) and friends
    const setCurrentUsersAndFriends = async () => {
        try {
            //Update the current profile variabe from local storage
            setCurrentProfile(localStorage.getItem('currentProfile'));

            //GET the current user's friends, all users, and the current user from the database
            const friendResponse = await api.get("/Friend/" + currentUser);
            const userResponse = await api.get("/User/");
            const currentUserResponse = await api.get("/User/Name/" + currentProfile);

            //Update the displayed anti-social score
            setAntiSocialScore(currentUserResponse.data.antiSocialScore);

            //Sort the list of all users by decreasing anti-social score
            //Set this value for use in the Top Users functionality
            userResponse.data.sort(higherScore);
            setAllUsers(userResponse.data);

            //Create filter for the list of all users with the current user and friends
            const userFilter = [];
            userFilter.push(currentUser);
            if (friendResponse === null) {
                //Check if the user has no friends
                setNoFriends(true);
            } else {
                //Otherwise, push all friends to the filter
                for (const friend of friendResponse.data) {
                    userFilter.push(friend.friendName);
                }

                //Set friends list and noFriends boolean
                setNoFriends(false);
                setFriends(friendResponse.data);
            }

            //Add only users not in the filter to currentUsers
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
                //Check if all users are added
                setAllUsersAdded(true);
            }

            //Set the users to current users and loading to false
            setUsers(currentUsers);
            setLoadingUsers(false);
            setLoadingFriends(false);
        } catch (e) {
            console.log(e);
        }
    };

    //Function to set the current user's movies, tv shows, and video games
    const setUserMoviesTVShowsAndVideoGames = async () => {
        try {
            //GET the info from the User table for the current profile
            const userResponse = await api.get("/User/Name/" + currentProfile);
            const currentProfileId = userResponse.data.id;

            
            //For movies, GET the info for the User from the UserMovie table
            const movieResponse = await api.get("/UserMovie/Id/" + currentProfileId);

            //Add the titles of each movie to an array for easy access
            const movieTitles = [];
            for (const userMovie of movieResponse.data) {
                movieTitles.push(userMovie.movie.title);
            }

            //Set the user movies variable to this array
            setUserMovies(movieTitles);


            //For tv shows, GET the info for the User from the UserTVShow table
            const tvShowResponse = await api.get("/UserTVShow/Id/" + currentProfileId);

            //Add the titles of each tv show to an array for easy access
            const tvShowTitles = [];
            for (const userTVShow of tvShowResponse.data) {
                tvShowTitles.push(userTVShow.tvShow.title);
            }

            //Set the user tv shows variable to this array
            setUserTVShows(tvShowTitles);


            //For video games, GET the info for the User from the UserVideoGame table
            const videoGameResponse = await api.get("/UserVideoGame/Id/" + currentProfileId);
            
            //Add the titles of each video game to an array for easy access
            const videoGameTitles = [];
            for (const userVideoGame of videoGameResponse.data) {
                videoGameTitles.push(userVideoGame.videoGame.title);
            }

            //Set the user video games variable to this array
            setUserVideoGames(videoGameTitles);


            //Set loading this data to false
            setLoadingUserEditList(false);
        } catch (e) {
            console.log(e);
        }
    };

    //React function that calls on component render
    useEffect(() => {
        //By default we want to load current users and friends for the Friends List,
        //and the current user's movies, tv shows, and video games for the regular Profile
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
                        '& .MuiDrawer-paper': {
                            width: 240,
                            boxSizing: 'border-box',
                            marginTop: 8
                        }
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
                        <Box sx={{ display: 'flex', flexDirection: 'column' }} >
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
                        <Box sx={{ display: 'flex', flexDirection: 'column' }} >
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
                        '& .MuiDrawer-paper': {
                            width: 240,
                            boxSizing: 'border-box',
                            marginTop: 8
                        }
                    }}
                    variant="permanent"
                    anchor="right"
                >
                    {loadingUsers ? (
                        <Typography>Loading users...</Typography>
                    ) : (
                        <Box sx={{ display: 'flex', flexDirection: 'column' }} >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography fontWeight='bold' color='blue' sx={{ textDecoration: 'underline' }}>Top Users</Typography>
                                <Typography fontWeight='bold' color='blue' sx={{ textDecoration: 'underline' }}>User Score</Typography>
                            </Box>
                            {allUsers.map((user) => (
                                <Box key={[user.username]} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography>{user.username}</Typography>
                                    <Typography>{user.antiSocialScore.toLocaleString()}</Typography>
                                </Box>
                            ))}
                        </Box>
                    )}
                </Drawer>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                        marginTop: 8
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
                            Anti-Social Score: {antiSocialScore.toLocaleString()}
                        </Typography>
                    </Container>
                </Box>
                <Box>
                    {loadingUserEditList ? (
                        <Typography>Loading user info...</Typography>
                    ) : (
                        <Box>
                            <Box style={{ display: 'flex', justifyContent: 'center' }}>
                                <List>
                                    <Box textAlign="center">
                                        <ListSubheader>Movies Watched</ListSubheader>
                                    </Box>
                                    {userMovies.map((item) => (
                                        <ListItem key={item} >
                                            {item}
                                        </ListItem>
                                    ))}
                                </List>
                                <List>
                                    <Box textAlign="center">
                                        <ListSubheader>TV Shows Watched</ListSubheader>
                                    </Box>
                                    {userTVShows.map((item) => (
                                        <ListItem key={item} >
                                            {item}
                                        </ListItem>
                                    ))}
                                </List>
                                <List>
                                    <Box textAlign="center">
                                        <ListSubheader>Video Games Played</ListSubheader>
                                    </Box>
                                    {userVideoGames.map((item) => (
                                        <ListItem key={item} >
                                            {item}
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </Box>
                    )}
                </Box>
            </main>
        </ThemeProvider>
    );
}

export default Profile;