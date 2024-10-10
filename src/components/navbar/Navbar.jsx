import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Drawer,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import NavListDrawer from "./NavListDrawer";
import MenuIcon from "@mui/icons-material/Menu";

function Navbar({ navLinks }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Drawer
        open={open}
        anchor="left"
        onClose={() => setOpen(false)}
        sx={{
          display: { xs: "flex", sm: "none" },
        }}
      >
        <NavListDrawer navLinks={navLinks} setOpen={setOpen}></NavListDrawer>
      </Drawer>

      <AppBar
        position="static"
        sx={{
          p: 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            size="large"
            onClick={() => setOpen(true)}
            sx={{
              display: { xs: "flex", sm: "none" },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 10, ml: 5 }}>
            HOLA
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block", flexGrow: 1 } }}>
            {navLinks.map((item) => (
              <Button
                color="inherit"
                key={item.title}
                component={Link}
                to={item.path}
                sx={{ mr: 2 }}
              >
                {item.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
