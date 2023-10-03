import React from 'react';

import api from '../../api/axiosConfig';
import { useRef, useState, useEffect } from 'react';

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    },[]);

    useEffect(() => {
        setErrMsg('');
    },[username,password]);

    const handleSubmit = e => {
        e.preventDefault();
        api.post(
            '/User/', 
            JSON.stringify({ username, password }), 
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: false
            }
        ).then(response => {console.log(response)});
      }
    
    return (
        <div>
            <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>{errMsg}</p>
            <form onSubmit={handleSubmit}>
                <p>
                    <label htmlFor='username'>Username:</label>
                    <input 
                        type='text' 
                        id='username'
                        ref={userRef}
                        autoComplete='off'
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                    />
                </p>

                <p>
                    <label htmlFor='password'>Password:</label>
                    <input 
                        type='password' 
                        id='password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                </p>
                <p>
                    <button>Create Account</button>
                </p>
            </form>
        </div>
    );
}

export default Login;
