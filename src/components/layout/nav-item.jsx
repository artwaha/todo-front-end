import React from "react";
import { Link } from "react-router-dom";

const NavItem = ({ type, qty, path, color, colorValue, activeTab }) => {
  return (
    <div
      className={`ml-1 border-b-4 rounded-t-md w-fit px-4 py-2 text-sm ${
        colorValue ? `border-${color}-${colorValue}` : `border-${color}`
      } `}
    >
      <Link
        to={path}
        className={`${activeTab === type ? `font-semibold italic` : ""}`}
      >
        {type}: {qty}
      </Link>
    </div>
  );
};

export default NavItem;
