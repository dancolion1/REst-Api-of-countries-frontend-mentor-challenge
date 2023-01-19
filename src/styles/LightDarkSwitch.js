import React from "react";
import HomePage from "../pages/HomePage";
import CountryDetails from "../pages/CountryDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/countryDetails/:cca3" element={<CountryDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
