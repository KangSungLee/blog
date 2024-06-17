import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';


export default function SideBarMenu() {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div className="container">
      <List>
        <ListItem button onClick={() => handleClick('/')}>
          <ListItemText primary="Home" className="listItemText" />
        </ListItem>
        <ListItem button onClick={() => handleClick('/about')}>
          <ListItemText primary="About" className="listItemText" />
        </ListItem>
        <ListItem button onClick={() => handleClick('/record')}>
          <ListItemText primary="Record" className="listItemText" />
        </ListItem>
        <ListItem button onClick={() => handleClick('/implementation')}>
          <ListItemText primary="Implementation" className="listItemText" />
        </ListItem>
      </List>
    </div>
  );
}
