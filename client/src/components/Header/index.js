import React from "react";
import { Link } from "react-router-dom";
import "../../components/Header/index.scss";
import image from "../../assets/images/Copy of Thought Boxer.png"

function Header() {
  return (
    <header>
      <Link to="/">
        <h2>THOUGHT BOXER</h2>
      </Link>
      <Link to="/">
        <img className="hover:animate-pulse" src={image} alt=""/>
        </Link>
    </header>
  );
}

export default Header;
