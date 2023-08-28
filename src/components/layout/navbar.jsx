import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({
  allTasks,
  doneTasks,
  pendingTasks,
  invitations,
  collaboratingTasks,
  rejectedTasks,
  isLoadingNavBar,
}) => {
  const [activeTab, setActiveTab] = useState("");

  let location = useLocation();

  useEffect(() => {
    const temp = location.pathname.substring(7);
    switch (temp) {
      case "":
        setActiveTab("All");
        break;
      case "done":
        setActiveTab("Completed");
        break;
      case "pending":
        setActiveTab("Pending");
        break;
      case "invitations":
        setActiveTab("Invitations");
        break;
      case "collaborating":
        setActiveTab("Collaborating");
        break;
      case "rejected":
        setActiveTab("Rejected");
        break;
      default:
        break;
    }

    return () => {
      setActiveTab("");
    };
  }, [location]);

  const updateActiveTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <nav className="p-4 mx-auto ">
      {!isLoadingNavBar && (
        <div className="flex">
          <Link
            to="/tasks"
            onClick={() => updateActiveTab("All")}
            className={`border px-4 py-2 text-sm ${
              activeTab === "All" ? "bg-black text-white" : ""
            } flex justify-center items-center`}
          >
            <small>All ({allTasks})</small>
          </Link>
          <Link
            to="done"
            onClick={() => updateActiveTab("Completed")}
            className={`border px-4 py-2 text-sm ${
              activeTab === "Completed" ? "bg-black text-white" : ""
            } flex justify-center items-center`}
          >
            <small>Completed ({doneTasks})</small>
          </Link>
          <Link
            to="pending"
            onClick={() => updateActiveTab("Pending")}
            className={`border px-4 py-2 text-sm ${
              activeTab === "Pending" ? "bg-black text-white" : ""
            } flex justify-center items-center`}
          >
            <small>Pending ({pendingTasks})</small>
          </Link>
          <Link
            to="collaborating"
            onClick={() => updateActiveTab("Collaborating")}
            className={`border px-4 py-2 text-sm ${
              activeTab === "Collaborating" ? "bg-black text-white" : ""
            } flex justify-center items-center`}
          >
            <small>Collaborating ({collaboratingTasks})</small>
          </Link>
          <Link
            to="invitations"
            onClick={() => updateActiveTab("Invitations")}
            className={`border px-4 py-2 text-sm ${
              activeTab === "Invitations" ? "bg-black text-white" : ""
            } flex justify-center items-center`}
          >
            <small>Invitations ({invitations})</small>
          </Link>
          <Link
            to="rejected"
            onClick={() => updateActiveTab("Rejected")}
            className={`border px-4 py-2 text-sm ${
              activeTab === "Rejected" ? "bg-black text-white" : ""
            } flex justify-center items-center`}
          >
            <small>Rejected ({rejectedTasks})</small>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
