import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import CartIcon from "./CartIcon";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Typography } from "@mui/material";

const drawerWidth = 240;

export default function ResponsiveDrawer({ data, filterFunction }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [categories, setCategories] = useState<string[]>([
    "All",
    "men's clothing",
    "jewelery",
    "electronics",
    "women's clothing",
  ]);

  const [price, setPrice] = useState<string[]>([
    "0 - 50",
    "50 - 100",
    "100 - 500",
    "500 +",
  ]);

  const [value, setValue] = useState("All");
  const [valuePrice, setValuePrice] = useState("");


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("hello");
    setValue((event.target as HTMLInputElement).value);
    // console.log(event.target.value);
    let filtered = data.filter(
      (item: any) => item.category === event.target.value
    );
    // console.log(filtered);
    if (filtered.length > 0) {
      filterFunction(filtered);
      setValuePrice("");
    }else if(filtered.length === 0) {
      console.log(data);
      filterFunction(data);
      setValuePrice("");
    }
  };

  const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.value === "0 - 50"){
        setValuePrice((event.target as HTMLInputElement).value);
        let filtered = data.filter(
            (item: any) => item.price > 0 && item.price <=50
        );
        filterFunction(filtered);
        setValue("");
    }else if(event.target.value === "50 - 100"){
        setValuePrice((event.target as HTMLInputElement).value);
        let filtered = data.filter(
            (item: any) => item.price > 50 && item.price <=100
        );
        filterFunction(filtered);
        setValue("");
    }else if(event.target.value === "100 - 500"){
        setValuePrice((event.target as HTMLInputElement).value);
        let filtered = data.filter(
            (item: any) => item.price > 100 && item.price <=500
        );
        filterFunction(filtered);
        setValue("");
    }else{
        setValuePrice((event.target as HTMLInputElement).value);
        let filtered = data.filter(
            (item: any) => item.price > 500 
        );
        filterFunction(filtered);
        setValue("");
    }
  };

  useEffect(() => {}, []);

  const drawer = (
    <div className="p-4">
      <Toolbar />
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">Category</FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          {categories.map((item) => (
            <FormControlLabel
              key={item}
              value={item}
              control={<Radio />}
              label={item}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider sx={{my: 4}} />
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group-2">Price in BDT</FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group-2"
          name="controlled-radio-buttons-group-2"
          value={valuePrice}
          onChange={handleChangePrice}
        >
          {price.map((item) => (
            <FormControlLabel
              key={item}
              value={item}
              control={<Radio />}
              label={item}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography>Junaid's Shop</Typography>
          <Box sx={{ mr: "5vw" }}>
            <CartIcon />
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}
