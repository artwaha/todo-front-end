import React from "react";

const Title = ({ title }) => {
  return (
    <div className="flex items-center justify-center font-bold mb-4">
      <hr className="flex-1" />
      <h1 className="mx-4 text-pink-600">{title || ""}</h1>
      <hr className="flex-1" />
    </div>
  );
};

export default Title;
