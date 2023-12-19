import './App.css';
import LoginForm from './components/LoginForm/LoginForm';
import Form from './components/Form/Formulario';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Outlet><Form /></Outlet>} />
        <Route path="/login" element={<Outlet><LoginForm /></Outlet>} />
      </Routes>
    </Router>
  );
}

export default App;
