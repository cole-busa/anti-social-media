import React, { useContext, useEffect, useState } from 'react';

import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { AppBar, Autocomplete, Box, Button, Container, CssBaseline, Drawer, MenuItem, Stack, TextField, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material';
import CheckIcon from "@mui/icons-material/Check";

const Home = () => {
    const navigate = useNavigate();
    const currentUser = localStorage.getItem('currentUser');
    const defaultTheme = createTheme();

    const [users, setUsers] = useState();
    const [allUsers, setAllUsers] = useState();
    const [friends, setFriends] = useState();
    const [antiSocialScore, setAntiSocialScore] = useState(1);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [loadingFriends, setLoadingFriends] = useState(true);
    const [noFriends, setNoFriends] = useState(false);
    const [allUsersAdded, setAllUsersAdded] = useState(false);
    const [movies, setMovies] = useState();
    const [videoGames, setVideoGames] = useState();
    const [tvShows, setTVShows] = useState();
    const [edit, setEdit] = useState(false);
    const [moviesInput, setMoviesInput] = useState([]);
    const [tvShowsInput, setTVShowsInput] = useState([]);
    const [videoGamesInput, setVideoGamesInput] = useState([]);
    const [userMovies, setUserMovies] = useState();
    const [userTVShows, setUserTVShows] = useState();
    const [userVideoGames, setUserVideoGames] = useState();
    const [loadingEditList, setLoadingEditList] = useState(true);
    const [loadingUserEditList, setLoadingUserEditList] = useState(true);
    const [initializeInput, setInitializeInput] = useState(true);
    
    const handleSendFriendRequest = (friendName) => {
        api.post("/Friend/" + currentUser + "/" + friendName);
        api.put("/User/Friends/" + currentUser + "/" + friendName);
        setCurrentUsersAndFriends().then(() => {
            window.location.reload();
        });
    };

    const handleViewProfile = (friendName) => {
        localStorage.setItem('currentProfile', friendName);
        navigate("/profile");
    };

    const handleEdit = () => {
        setEdit(true);
    }

    const handleSave = () => {
        updateUserInfo().then(() => {
            setUserMoviesTVShowsAndVideoGames().then(() => {
                setEdit(false);
            });
        });
    };

    function higherScore(a, b) {
        return a.antiSocialScore <= b.antiSocialScore;
    };

    const updateUserInfo = async () => {
        let moviesToPost = undefined;
        let moviesToDelete = undefined;
        if (moviesInput.length && userMovies.length) {
            moviesToPost = moviesInput.filter(x => !userMovies.includes(x));
            moviesToDelete = userMovies.filter(x => !moviesInput.includes(x));
        } else if (!moviesInput.length) {
            moviesToDelete = userMovies;
        } else if (!userMovies.length) {
            moviesToPost = moviesInput;
        }
        if (moviesToPost !== undefined) {
            for (const movie of moviesToPost) {
                await api.post("/UserMovie/" + currentUser + "/" + movie);
                await api.put("/User/AddUserMovies/" + currentUser + "/" + movie);
                await api.put("/Movie/AddUserMovies/" + currentUser + "/" + movie);
            }
        }
        if (moviesToDelete !== undefined) {
            for (const movie of moviesToDelete) {
                await api.delete("/UserMovie/" + currentUser + "/" + movie);
                await api.put("/User/DeleteUserMovies/" + currentUser + "/" + movie);
                await api.put("/Movie/DeleteUserMovies/" + currentUser + "/" + movie);
            }
        }

        let tvShowsToPost = undefined;
        let tvShowsToDelete = undefined;
        if (tvShowsInput.length && userTVShows.length) {
            tvShowsToPost = tvShowsInput.filter(x => !userTVShows.includes(x));
            tvShowsToDelete = userTVShows.filter(x => !tvShowsInput.includes(x));
        } else if (!tvShowsInput.length) {
            tvShowsToDelete = userTVShows;
        } else if (!userTVShows.length) {
            tvShowsToPost = tvShowsInput;
        }
        if (tvShowsToPost !== undefined) {
            for (const tvShow of tvShowsToPost) {
                await api.post("/UserTVShow/" + currentUser + "/" + tvShow);
                await api.put("/User/AddUserTVShows/" + currentUser + "/" + tvShow);
                await api.put("/TVShow/AddUserTVShows/" + currentUser + "/" + tvShow);
            }
        }
        if (tvShowsToDelete !== undefined) {
            for (const tvShow of tvShowsToDelete) {
                await api.delete("/UserTVShow/" + currentUser + "/" + tvShow);
                await api.put("/User/DeleteUserTVShows/" + currentUser + "/" + tvShow);
                await api.put("/TVShow/DeleteUserTVShows/" + currentUser + "/" + tvShow);
            }
        }

        let videoGamesToPost = [];
        let videoGamesToDelete = [];
        if (videoGamesInput.length && userVideoGames.length) {
            videoGamesToPost = videoGamesInput.filter(x => !userVideoGames.includes(x));
            videoGamesToDelete = userVideoGames.filter(x => !videoGamesInput.includes(x));
        } else if (!videoGamesInput.length) {
            videoGamesToDelete = userVideoGames;
        } else if (!userVideoGames.length) {
            videoGamesToPost = videoGamesInput;
        }
        if (videoGamesToPost !== undefined) {
            for (const videoGame of videoGamesToPost) {
                await api.post("/UserVideoGame/" + currentUser + "/" + videoGame);
                await api.put("/User/AddUserVideoGames/" + currentUser + "/" + videoGame);
                await api.put("/VideoGame/AddUserVideoGames/" + currentUser + "/" + videoGame);
            }
        }
        if (videoGamesToDelete !== undefined) {
            for (const videoGame of videoGamesToDelete) {
                await api.delete("/UserVideoGame/" + currentUser + "/" + videoGame);
                await api.put("/User/DeleteUserVideoGames/" + currentUser + "/" + videoGame);
                await api.put("/VideoGame/DeleteUserVideoGames/" + currentUser + "/" + videoGame);
            }
        }
    }


    const setMoviesTVShowsAndVideoGames = async () => {
        try {
            const movieResponse = await api.get("/Movie/");
            const tvShowResponse = await api.get("/TVShow/");
            const videoGameResponse = await api.get("/VideoGame/");
            const movieTitles = [];
            const tvShowTitles = [];
            const videoGameTitles = [];
            for (const movie of movieResponse.data) {
                movieTitles.push(movie.title);
            }
            for (const tvShow of tvShowResponse.data) {
                tvShowTitles.push(tvShow.title);
            }
            for (const videoGame of videoGameResponse.data) {
                videoGameTitles.push(videoGame.title);
            }
            setMovies(movieTitles);
            setTVShows(tvShowTitles);
            setVideoGames(videoGameTitles);
            setLoadingEditList(false);
        } catch (e) {
            console.log(e);
        }
    };

    const setUserMoviesTVShowsAndVideoGames = async () => {
        try {
            const userResponse = await api.get("/User/Name/" + currentUser);
            const currentUserId = userResponse.data.id;

            const movieResponse = await api.get("/UserMovie/Id/" + currentUserId);
            const tvShowResponse = await api.get("/UserTVShow/Id/" + currentUserId);
            const videoGameResponse = await api.get("/UserVideoGame/Id/" + currentUserId);
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
            if (initializeInput) {
                setMoviesInput(movieTitles);
                setTVShowsInput(tvShowTitles);
                setVideoGamesInput(videoGameTitles);
                setInitializeInput(false);
            }
            setLoadingUserEditList(false);
        } catch (e) {
            console.log(e);
        }
    }

    const setCurrentUsersAndFriends = async () => {
        try {
            const friendResponse = await api.get("/Friend/" + currentUser);
            const userResponse = await api.get("/User/");
            const currentUserResponse = await api.get("/User/Name/" + currentUser);
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
                        {currentUser}'s Page
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
                                    <Typography>{user.antiSocialScore}</Typography>
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
                <Box>
                    {!edit ? (
                        <Box textAlign='center'>
                            <Button align="center" variant="contained" onClick={() => handleEdit()}>
                                Edit Profile
                            </Button>
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