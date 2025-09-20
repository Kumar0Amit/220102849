import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import { Drawer, List, ListItem, ListItemText, ListItemButton } from "@mui/material";

export default function App() {
  return (
    <Router>
      <Drawer variant="permanent" anchor="left">
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/">
              <ListItemText primary="Shortener" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/stats">
              <ListItemText primary="Stats" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <div style={{ marginLeft: 240 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </div>
    </Router>
  );
}
