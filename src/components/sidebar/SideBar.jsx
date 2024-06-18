import React from 'react';
import SideBarMenu from './SideBarMenu';
import SideBarIcon from './SideBarIcon';
import '../../css/sidebar.css';
import { Drawer } from '@mui/material';
import SideBarProfile from './SideBarProfile';

export default function Sidebar() {
  return (
    <Drawer
      className="sideBar"
      variant="permanent"
      classes={{
        paper: "drawerPaper", 
      }}
      anchor="left"
    >
      <SideBarProfile />
      <SideBarMenu />
      <SideBarIcon />
    </Drawer>
  );
}
