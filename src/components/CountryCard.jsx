import React from "react";
import { useNavigate } from "react-router-dom";
import "./CountryCard.css";

const populationWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const CountryCard = (props) => {
  const navigate = useNavigate();
  const { name, flags, population, region, capital, cca3 } = props.data;
  return (
    <div
      className="card"
      onClick={() => {
        navigate("/countryDetails/" + cca3);
      }}
    >
      <img src={flags} alt="flag" />
      <div className="country-name">{name.common}</div>
      <div className="country-info">
        <div className="country-population">
          <strong>Population:</strong> {populationWithCommas(population)}
        </div>
        <div className="country-region">
          <strong>Region: </strong>
          {region}
        </div>
        <div className="country-capital">
          <strong>Capital: </strong>
          {capital}
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
