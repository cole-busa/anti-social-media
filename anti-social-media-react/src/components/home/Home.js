import React, { useEffect, useState } from 'react';

import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { AppBar, Autocomplete, Box, Button, Container, CssBaseline, Drawer, List, ListItem, ListSubheader, MenuItem, Stack, TextField, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material';
import CheckIcon from "@mui/icons-material/Check";

const Home = () => {
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
    const [antiSocialScore, setAntiSocialScore] = useState(1);

    //Profile element variables
    const [userMovies, setUserMovies] = useState();
    const [userTVShows, setUserTVShows] = useState();
    const [userVideoGames, setUserVideoGames] = useState();
    const [loadingUserEditList, setLoadingUserEditList] = useState(true);

    //Edit profile variables
    const [movies, setMovies] = useState();
    const [videoGames, setVideoGames] = useState();
    const [tvShows, setTVShows] = useState();
    const [moviesInput, setMoviesInput] = useState([]);
    const [tvShowsInput, setTVShowsInput] = useState([]);
    const [videoGamesInput, setVideoGamesInput] = useState([]);
    const [edit, setEdit] = useState(false);
    const [loadingEditList, setLoadingEditList] = useState(true);
    const [initializeInput, setInitializeInput] = useState(true);
    
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

        //Navigate to the Profile page
        navigate("/profile");
    };

    //Function called on press of Edit Profile button
    const handleEdit = () => {
        setEdit(true);
    }

    //Function called on press of Save Profile button
    const handleSave = () => {
        updateUserInfo().then(() => {
            setUserMoviesTVShowsAndVideoGames().then(() => {
                setEdit(false);
            });
        });
    };

    //Function to sort Users by decreasing AntiSocialScore
    function higherScore(a, b) {
        return a.antiSocialScore <= b.antiSocialScore;
    };

    //Function to update/set current users (users that aren't yet friends) and friends
    const setCurrentUsersAndFriends = async () => {
        try {
            //GET the current user's friends, all users, and the current user from the database
            const friendResponse = await api.get("/Friend/" + currentUser);
            const userResponse = await api.get("/User/");
            const currentUserResponse = await api.get("/User/Name/" + currentUser);

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
                for (const friend of friendResponse.data) {
                    //Otherwise, push all friends to the filter
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

    //Function to update user info in the database
    const updateUserInfo = async () => {
        //For movies, separate input or lack thereof into POST and DELETE arrays
        let moviesToPost = undefined;
        let moviesToDelete = undefined;

        if (moviesInput.length && userMovies.length) {
            //If both arrays are not empty
            //Set POST array to the input minus the intersection between input and existing movies for the user
            moviesToPost = moviesInput.filter(x => !userMovies.includes(x));

            //Set DELETE array to the existing movies for the user minus the same intersection
            moviesToDelete = userMovies.filter(x => !moviesInput.includes(x));
        } else if (!moviesInput.length) {
            //If the input array is empty, add all of the user's movies to the DELETE array
            moviesToDelete = userMovies;
        } else if (!userMovies.length) {
            //If the user's movies array is empty, add all of the input to the POST array
            moviesToPost = moviesInput;
        }

        //Now POST those movies to post if the array is not empty
        if (moviesToPost !== undefined) {
            for (const movie of moviesToPost) {
                await api.post("/UserMovie/" + currentUser + "/" + movie);

                //Also update the UserMovie ArrayList in each User and Movie
                await api.put("/User/AddUserMovies/" + currentUser + "/" + movie);
                await api.put("/Movie/AddUserMovies/" + currentUser + "/" + movie);
            }
        }

        //Next DELETE those movies to delete if the array is not empty
        if (moviesToDelete !== undefined) {
            for (const movie of moviesToDelete) {
                await api.delete("/UserMovie/" + currentUser + "/" + movie);

                //Also update the UserMovie ArrayList in each User and Movie
                await api.put("/User/DeleteUserMovies/" + currentUser + "/" + movie);
                await api.put("/Movie/DeleteUserMovies/" + currentUser + "/" + movie);
            }
        }


        //For tv shows, separate input or lack thereof into POST and DELETE arrays
        let tvShowsToPost = undefined;
        let tvShowsToDelete = undefined;

        if (tvShowsInput.length && userTVShows.length) {
            //If both arrays are not empty
            //Set POST array to the input minus the intersection between input and existing tv shows for the user
            tvShowsToPost = tvShowsInput.filter(x => !userTVShows.includes(x));

            //Set DELETE array to the existing tv shows for the user minus the same intersection
            tvShowsToDelete = userTVShows.filter(x => !tvShowsInput.includes(x));
        } else if (!tvShowsInput.length) {
            //If the input array is empty, add all of the user's tv shows to the DELETE array
            tvShowsToDelete = userTVShows;
        } else if (!userTVShows.length) {
            //If the user's tv shows array is empty, add all of the input to the POST array
            tvShowsToPost = tvShowsInput;
        }

        //Now POST those tv shows to post if the array is not empty
        if (tvShowsToPost !== undefined) {
            for (const tvShow of tvShowsToPost) {
                await api.post("/UserTVShow/" + currentUser + "/" + tvShow);

                //Also update the UserTVShow ArrayList in each User and TVShow
                await api.put("/User/AddUserTVShows/" + currentUser + "/" + tvShow);
                await api.put("/TVShow/AddUserTVShows/" + currentUser + "/" + tvShow);
            }
        }

        //Next DELETE those tv shows to delete if the array is not empty
        if (tvShowsToDelete !== undefined) {
            for (const tvShow of tvShowsToDelete) {
                await api.delete("/UserTVShow/" + currentUser + "/" + tvShow);

                //Also update the UserTVShow ArrayList in each User and TVShow
                await api.put("/User/DeleteUserTVShows/" + currentUser + "/" + tvShow);
                await api.put("/TVShow/DeleteUserTVShows/" + currentUser + "/" + tvShow);
            }
        }


        //For video games, separate input or lack thereof into POST and DELETE arrays
        let videoGamesToPost = undefined;
        let videoGamesToDelete = undefined;

        if (videoGamesInput.length && userVideoGames.length) {
            //If both arrays are not empty
            //Set POST array to the input minus the intersection between input and existing video games for the user
            videoGamesToPost = videoGamesInput.filter(x => !userVideoGames.includes(x));

            //Set DELETE array to the existing video games for the user minus the same intersection
            videoGamesToDelete = userVideoGames.filter(x => !videoGamesInput.includes(x));
        } else if (!videoGamesInput.length) {
            //If the input array is empty, add all of the user's video games to the DELETE array
            videoGamesToDelete = userVideoGames;
        } else if (!userVideoGames.length) {
            //If the user's video games array is empty, add all of the input to the POST array
            videoGamesToPost = videoGamesInput;
        }

        //Now POST those video games to post if the array is not empty
        if (videoGamesToPost !== undefined) {
            for (const videoGame of videoGamesToPost) {
                await api.post("/UserVideoGame/" + currentUser + "/" + videoGame);

                //Also update the User ArrayList in each User and VideoGame
                await api.put("/User/AddUserVideoGames/" + currentUser + "/" + videoGame);
                await api.put("/VideoGame/AddUserVideoGames/" + currentUser + "/" + videoGame);
            }
        }

        //Next DELETE those video games to delete if the array is not empty
        if (videoGamesToDelete !== undefined) {
            for (const videoGame of videoGamesToDelete) {
                await api.delete("/UserVideoGame/" + currentUser + "/" + videoGame);

                //Also update the User ArrayList in each User and VideoGame
                await api.put("/User/DeleteUserVideoGames/" + currentUser + "/" + videoGame);
                await api.put("/VideoGame/DeleteUserVideoGames/" + currentUser + "/" + videoGame);
            }
        }
    }

    //Function to update the user's anti-social score in the database
    const updateAntiSocialScore = async (user, userAntiSocialScore) => {
        await api.put("/User/Score/" + user + "/" + userAntiSocialScore);
    };

    //Function to set all movies, tv shows, and video games in the database
    const setMoviesTVShowsAndVideoGames = async () => {
        try {
            //For movies, GET the all movies from the Movie table
            const movieResponse = await api.get("/Movie/");

            //Add the titles of each movie to an array for easy access
            const movieTitles = [];
            for (const movie of movieResponse.data) {
                movieTitles.push(movie.title);
            }

            //Set the movies variable to this array
            setMovies(movieTitles);


            //For tv shows, GET all tv shows from the TVShow table
            const tvShowResponse = await api.get("/TVShow/");
            
            //Add the titles of each tv show to an array for easy access
            const tvShowTitles = [];
            for (const tvShow of tvShowResponse.data) {
                tvShowTitles.push(tvShow.title);
            }

            //Set the tv shows variable to this array
            setTVShows(tvShowTitles);


            //For video games, GET all video games from the VideoGame table
            const videoGameResponse = await api.get("/VideoGame/");

            //Add the titles of each video game to an array for easy access
            const videoGameTitles = [];
            for (const videoGame of videoGameResponse.data) {
                videoGameTitles.push(videoGame.title);
            }
            
            //Set the video games variable to this array
            setVideoGames(videoGameTitles);


            //Set loading this data to false
            setLoadingEditList(false);
        } catch (e) {
            console.log(e);
        }
    };

    //Function to set the current user's movies, tv shows, and video games
    const setUserMoviesTVShowsAndVideoGames = async () => {
        try {
            //GET the info from the User table for the current user
            const userResponse = await api.get("/User/Name/" + currentUser);
            const currentUserId = userResponse.data.id;

            //Keep track of the current user's anti-social score
            let userAntiSocialScore = 0;

            //For movies, GET the info for the User from the UserMovie table
            const movieResponse = await api.get("/UserMovie/Id/" + currentUserId);

            //Add the titles of each movie to an array for easy access
            const movieTitles = [];
            for (const userMovie of movieResponse.data) {
                movieTitles.push(userMovie.movie.title);

                //Also update the user's anti-social score
                userAntiSocialScore += parseInt(userMovie.movie.runtime);
            }
            
            //Set user movies variable to this array
            setUserMovies(movieTitles);


            //For tv shows, GET the info for the User from the UserTVShow table
            const tvShowResponse = await api.get("/UserTVShow/Id/" + currentUserId);

            //Add the titles of each tv show to an array for easy access
            const tvShowTitles = [];
            for (const userTVShow of tvShowResponse.data) {
                tvShowTitles.push(userTVShow.tvShow.title);

                //Also update the user's anti-social score
                userAntiSocialScore += parseInt(userTVShow.tvShow.runtime);
            }

            //Set user tv shows variable to this array
            setUserTVShows(tvShowTitles);


            //For video games, GET the info for the User from the UserVideoGame table
            const videoGameResponse = await api.get("/UserVideoGame/Id/" + currentUserId);
            
            //Add the titles of each video game to an array for easy access
            const videoGameTitles = [];
            for (const userVideoGame of videoGameResponse.data) {
                videoGameTitles.push(userVideoGame.videoGame.title);

                //Also update the user's anti-social score
                userAntiSocialScore += parseInt(userVideoGame.videoGame.playtime);
            }
            
            //Set user video games variable to this array
            setUserVideoGames(videoGameTitles);

            //If we need to initialize input
            if (initializeInput) {
                //Set the input to the User's Movies, TV Shows, and Video Games respectively
                setMoviesInput(movieTitles);
                setTVShowsInput(tvShowTitles);
                setVideoGamesInput(videoGameTitles);

                //Set loading this data to false
                setInitializeInput(false);
            }

            //Set loading this data to false
            setLoadingUserEditList(false);
            await updateAntiSocialScore(currentUser, userAntiSocialScore);
        } catch (e) {
            console.log(e);
        }
    }

    //React function that calls on component render
    useEffect(() => {
        //By default we want to load current users and friends for the Friends List,
        //all movies, tv shows, and video games from the database for the Edit Profile,
        //and the current user's movies, tv shows, and video games for the regular Profile
        setCurrentUsersAndFriends();
        setMoviesTVShowsAndVideoGames().then(() => {
            setUserMoviesTVShowsAndVideoGames();
        });
    }, []);

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <AppBar sx={{ position: "fixed", zIndex: 1400 }}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" fontWeight='bold' noWrap>
                        Home Page
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
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
                        marginTop: 8,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            variant="h1"
                            align="center"
                            color="text.primary"
                        >
                            {currentUser}
                        </Typography>
                        <Typography variant="h5" align="center" color="purple" fontWeight='bold' paragraph>
                            Anti-Social Score: {antiSocialScore.toLocaleString()}
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
                <Box>
                    {!edit ? (
                        <Box> 
                            {loadingUserEditList ? (
                                <Typography>Loading user info...</Typography>
                            ) : (
                                <Box>
                                    <Box textAlign = 'center'>
                                        <Button align = "center" variant = "contained" onClick = { () => handleEdit() }>
                                            Edit Profile
                                        </Button>
                                    </Box>
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
                                        <List >
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
                    ) : (
                        <Box>
                            <Box textAlign='center'>
                                <Button align="center" variant="contained" onClick={() => handleSave()}>
                                    Save Profile
                                </Button>
                            </Box>
                            {loadingEditList && loadingUserEditList ? (
                                <Typography>Loading edit lists...</Typography>
                            ) : (
                                <Box>
                                    <Container sx={{ py: 8 }} maxWidth="md">
                                        <Autocomplete
                                            sx={{ m: 1, width: 500 }}
                                            multiple
                                            options={movies}
                                            getOptionLabel={(option) => option}
                                            disableCloseOnSelect
                                            defaultValue = {userMovies}
                                            onChange={(event, newInputValue) => {
                                                setMoviesInput(newInputValue);
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="outlined"
                                                    label="Add Movies"
                                                    placeholder="Search Movies"
                                                />
                                            )}
                                            renderOption={(props, option, { selected }) => (
                                                <MenuItem
                                                    {...props}
                                                    key={option}
                                                    value={option}
                                                    sx={{ justifyContent: "space-between" }}
                                                >
                                                    {option}
                                                    {selected ? <CheckIcon color="info" /> : null}
                                                </MenuItem>
                                            )}
                                        />
                                    </Container>
                                    <Container sx={{ py: 8 }} maxWidth="md">
                                        <Autocomplete
                                            sx={{ m: 1, width: 500 }}
                                            multiple
                                            options={tvShows}
                                            getOptionLabel={(option) => option}
                                            disableCloseOnSelect
                                            defaultValue={userTVShows}
                                            onChange={(event, newInputValue) => {
                                                setTVShowsInput(newInputValue);
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="outlined"
                                                    label="Add TV Shows"
                                                    placeholder="Search TV Shows"
                                                />
                                            )}
                                            renderOption={(props, option, { selected }) => (
                                                <MenuItem
                                                    {...props}
                                                    key={option}
                                                    value={option}
                                                    sx={{ justifyContent: "space-between" }}
                                                >
                                                    {option}
                                                    {selected ? <CheckIcon color="info" /> : null}
                                                </MenuItem>
                                            )}
                                        />
                                    </Container>
                                    <Container sx={{ py: 8 }} maxWidth="md">
                                        <Autocomplete
                                            sx={{ m: 1, width: 500 }}
                                            multiple
                                            options={videoGames}
                                            getOptionLabel={(option) => option}
                                            disableCloseOnSelect
                                            defaultValue={userVideoGames}
                                            onChange={(event, newInputValue) => {
                                                setVideoGamesInput(newInputValue);
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="outlined"
                                                    label="Add Video Games"
                                                    placeholder="Search Video Games"
                                                />
                                            )}
                                            renderOption={(props, option, { selected }) => (
                                                <MenuItem
                                                    {...props}
                                                    key={option}
                                                    value={option}
                                                    sx={{ justifyContent: "space-between" }}
                                                >
                                                    {option}
                                                    {selected ? <CheckIcon color="info" /> : null}
                                                </MenuItem>
                                            )}
                                        />
                                    </Container>
                                </Box>
                            )}
                        </Box>
                    )}
                </Box>
            </main>
        </ThemeProvider>
    );
}

export default Home;