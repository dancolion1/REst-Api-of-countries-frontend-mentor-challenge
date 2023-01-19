import React, { useState, useEffect } from "react";
import axios from "axios";
import 'semantic-ui-css/semantic.min.css';
import { Input, Dropdown } from "semantic-ui-react";
import Navbar from "../components/Navbar";
import CountryCard from "../components/CountryCard";
import "./HomePage.css";

const filterOptions = [
  { key: "All", text: "All", value: "All" },
  { key: "Africa", text: "Africa", value: "Africa" },
  { key: "Americas", text: "Americas", value: "Americas" },
  { key: "Asia", text: "Asia", value: "Asia" },
  { key: "Europe", text: "Europe", value: "Europe" },
  { key: "Oceania", text: "Oceania", value: "Oceania" },
];

const searchBarStyle = {
  width: 300,
  margin: "40px 40px 0 40px",
};

const filterStyle = {
  width: 200,
  margin: "40px 69px 0 40px",
};

const HomePage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filterByRegion = (region) => {
    if (region === "All") {
      axios
        .get("https://restcountries.com/v3.1/all")
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get(`https://restcountries.com/v3.1/region/${region}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="home">
      <Navbar />
      <div className="upper-div">
        <Input
          className="search-bar"
          icon="search"
          placeholder="Search for a country..."
          style={searchBarStyle}
          onChange={(e, data) => {
            axios
              .get(`https://restcountries.com/v3.1/name/${data.value}`)
              .then((res) => {
                const filteredData = res.data.filter((country) => {
                  return country.name.common
                    .toLowerCase()
                    .includes(data.value.toLowerCase());
                });
                setData(filteredData);
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        />
        <Dropdown
          className="dropdown"
          placeholder="Filter by Region"
          fluid
          search
          selection
          options={filterOptions}
          style={filterStyle}
          onChange={(e, data) => {
            filterByRegion(data.value);
          }}
        />
      </div>
      <div className="country-cards">
        {data.map((data) => {
          return (
            <CountryCard
              key={data.cca3}
              data={{
                name: data.name,
                flags: data.flags.png,
                population: data.population,
                region: data.region,
                capital: data.capital,
                cca3: data.cca3,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;