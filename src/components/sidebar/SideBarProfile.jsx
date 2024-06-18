import { CardMedia, Typography } from "@mui/material";
import React from "react";

export default function SideBarProfile() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 30 }}>
      <CardMedia 
        component="img" 
        src="https://avatars.githubusercontent.com/u/155405751?v=4"
        style={{ borderRadius: '50%', width: '80%', maxWidth: '200px' }}
      />
      <Typography variant="h5" sx={{ fontFamily: 'MangoByeolbyeol', marginTop: 1, color:'gray'}}>
        KangSung Lee
      </Typography>
    </div>
  );
}
