import React, { useEffect, useState } from "react";
import SEO from "./layout/seo";
import Invitation from "./invitation";
// import { getInvitations } from "../services/task-service";
const taskService = require("../services/task-service");

const Invitations = () => {
  const [invitations, setInvitations] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // console.log(await taskService.getInvitations(1));
      setInvitations(await taskService.getInvitations(1));
    }
    fetchData();
  }, []);

  return (
    <div>
      <SEO title="Invitations" description="Invitations" />
      {titleBar()}

      {invitations.length <= 0 ? (
        <div> No Invitations</div>
      ) : (
        invitations.map((invitation, index) => (
          <Invitation key={index} invitation={invitation} />
        ))
      )}
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
