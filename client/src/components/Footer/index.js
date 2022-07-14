import React from "react";
import "../../components/Footer/index.scss";
import foxy from "../../assets/images/Minimal_Animal_Red_Fox_Logo.png";
import FtO from "../../assets/images/New Project.png";

function Footer() {
  return (
    <footer>
      <div>
        <p>From the developers of: </p>
      </div>
      <a href="https://joelhauser.github.io/Foxy/">
        <img className="animate-pulse" src={foxy} height={70} width={70} alt="foxy" />
      </a>
      <div>
        <p>and</p>
      </div>
      <a href="https://fork-that-orc.herokuapp.com/">
        <img className="animate-pulse" src={FtO} height={70} width={70} alt="FtO" />
      </a>
    </footer>
  );
}

export default Footer;
