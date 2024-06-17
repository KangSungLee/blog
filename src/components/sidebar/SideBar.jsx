import React from 'react';
import SideBarMenu from './SideBarMenu';
import SideBarIcon from './SideBarIcon';
import '../../css/sidebar.css';
import { Drawer } from '@mui/material';

export default function Sidebar() {
  return (
    <Drawer
      className="sideBar"
      variant="permanent"
      classes={{
        paper: "drawerPaper", 
      }}
      anchor="left"
      zIndex={0}
    >
      <SideBarMenu />
      <SideBarIcon />
    </Drawer>
  );
}
