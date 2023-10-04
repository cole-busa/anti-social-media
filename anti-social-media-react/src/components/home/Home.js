import React, { useContext } from 'react';

import { Context } from '../../GlobalVariables';
import { Typography } from '@mui/material';

const Home = () => {
    const [currentUser, setCurrentUser] = useContext(Context);
    return (
        <div>
            <Typography sx={{color:'white', fontFamily: 'Roboto', fontSize: '90px'}}> Welcome {currentUser}! </Typography>
        </div>
    );
}

export default Home;