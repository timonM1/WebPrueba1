import "./App.css";

import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
// import Home from "./pages/Home";
import Movies from "./pages/Movies";
// import HomeIcon from "@mui/icons-material/Home";
import ShopIcon from "@mui/icons-material/Shop";
import { GlobalStyles } from "@mui/material";

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
          body: { backgroundColor: "#d3e6f3" },
        }}
      />
      <Navbar navLinks={navLinks} />
      <Routes>
        {/* <Route path={"/"} element={<Home />}></Route> */}
        <Route path={"/WebPrueba1/"} element={<Movies />}></Route>
      </Routes>
    </>
  );
}

export default App;
