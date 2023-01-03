import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PageNotFound from './pages/PageNotFound';
import './assets/css/main.css'
import './assets/css/sidebar.css'
import Home from './pages/createMenu/Home';
import Regular from './pages/createMenu/email/Regular';
import PlainText from './pages/createMenu/email/PlainText';
import Templetes from './pages/createMenu/email/Templetes';
import CreateEmail from './pages/CreateEmail';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/sign-up' element={<Signup />} />
          <Route path='/admin/dashboard' element={<Dashboard />} exact />
          <Route path='/admin/create' element={<Home />} />
          <Route path='/admin/create/email/regular' element={<Regular />} />
          <Route path='/admin/create/email/plain-text' element={<PlainText />} />
          <Route path='/admin/create/email/templetes' element={<Templetes />} />
          <Route path='/admin/create-email' element={<CreateEmail />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
