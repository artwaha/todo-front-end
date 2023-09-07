import React, { useEffect, useState } from "react";
import SEO from "./layout/seo";
import Invitation from "./invitation";
import { useOutletContext } from "react-router-dom";
import SearchBar from "./search-bar";
const taskService = require("../services/task-service");
const collaboratorService = require("../services/collaborator-service");
const userService = require("../services/user-service");

const Invitations = () => {
  const [invitations, setInvitations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const { fetchDataNavBar } = useOutletContext();

  useEffect(() => {
    fetchDataInvitations();
  }, []);

  async function fetchDataInvitations() {
    const userId = userService.getLoggedOnUser();
    setIsLoading(true);
    setInvitations(await taskService.getInvitations(userId));
    setIsLoading(false);
  }

  const filteredTasks = invitations.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      {invitations.length !== 0 && (
        <SearchBar
          searchQuery={searchQuery}
          updateSearchQuery={setSearchQuery}
        />
      )}
      {renderInvitations()}
    </div>
  );

  function renderInvitations() {
    if (isLoading) {
      return <div>Loading</div>;
    } else {
      return filteredTasks.length <= 0 ? (
        <div> No Invitations</div>
      ) : (
        <div>
          {titleBar()}
          {filteredTasks.map((invitation, index) => (
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
