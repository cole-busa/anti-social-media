import axios from 'axios';

export default axios.create({
    baseURL:'http://localhost:8080',
    headers: {
        'Access-Control-Allow-Origin' : '*', 
        'Access-Control-Allow-Credentials' : true,
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
});