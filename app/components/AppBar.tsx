"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/material";
import CartIcon from "./CartIcon";
import { useRouter } from "next/navigation";


const AppBarComp: React.FC = () => {
  const route = useRouter();
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>Junaid's Shop</Typography>
        <Box sx={{ mr: "5vw" }}>
          <IconButton aria-label="cart" sx={{ mr: 2 }}>
              <HomeIcon onClick={() => route.replace("/")} />
          </IconButton>
          <CartIcon />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComp;
