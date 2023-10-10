import React, { useContext, useEffect, useState } from 'react';

import api from '../../api/axiosConfig';
import { Context } from '../../GlobalVariables';
import { AppBar, Box, Button, Card, CardActions, CardContent, CardMedia, Container, CssBaseline, Drawer, Grid, Stack, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material';

const Home = () => {
    const [currentUser, setCurrentUser] = useContext(Context);
    const defaultTheme = createTheme();
    const anti_social_score = 1;
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const [users, setUsers] = useState();
    const [friends, setFriends] = useState();
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [loadingFriends, setLoadingFriends] = useState(true);
    const [noFriends, setNoFriends] = useState(false);

    const handleSendFriendRequest = (friendname) => {
        api.post("/Friend/" + currentUser + "/" + friendname).then(response => { console.log(response) });
        api.put("/User/Friends/" + currentUser + "/" + friendname);
    }

    useEffect(() => {
        const setCurrentUsers = async () => {
            try {
                const response = await api.get("/User/");
                setUsers(response.data.filter((user) => user.username !== currentUser));
                setLoadingUsers(false);
            } catch (e) {
                console.log(e);
            }
        };

        const setCurrentFriends = async () => {
            try {
                const response = await api.get("/Friend/" + currentUser);
                setFriends(response.data);
                setLoadingFriends(false);
                if (response.data === null) {
                    setNoFriends(true);
                }
            } catch (e) {
                console.log(e);
            }
        };

        setCurrentUsers();
        setCurrentFriends();
    }, []);

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <AppBar sx={{ position: "fixed", zIndex: 1400 }}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        {currentUser}'s Page!
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
                    Current Users:
                    {loadingUsers ? (
                        <Typography>Loading users...</Typography>
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

                    Current Friends:
                    {loadingFriends ? (
                        <Typography>Loading friends...</Typography>
                    ) : !noFriends ? (
                        <Typography>No friends yet...</Typography>
                    ) : (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            {friends.map((friend) => (
                                <Box key={friend.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography>{friend.friendname}</Typography>
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
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            {currentUser}'s Page!
                        </Typography>
                        <Typography variant="h5" align="center" color="purple" fontWeight='bold' paragraph>
                            Anti-Social Score: {anti_social_score}
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
            </main>
        </ThemeProvider>
    );
}

export default Home;