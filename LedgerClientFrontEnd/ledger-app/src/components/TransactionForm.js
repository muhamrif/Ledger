import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';

const TransactionForm = () => {
  const { id } = useParams();
  const history = useNavigate();

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    description: '',
    vendor: '',
    amount: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    if (id) {
      axios.get(`http://localhost:8080/transactions/${id}`, { headers })
        .then(response => {
          const { date, time, description, vendor, amount } = response.data;
          setFormData({ date, time, description, vendor, amount });
        })
        .catch(error => {
          console.error('Error fetching transaction data:', error.response.data);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      if (id) {
        await axios.put(`http://localhost:8080/transactions/${id}`, formData, { headers });
        console.log('Transaction updated successfully!');
      } else {
        await axios.post('http://localhost:8080/transactions', formData, { headers });
        console.log('Transaction added successfully!');
      }

      history('/transactions');
    } catch (error) {
      console.error('Transaction submission failed!');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ width: '60%', height: '60%' }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {id ? 'Update Transaction' : 'Add Transaction'}
          </Typography>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <TextField
              label = 'Date'
              InputLabelProps={{
                shrink: true,
              }}
                variant="outlined"
                fullWidth
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <TextField
              label = "Time"
              InputLabelProps={{
                shrink: true,
              }}
                variant="outlined"
                fullWidth
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <TextField
                label="Vendor"
                variant="outlined"
                fullWidth
                type="text"
                id="vendor"
                name="vendor"
                value={formData.vendor}
                onChange={handleChange}
                required
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <TextField
                label="Amount"
                variant="outlined"
                fullWidth
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="submit" variant="contained" color="success">
                {id ? 'Update' : 'Add'} Transaction
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionForm;
