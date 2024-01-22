import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get('http://localhost:8080/profile', { headers });

        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error.response.data);
      }
    };

    fetchProfile();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.put('http://localhost:8080/profile', profile, { headers });

      setIsEditing(false);
      console.log('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error.response.data);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ width: '60%', height: '80%' }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Profile
          </Typography>
          {isEditing ? (
            <form>
              <div style={{ marginBottom: '1rem' }}>
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <TextField
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  type="text"
                  id="phone"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  type="text"
                  id="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  type="text"
                  id="address"
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <TextField
                  label="City"
                  variant="outlined"
                  fullWidth
                  type="text"
                  id="city"
                  name="city"
                  value={profile.city}
                  onChange={handleChange}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <TextField
                  label="State"
                  variant="outlined"
                  fullWidth
                  type="text"
                  id="state"
                  name="state"
                  value={profile.state}
                  onChange={handleChange}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <TextField
                  label="ZIP"
                  variant="outlined"
                  fullWidth
                  type="text"
                  id="zip"
                  name="zip"
                  value={profile.zip}
                  onChange={handleChange}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="button" variant="contained" color="success" onClick={handleSave}>
                  Save
                </Button>
              </div>
            </form>
          ) : (
            <div >
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              id="firstName"
              name="firstName"
              value={profile.firstName}
              InputProps={{ readOnly: true }}
              style={{marginTop:'15px'}}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              id="lastName"
              name="lastName"
              value={profile.lastName}
              InputProps={{ readOnly: true }}
              style={{marginTop:'15px'}}
            />
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              id="phone"
              name="phone"
              value={profile.phone}
              InputProps={{ readOnly: true }}
              style={{marginTop:'15px'}}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              id="email"
              name="email"
              value={profile.email}
              InputProps={{ readOnly: true }}
              style={{marginTop:'15px'}}
            />
             <TextField
              label="Address"
              variant="outlined"
              fullWidth
              id="address"
              name="address"
              value={profile.address}
              InputProps={{ readOnly: true }}
              style={{marginTop:'15px'}}
            />
            <TextField
              label="City"
              variant="outlined"
              fullWidth
              id="city"
              name="city"
              value={profile.city}
              InputProps={{ readOnly: true }}
              style={{marginTop:'15px'}}
            />
            <TextField
              label="State"
              variant="outlined"
              fullWidth
              id="state"
              name="state"
              value={profile.state}
              InputProps={{ readOnly: true }}
              style={{marginTop:'15px'}}
            />
            <TextField
              label="Zip"
              variant="outlined"
              fullWidth
              id="zip"
              name="zip"
              value={profile.zip}
              InputProps={{ readOnly: true }}
              style={{marginTop:'15px'}}
            />
            <Button type="submit" variant="contained" color="success" onClick={handleEdit} style={{marginTop:'15px'}}>
              Edit Profile
            </Button>
          </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
