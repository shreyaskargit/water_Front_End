import React from "react";
import "./css/header.css";

const Header = props => {
  return (
    <div className="Box">
      <div className="logo" style={{ backgroundRepeat: "no-repeat" }} />
      <h1>{props.head}</h1>
    </div>
  );
};

export default Header;
