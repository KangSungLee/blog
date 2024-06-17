import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import { IconButton } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';

export default function SideBarIcon() {
  const clickGitHub = () => {
    window.location.href = 'https://github.com/KangSungLee';
  }

  const handleClickEmail = () => {
    const email = 'rkdtjd1020@naver.com'; // 여기에 이메일 주소를 입력합니다.
    const mailtoLink = `mailto:${email}`;
    window.open(mailtoLink);
  };

  return (
    <div className="sideBarIcon">
      <IconButton onClick={() => clickGitHub()}>
        <GitHubIcon />
      </IconButton>
      <IconButton>
        <EmailIcon onClick={handleClickEmail}/>
      </IconButton>
    </div>
  );
}