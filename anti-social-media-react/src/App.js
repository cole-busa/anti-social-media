import './styles/App.css';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Login from './components/home/Login';
import CreateAccount from './components/home/CreateAccount';
import Home from './components/home/Home';
import Profile from './components/home/Profile';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/create-account" element={<CreateAccount/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;