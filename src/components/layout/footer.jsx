import React from "react";

const Footer = () => {
  return (
    <div className="border-t p-4 flex flex-col text-center">
      <small>Copyright©{new Date().getFullYear()} - All Rights Reserved.</small>
      {/* <small>ReactJS & Spring Booot</small> */}
    </div>
  );
};

export default Footer;
