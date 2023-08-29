import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import SEO from "./layout/seo";
import RejectItem from "./reject-item";
import ProgressBar from "./progress-bar";
const taskService = require("../services/task-service");
const collaboratorService = require("../services/collaborator-service");

const Rejected = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [rejectedTasks, setRejectedTasks] = useState([]);

  const { fetchDataNavBar } = useOutletContext();

  const fetchDataRejected = async () => {
    setIsLoading(true);
    setRejectedTasks(await taskService.getRejectedTasks(1));
    // console.log(await taskService.getRejectedTasks(1));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDataRejected();
  }, []);

  const handleAccept = async (data) => {
    const collaborator = { userId: 1, taskId: data.id };
    await collaboratorService.addCollaborator(collaborator);
    // Refresh/reload the component(s)
    fetchDataRejected();
    fetchDataNavBar();
  };

  return (
    <div>
      <SEO description="Rejected" title="Rejected" />
      {renderRejectedTasks()}
    </div>
  );

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

  function renderRejectedTasks() {
    if (isLoading) {
      return (
        <div>
          Loading
          <ProgressBar percent={80} />
        </div>
      );
    } else {
      return rejectedTasks.length <= 0 ? (
        <div>No Rejected Tasks</div>
      ) : (
        <div>
          {titleBar()}
          {rejectedTasks.map((task, index) => (
            <RejectItem key={index} task={task} handleAccept={handleAccept} />
          ))}
        </div>
      );
    }
  }
};

export default Rejected;
