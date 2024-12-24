import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Users from './pages/Users';
import Admin from './pages/Admin';

function App() {

  return (
    <Router>

          <Routes>
                
                <Route path='/' element={ <Users /> } />
                <Route path='/register' element={ <Register /> } />
                <Route path='/login' element={ <Login /> } />
                <Route path='/admin' element={ <Admin /> } />

          </Routes>
          
    </Router>
  )
}

export default App
