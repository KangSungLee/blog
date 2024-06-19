import React, { useEffect, useState } from "react";
import { Outlet } from 'react-router-dom';
import Sidebar from "./components/sidebar/SideBar";
import { Grid } from "@mui/material";
import TopBar from "./components/topbar/TopBar";
import "./css/app.css"
// import { AuthContextProvider } from './context/AuthContext';

export default function App() {
  return (
      // <AuthContextProvider>
      <Grid container>
        <Grid item lg={2}>
          <Sidebar />
        </Grid>
        <Grid item lg={10} >
          <TopBar/>
          <div className="mainPage">
            <Outlet />
          </div>
        </Grid>
      </Grid>
      // </AuthContextProvider>
  );
}