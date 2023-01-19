import React from "react";
import Navbar from "../components/Navbar";
import useFetch from "../components/useFetch";
import btnStyle from "../styles/btnStyle";
import borderBtnStyle from "../styles/borderBtnStyle";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams, useNavigate } from "react-router-dom";
import "./CountryDetails.css";

const populationWithCommas = (x) => {
  x = "" + x;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const CountryDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data } = useFetch(
    `https://restcountries.com/v3.1/alpha/${params.cca3}`
  );

  return (
    <div>
      <Navbar />
      <Button
        style={btnStyle}
        variant="contained"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/")}
      >
        Back
      </Button>
      <div className="country-details-container">
        <div className="country-details-image">
          <img src={data[0]?.flags.png} alt="country flag" />
        </div>
        <div className="main">
          <h1 className="name">{data[0]?.name.common}</h1>
          <div className="country-details-info">
            <div className="country-details-info-left">
              <div>
                <strong>Native Name: </strong>
                {data[0]?.name.nativeName && data[0]?.name.nativeName
                  ? Object.values(data[0]?.name.nativeName).map(
                      (nName, index) => {
                        return index === 0 ? nName.common : null;
                      }
                    )
                  : ""}
              </div>
              <div>
                <strong>Population: </strong>
                {populationWithCommas(data[0]?.population)}
              </div>
              <div>
                <strong>Region: </strong>
                {data[0]?.region}
              </div>
              <div>
                <strong>Sub Region: </strong>
                {data[0]?.subregion}
              </div>
              <div>
                <strong>Capital: </strong>
                {data[0]?.capital}
              </div>
            </div>
            <div className="country-details-info-right">
              <div>
                <strong>Top Level Domain: </strong>
                {data[0]?.tld && data[0]?.tld
                  ? Object.values(data[0]?.tld).map((topLevelDomain, index) => {
                      return index === 0 ? topLevelDomain : null;
                    })
                  : ""}
              </div>
              <div>
                <strong>Currencies: </strong>
                {data[0]?.currencies && data[0]?.currencies
                  ? Object.values(data[0]?.currencies).map((curr, key) => (
                      <span key={key}>{curr.name}</span>
                    ))
                  : ""}
              </div>
              <div>
                <strong>Languages: </strong>
                {data[0]?.languages && data[0]?.languages
                  ? Object.values(data[0]?.languages).map((language, key) => (
                      <span key={key}>{language}, </span>
                    ))
                  : ""}
              </div>
            </div>
          </div>
          <div className="country-details-info-bottom">
            {data[0]?.borders && data[0]?.borders.length > 0 ? (
              <>
                <div className="border-countries">Border Countries: </div>
                {data[0]?.borders.map((border, index) => (
                  <div className="border-btn-container" key={index}>
                    <Button
                      style={borderBtnStyle}
                      variant="contained"
                      onClick={() => navigate(`/countryDetails/${border}`)}
                    >
                      {border}
                    </Button>
                  </div>
                ))}
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;