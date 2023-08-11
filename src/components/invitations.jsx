import React from "react";
import SEO from "./layout/seo";
import Invitation from "./invitation";

const Invitations = () => {
  return (
    <div>
      <SEO title="Invitations" description="Invitations" />
      {titleBar()}
      <Invitation />
    </div>
  );
};

function titleBar() {
  return (
    <div
      className="grid font-bold p-2"
      style={{ gridTemplateColumns: "1fr 2fr 1fr" }}
    >
      <p className="">#</p>
      <p>Title</p>
      <p className="mx-auto">Action</p>
    </div>
  );
}

export default Invitations;
