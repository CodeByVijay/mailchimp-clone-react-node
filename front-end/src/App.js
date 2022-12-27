import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PageNotFound from './pages/PageNotFound';
import './assets/css/main.css'
import './assets/css/sidebar.css'
import Home from './pages/createMenu/Home';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/sign-up' element={<Signup />} />
          <Route path='/admin/dashboard' element={<Dashboard />}  exact/>
          <Route path='/admin/create' element={<Home />} />
          <Route path='*' element={<PageNotFound/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
