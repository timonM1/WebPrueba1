import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function NavListDrawer({ navLinks, setOpen }) {
  return (
    <Box
      sx={{
        width: 250,
      }}
    >
      <nav>
        <List>
          <ListItem>
            <ListItemText sx={{ textAlign: "center" }}>Menu</ListItemText>
          </ListItem>
          {navLinks.map((item) => (
            <ListItem disablePadding key={item.title}>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.title}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
}
