import React from "react";
import Header from "../Header";
import ForecastMap from "../forecastMap";

export default class Forecast extends React.Component {
  render() {
    return (
      <>
        <Header head={"Dugwell Forecast"} />
        <div style={{ width: "50%", margin: "0 auto" }}>
          <ForecastMap type="state" />
        </div>
      </>
    );
  }
}
