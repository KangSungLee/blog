import React from "react";
import { Outlet } from 'react-router-dom';
import Sidebar from "./components/sidebar/SideBar";
import { Grid } from "@mui/material";
import './css/app.css'
// import { AuthContextProvider } from './context/AuthContext';

export default function App() {
  return (
      // <AuthContextProvider>
      <Grid container>
        <Grid item lg={2}>
          <Sidebar />
        </Grid>
        <Grid item lg={10} >
          <div className="appContent">
            <Outlet />
          </div>
        </Grid>
      </Grid>
      // </AuthContextProvider>
  );
}