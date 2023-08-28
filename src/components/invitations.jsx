import React, { useEffect, useState } from "react";
import SEO from "./layout/seo";
import Invitation from "./invitation";
import { useOutletContext } from "react-router-dom";
const taskService = require("../services/task-service");
const collaboratorService = require("../services/collaborator-service");

const Invitations = () => {
  const [invitations, setInvitations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { fetchDataNavBar } = useOutletContext();

  useEffect(() => {
    // console.log("Loading Invitations Component");
    fetchDataInvitations();
  }, []);

  async function fetchDataInvitations() {
    setIsLoading(true);
    setInvitations(await taskService.getInvitations(1));
    setIsLoading(false);
  }

  const handleReject = async (data) => {
    const collaborator = { userId: 1, taskId: data.id };
    // API accespts an array
    await collaboratorService.removeCollaborator([collaborator]);
    // Refresh/reload the component(s)
    fetchDataInvitations();
    fetchDataNavBar();
  };

  const handleAccept = async (data) => {
    const collaborator = { userId: 1, taskId: data.id };
    await collaboratorService.addCollaborator(collaborator);
    // Refresh/reload the component(s)
    fetchDataInvitations();
    fetchDataNavBar();
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
