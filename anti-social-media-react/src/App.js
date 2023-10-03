import './App.css';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Login from './components/home/Login';


function App() {
  /*const [users, setUsers] = useState();
  const setUser = async () => {
    try {
      //const response = await api.get("/User/");
      //setUsers(response.data);
      //const data = JSON.stringify({ username: "hello", password: "test" });
      //api.post("/User/", data, { headers: { 'Content-Type': 'application/json' },
      //withCredentials: false }).then(response => {console.log(response)});
    } catch(e) {
      console.log(e);
    }
  }
  useEffect(() => {
    setUser();
  },[])*/

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Login/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
