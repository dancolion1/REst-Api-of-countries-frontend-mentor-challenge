import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./Navbar.css";
import LightDarkSwitch from "../styles/LightDarkSwitch";

const changeTheme = () => {
  const text = document.getElementById("label");
  if (text.innerHTML === "Light Mode") {
    text.innerHTML = "Dark Mode";
  } else {
    text.innerHTML = "Light Mode";
  }
  document.body.classList.toggle("dark-theme");
};

const Navbar = () => {
  return (
    <nav id="nav">
      <div className="title">Where in the world?</div>
      <div className="nav-right">
        <FormControlLabel
          control={<LightDarkSwitch sx={{ m: 1 }} />}
          onChange={changeTheme}
        />
        <div id="label">Light Mode</div>
      </div>
    </nav>
  );
};

export default Navbar;