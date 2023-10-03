import React from 'react';

import api from '../../api/axiosConfig'
import { useState } from 'react';

const Home = () => {
    const handleSubmit = e => {
        e.preventDefault();
        
        const data = JSON.stringify({ username, password });
        try {
            api.post(
                "/User/", 
                data,
                { headers: { 'Content-Type': 'application/json' },
                    withCredentials: true }
            ).then(response => {console.log(response)});
        } catch(e) {
            console.log(e);
        }
      }
    
      const [username, setUsername] = useState()
      const [password, setPassword] = useState()
    
    return (
        <div>
            <form action="" id="login" method="post">
                <h1>Login</h1>
                <p className="item">
                    <label htmlFor="username"> Username </label>
                    <input type="username" name="username" id="username" />
                </p>
                <p className="item">
                    <label htmlFor="password"> Password </label>
                    <input type="password" name="password" id="password" />
                </p>
                <p className="item">
                    <input type="submit" value="Login" />
                </p>
            </form>
        </div>
    );
}

export default Home;
