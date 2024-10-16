import "./App.css";

import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
// import Home from "./pages/Home";
import Movies from "./pages/Movies";
// import HomeIcon from "@mui/icons-material/Home";
import ShopIcon from "@mui/icons-material/Shop";
import { Box, GlobalStyles } from "@mui/material";
import { Repeat } from "@mui/icons-material";

const navLinks = [
  // {
  //   title: "Home",
  //   path: "/",
  //   icon: <HomeIcon />,
  // },
  {
    title: "Movies",
    path: "/WebPrueba1/",
    icon: <ShopIcon />,
  },
];

function App() {
  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            position: "relative",
            background:
              "url(https://wallpapers.com/images/hd/horror-movie-collage-1600-x-1131-ax7inpi63ab8zoro.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          },
        }}
      />
      <Box
        component={"div"}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 1,
        }}
      />
      <Box style={{ position: "relative", zIndex: 2 }}>
        <Navbar navLinks={navLinks} />
        <Routes>
          <Route path={"/WebPrueba1/"} element={<Movies />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
