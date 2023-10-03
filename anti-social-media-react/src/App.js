import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';


function App() {
  const [users, setUsers] = useState();
  const getUsers = async () => {
    try {
      const response = await api.get("/User/");
      setUsers(response.data);
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getUsers();
  },[])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Home/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
