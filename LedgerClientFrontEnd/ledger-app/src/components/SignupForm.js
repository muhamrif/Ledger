import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Stack } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    role: 'ROLE_USER',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      if (formData.password !== formData.confirmPassword) {
        console.error('Passwords do not match');
        return;
      }
      const response = await axios.post('http://localhost:8080/register', formData);

      console.log('Signup successful!', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Signup failed!', error.response.data);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ width: '60%', height: '40%' }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Signup
          </Typography>
          <form>
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
            <div style={{ marginBottom: '1rem' }}>
              <TextField
                type="password"
                label="Confirm Password"
                variant="outlined"
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Stack direction="row" spacing={16} justifyContent="center" mt={3}>
              <Button type="button" variant="contained" color="success" size="large" onClick={handleSignup}>
                Signup
              </Button>
              <Button component="a" href="/login" variant="contained" color="primary"   size="large">
              Login
            </Button>
            </Stack>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupForm;
