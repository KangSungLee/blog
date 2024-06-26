import React from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import { ListItemButton } from '@mui/material';

export default function SideBarMenu() {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div className="container">
      <List>
        <ListItemButton onClick={() => handleClick('/home')}>
          <ListItemText primary="Home" className="listItemText" />
        </ListItemButton>
        <ListItemButton onClick={() => handleClick('/about')}>
          <ListItemText primary="About" className="listItemText" />
        </ListItemButton>
        <ListItemButton onClick={() => handleClick('/recordList')}>
          <ListItemText primary="Record" className="listItemText" />
        </ListItemButton>
        <ListItemButton onClick={() => handleClick('/implementationPage')}>
          <ListItemText primary="Implementation" className="listItemText" />
        </ListItemButton>
      </List>
    </div>
  );
}
