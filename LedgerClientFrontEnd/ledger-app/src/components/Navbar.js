import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
       <AppBar position="sticky" style={{ top: 0, zIndex: 1000 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"

          >
            <LocalAtmIcon/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ray's Ghost
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            
            {isAuthenticated ? (
              <>
              <Button color="inherit" component={Link} to="/transactions">
              Home
            </Button>
                <Button color="inherit" component={Link} to="/add-transaction">
                  Add Transactions
                </Button>
                <Button color="inherit" component={Link} to="/profile">
                  Profile
                </Button>
                <Button color="inherit" onClick={onLogout}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/signup">
                  Signup
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
