import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <React.Fragment>
      <nav className="header navbar navbar-dark bg-dark">
        <Link className="navbar-brand mb-0" to="/">
          Store Tracker
        </Link>
      </nav>
    </React.Fragment>
  );
};
export default Header;
