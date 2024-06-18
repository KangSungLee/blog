import React, { useEffect, useState } from "react";
import { Outlet } from 'react-router-dom';
import Sidebar from "./components/sidebar/SideBar";
import { Grid } from "@mui/material";
// import { AuthContextProvider } from './context/AuthContext';

export default function App() {
  return (
      // <AuthContextProvider>
      <Grid container>
        <Grid item lg={3}>
          <Sidebar />
        </Grid>
        <Grid item lg={9} >
          <div className="appContent">
            <Outlet />
          </div>
        </Grid>
      </Grid>
      // </AuthContextProvider>
  );
}