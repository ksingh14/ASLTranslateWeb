import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import aslLogo from '../Images/asl-logo3-colorCorrected.png';

const styles = {
  // this group of buttons will be aligned to the right side
  toolbarButtons: {
    marginLeft: 'auto',
  },
};

export default function Nav({ }) {
  return (
    <>
      <AppBar
        // sx={{
        //   display: "flex",
        //   justifyContent: "center",
        //   alignItems: "left"
        // }}
        position="relative"
        variant="elevation"
      >
        <Toolbar>
          {/* <GitHubIcon sx={{ mr: 2 }} fontSize="large" /> */}
          <Box display='flex' flexGrow={1}>
          <Box sx={{ mr: 2, width: 120 }}
            component="img"
            alt="logo"
            src={aslLogo}
          />
          <Typography color="inherit" variant="h4" noWrap sx={{ fontFamily: 'Quicksand'}}>
            ASL Translator
            {/* {name} */}
            {/* <Typography color="inherit" noWrap>
              {location}
            </Typography> */}
          </Typography>
          </Box>
          <Typography sx={{ mr: 3}}>Home</Typography>
          <Typography  sx={{ mr: 3 }}>About</Typography>
          <Typography  sx={{ mr: 3 }}>Bio</Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}
