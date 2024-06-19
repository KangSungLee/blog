import React from 'react';
import SideBarMenu from './SideBarMenu';
import SideBarIcon from './SideBarIcon';
import '../../css/sidebar.css';
import { Box } from '@mui/material';
import SideBarProfile from './SideBarProfile';

export default function Sidebar() {
  return (
    <Box
      className="sideBar"
    >
      <SideBarProfile />
      <SideBarMenu />
      <SideBarIcon />
    </Box>
  );
}
