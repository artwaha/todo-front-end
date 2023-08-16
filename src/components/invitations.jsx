import React, { useEffect, useState } from "react";
import SEO from "./layout/seo";
import Invitation from "./invitation";
import { NavStateContext } from "../App";
import { useContext } from "react";
const taskService = require("../services/task-service");
const collaboratorService = require("../services/collaborator-service");

const Invitations = () => {
  const { setRefreshNav } = useContext(NavStateContext);
  const [invitations, setInvitations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Render Invitations");
    async function fetchData() {
      setInvitations(await taskService.getInvitations(1));
      setIsLoading(false);
    }
    fetchData();
  }, [isLoading]);

  const handleReject = async (data) => {
    console.log(data);
  };

  const handleAccept = async (data) => {
    const collaborator = { userId: 1, taskId: data.id };
    await collaboratorService.addCollaborator(collaborator);
    setIsLoading(true);
    setRefreshNav(true);
  };

  return (
    <div>
      <SEO title="Invitations" description="Invitations" />
      {renderInvitations()}
    </div>
  );

  function renderInvitations() {
    if (isLoading) {
      return <div>Loading</div>;
    } else {
      return invitations.length <= 0 ? (
        <div> No Invitations</div>
      ) : (
        <div>
          {titleBar()}
          {invitations.map((invitation, index) => (
            <Invitation
              key={index}
              invitation={invitation}
              handleAccept={handleAccept}
              handleReject={handleReject}
            />
          ))}
        </div>
      );
    }
  }
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
