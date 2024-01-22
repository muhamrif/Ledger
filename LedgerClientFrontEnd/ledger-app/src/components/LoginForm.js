import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/login', formData);
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/transactions');
      console.log('Login successful!', response.data);
    } catch (error) {
      console.error('Login failed!', error.response.data);
    }
    onLogin();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ width: '60%',height:'30%' }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <TextField
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Stack direction="row" spacing={16} justifyContent="center" mt={3}>
          <Button type="submit" variant="contained" color="success" size="large">
                Login
              </Button>
            <Button component="a" href="/signup" variant="contained" size="large">
              Sign Up
            </Button>
          </Stack>

            </div>
          </form>
          
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
