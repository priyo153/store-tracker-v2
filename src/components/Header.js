import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <React.Fragment>
      <nav className="header navbar navbar-dark bg-dark">
        <Link className="navbar-brand mb-0" to="/">
          <img
            alt="logo"
            src="https://img.icons8.com/fluent/96/000000/buy.png"
            className="mr-2 mb-2"
            style={{ height: "2rem" }}
          />
          Store Tracker
        </Link>
      </nav>
    </React.Fragment>
  );
};
export default Header;
