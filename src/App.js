import React, { useState, useEffect } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox"
import Map from "./Map"
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);
const onCountryChange = async (event) => {
  const countryCode =event.target.value;
  console.log("test===", countryCode);
  setCountry(countryCode);
};


  return (
    <div className="app">
      <div className="app_left">
<div className="app_header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined" onChange={onCountryChange} value={country}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
       <div className="app_stats">
         <InfoBox title="Coronavirus Cases" cases={22} total={22} />
         <InfoBox title="Recovered"cases={22} total={22} />
         <InfoBox title="Deaths" cases={22} total={22} />
         </div>       


              <Map />
      </div>
      <Card className="app_right">
              <CardContent>
                <h3>Live Cases by Country</h3>
                <h3>Worldwide New Cases</h3>
              </CardContent>
      </Card>
    </div>
  );
}

export default App;
