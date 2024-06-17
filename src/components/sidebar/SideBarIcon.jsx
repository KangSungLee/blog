import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import { IconButton } from "@mui/material";

export default function SideBarIcon() {
  const clickGitHub = () => {
    window.location.href = 'https://github.com/KangSungLee';
  } 
  return (
    <div className="sideBarIcon">
      <IconButton onClick={() => clickGitHub()}>
        <GitHubIcon />
      </IconButton>
    </div>
  );
}