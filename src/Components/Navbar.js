import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ itemCount }) => {
  return (
    <>
      <div className="wrapper">
        <h3 className="title"> Online Shopping Center</h3>
        <div className="cart-logo">
          <Link to="/cart">
            <i className="fa-solid fa-cart-shopping cart"></i>
          </Link>

          {itemCount > 0 && <span className="items-count">{itemCount}</span>}
        </div>
      </div>
    </>
  );
};

export default Navbar;
