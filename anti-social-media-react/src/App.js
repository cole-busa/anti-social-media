import './styles/App.css';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Login from './components/home/Login';
import CreateAccount from './components/home/CreateAccount';
import { useEffect, useState } from 'react';


function App() {
  const [bColor, changeBColor] = useState('#560088')
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
  }*/

  useEffect(() => {
    document.body.style.backgroundColor = bColor;
  },[bColor])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/create-account" element={<CreateAccount/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
