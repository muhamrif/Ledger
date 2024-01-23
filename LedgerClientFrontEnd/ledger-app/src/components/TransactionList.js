import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, TextField, Grid } from '@mui/material';
import { Container } from 'react-bootstrap';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [sortedTransactions, setSortedTransactions] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get('http://localhost:8080/transactions', { headers });
        console.log(response.data);

        setTransactions(response.data);
        setSortedTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error.response.data);
      }
    };

    fetchTransactions();
  }, []);

  const handleDelete = async (transactionId) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await axios.delete(`http://localhost:8080/transactions/${transactionId}`, { headers });

      setTransactions((prevTransactions) =>
        prevTransactions.filter((transaction) => transaction.id !== transactionId)
      );
      setSortedTransactions((prevTransactions) =>
        prevTransactions.filter((transaction) => transaction.id !== transactionId)
      );

      console.log(`Transaction with ID ${transactionId} deleted successfully`);
    } catch (error) {
      console.error('Error deleting transaction:', error.response.data);
    }
  };

  const handleSort = (criteria) => {
    setSortBy(criteria);
    setSortOrder((prevOrder) =>
      sortBy === criteria ? (prevOrder === 'asc' ? 'desc' : 'asc') : 'asc'
    );
    sortTransactions(sortedTransactions, criteria);

  };

  const handleFilter = () => {
    // Apply the date filter on the frontend
    const filteredTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      const minFilterDate = minDate ? new Date(minDate) : null;
      const maxFilterDate = maxDate ? new Date(maxDate) : null;

      if (minFilterDate && transactionDate < minFilterDate) {
        return false;
      }

      if (maxFilterDate && transactionDate > maxFilterDate) {
        return false;
      }

      return true;
    });

    setSortedTransactions(filteredTransactions);
  };

  const sortTransactions = (transactionsToSort, sortByCriteria) => {
    const sorted = [...transactionsToSort].sort((a, b) => {
      if (sortByCriteria === 'date') {
        return sortOrder === 'asc'
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      } else if (sortByCriteria === 'amount') {
        return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      } else if (sortByCriteria === 'vendor') {
        return sortOrder === 'asc'
          ? a.vendor.localeCompare(b.vendor)
          : b.vendor.localeCompare(a.vendor);
      }
      return 0;
    });

    setSortedTransactions(sorted);
  };

  const calculateRunningTotal = (type) => {
    return transactions.reduce((total, transaction) => {
      if ((type === 'payment' && transaction.amount < 0) || (type === 'deposit' && transaction.amount > 0)) {
        return total + transaction.amount;
      }
      return total;
    }, 0);
  };

  const totalPayments = calculateRunningTotal('payment');
  const totalDeposits = calculateRunningTotal('deposit');


  return (
    <Container maxwidth="md" style={{ textAlign: 'center', marginTop: '20px' }}>
    <div>
      <label>Min Date:</label>
      <TextField
        type="date"
        value={minDate}
        onChange={(e) => setMinDate(e.target.value)}
        style={{ marginLeft: '10px' }}
      />
      <label style={{ marginLeft: '10px' }}>Max Date:</label>
      <TextField
        type="date"
        value={maxDate}
        onChange={(e) => setMaxDate(e.target.value)}
        style={{ marginLeft: '10px' }}
      />
      <Button variant="contained" color="primary" onClick={handleFilter} style={{ marginLeft: '10px' }}>
        Apply Filter
      </Button>
    </div>

    <Link to="/add-transaction">
      <Button variant="contained" color="success" style={{ margin: '20px 0' }}>
        Add Transaction
      </Button>
    </Link>

    <div>
      <Button variant="contained" color="primary" onClick={() => handleSort('date')}>
        Sort by Date {sortBy === 'date' && `(${sortOrder})`}
      </Button>
      <Button variant="contained" color="primary" onClick={() => handleSort('amount')} style={{ marginLeft: '10px' }}>
        Sort by Amount {sortBy === 'amount' && `(${sortOrder})`}
      </Button>
      <Button variant="contained" color="primary" onClick={() => handleSort('vendor')} style={{ marginLeft: '10px' }}>
        Sort by Vendor {sortBy === 'vendor' && `(${sortOrder})`}
      </Button>
    </div>
    
        <Grid style={{ marginTop: '20px' }}>
        <Button variant='outlined' color='error' >
          Payments:{" "} {totalPayments.toFixed(2)}
          </Button>
          <Button variant='outlined' color={totalDeposits+totalPayments>=0?'success':'error'} >
          Total Account Value:{" "}{(totalDeposits+totalPayments).toFixed(2)}
          </Button>
        <Button variant='outlined' color='success' >
          Deposits:{" "}{totalDeposits.toFixed(2)}
        </Button>
        </Grid>

<Grid container justifyContent="center" spacing={3} style={{ marginTop: '20px' }}>
      <Grid item xs={12}>
    <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Edit</th>
            <th>Date</th>
            <th>Time</th>
            <th>Description</th>
            <th>Vendor</th>
            <th>Amount</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map((transaction) => (
            // <tr key={transaction.id}>
            <tr key={transaction.id} style={{ background: transaction.amount <= 0 ?'#ffe5e5': '#e5ffe5'}}>
                <td>
                <Link to={`/update-transaction/${transaction.id}`}>
                  <Button variant="outlined"
                  color='success'>Edit</Button>
                </Link>
                </td>
              <td>{transaction.date}</td>
              <td>{transaction.time}</td>
              <td>{transaction.description}</td>
              <td>{transaction.vendor}</td>
              <td>{"$"}{transaction.amount.toFixed(2)}</td>
              <td>
                <Button
                  variant="outlined"
                  color='error'
                  onClick={() => handleDelete(transaction.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </Grid>
    </Grid>
    </Container>
  );
};

export default TransactionList;
