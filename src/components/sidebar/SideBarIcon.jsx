import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import { IconButton } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';

export default function SideBarIcon() {
  const clickGitHub = () => {
    window.location.href = 'https://github.com/KangSungLee';
  }

  const handleClickEmail = () => {
    const email = 'rkdtjd1020@naver.com';
    const mailtoLink = `mailto:${email}`;
    window.open(mailtoLink);
  };

  return (
    <div className="sideBarIcon">
      <IconButton onClick={clickGitHub}>
        <GitHubIcon />
      </IconButton>
      <IconButton onClick={handleClickEmail}>
        <EmailIcon />
      </IconButton>
    </div>
  );
}
