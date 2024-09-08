import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem, ListItemIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';

const Navbar = ({ toggleSidebar }) => {
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    try {
        await axios.post('http://localhost/dashboardmistral1/logout.php', { username });
        // Clear authentication state and user info
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        // Redirect to login page
        window.location.href = '/login';
    } catch (error) {
        console.error(error);
    }
}; 

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          My Dashboard 
        </Typography>
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenuOpen}
          color="inherit"
        >
          <Avatar alt="User" src="/path/to/user/image.jpg" />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <Typography variant="inherit">Profile ({username}) - role: ({role}) </Typography>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <Typography variant="inherit" onClick={handleLogout}>Logout</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;