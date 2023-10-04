import './styles/App.css';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Login from './components/home/Login';
import CreateAccount from './components/home/CreateAccount';
import { useEffect, useState } from 'react';
import Home from './components/home/Home';
import { Context } from './GlobalVariables';

function App() {
  const [bColor, changeBColor] = useState('#560088')

  useEffect(() => {
    document.body.style.backgroundColor = bColor;
  },[bColor])

  const [currentUser, setCurrentUser] = useState(null);
  return (
    <div className="App">
      <Context.Provider value = {[currentUser, setCurrentUser]}>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="/" element={<Login/>}></Route>
            <Route path="/create-account" element={<CreateAccount/>}></Route>
            <Route path="/home" element={<Home/>}></Route>
          </Route>
        </Routes>
      </Context.Provider>
    </div>
  );
}

export default App;