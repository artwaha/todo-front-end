import React from "react";

const NewNav = () => {
  return (
    <div className="border min-h-screen p-8 flex justify-center">
      <div className="">
        <button>All</button>
        <button>Completed</button>
        <button>Pending</button>
        <button>Invitation</button>
      </div>
    </div>
  );
};

export default NewNav;
