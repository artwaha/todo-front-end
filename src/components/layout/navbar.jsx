import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({
  allTasks,
  doneTasks,
  pendingTasks,
  invitations,
  isLoadingNavBar,
}) => {
  const [activeTab, setActiveTab] = useState("");

  let location = useLocation();

  useEffect(() => {
    const temp = location.pathname.substring(7);
    switch (temp) {
      case "":
        setActiveTab("All");
        localStorage.setItem("active", "All");
        break;
      case "done":
        setActiveTab("Completed");
        localStorage.setItem("active", "Completed");
        break;
      case "pending":
        setActiveTab("Pending");
        localStorage.setItem("active", "Pending");
        break;
      case "invitations":
        setActiveTab("Invitations");
        localStorage.setItem("active", "Invitations");
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
    <nav className="p-4 mx-auto">
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
            to="invitations"
            onClick={() => updateActiveTab("Invitations")}
            className={`border px-4 py-2 text-sm ${
              activeTab === "Invitations" ? "bg-black text-white" : ""
            } flex justify-center items-center`}
          >
            <small>Invitations ({invitations})</small>
          </Link>
          <Link
            onClick={() => updateActiveTab("Collaborating")}
            className={`border px-4 py-2 text-sm ${
              activeTab === "Collaborating" ? "bg-black text-white" : ""
            } flex justify-center items-center`}
          >
            <small>Collaborating (2)</small>
          </Link>
          <Link
            onClick={() => updateActiveTab("Rejected")}
            className={`border px-4 py-2 text-sm ${
              activeTab === "Rejected" ? "bg-black text-white" : ""
            } flex justify-center items-center`}
          >
            <small>Rejected (3)</small>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
