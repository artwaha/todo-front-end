import React from "react";
import { Link } from "react-router-dom";

const NavItem = ({ type, qty, path, borderColor, activeTab }) => {
  return (
    <Link
      to={path}
      className={`ml-1 border-b-4 rounded-t-md w-fit px-4 py-2 text-sm ${borderColor}  ${
        activeTab === type ? `font-semibold italic` : ""
      }`}
    >
      {type} {qty ? ":" : ""} {qty}
    </Link>
  );
};

export default NavItem;
