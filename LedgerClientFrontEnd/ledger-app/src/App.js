
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm'; 
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm'; 
import Profile from './components/Profile'; 
import SignupForm from './components/SignupForm';


const App = () => {
  const token = localStorage.getItem('token');
  const [isAuthenticated, setIsAuthenticated] = useState(token?true:false);

  useEffect(() => {
    
  }, [isAuthenticated])
  


  const handleLogout = () => {
    // Clear authentication state
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    window.location.replace('/login');
  };
  const handleLogin = () => {
    setIsAuthenticated(true);
    return <Navigate to="/transactions" />
  };


  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      {isAuthenticated? 
      
      <Routes>
        <Route path="/*" element={<TransactionList />} />
        <Route path="/transactions" element={<TransactionList />} />
        <Route path="/add-transaction" element={<TransactionForm />} />
        <Route path="/update-transaction/:id" element={<TransactionForm />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      :
      <Routes>
      <Route path="/*" element={<LoginForm onLogin={handleLogin}/>} />
      <Route path="/signup" element={<SignupForm/>} />
    </Routes>
      }
    </Router>
  );
};

export default App;
