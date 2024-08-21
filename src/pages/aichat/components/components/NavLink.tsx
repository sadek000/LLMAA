import React, { useContext } from "react";
import { Link } from "react-router-dom";

const NavLinks = ({ svg, link, text, setChatLog }: any) => {
  const handleClick = async (text: any) => {};

  return (
    <Link
      to={link}
      // target={link && "_blank"}
      rel="noreferrer"
      style={{ textDecoration: "none" }}
      onClick={() => handleClick(text)}
    >
      <div className="navPrompt">
        {svg}
        <p>{text}</p>
      </div>
    </Link>
  );
};

export default NavLinks;
