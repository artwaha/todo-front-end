import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({
  allTasks,
  doneTasks,
  pendingTasks,
  invitations,
  isLoadingNavBar,
}) => {
  const [activeTab, setActiveTab] = useState("All");

  const updateActiveTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <nav className="p-4 mx-auto">
      {!isLoadingNavBar && (
        <div className="flex">
          <Link
            onClick={() => updateActiveTab("All")}
            className={`border px-4 py-2 text-sm ${
              activeTab === "All" ? "bg-black text-white" : ""
            } flex justify-center items-center`}
          >
            All ({allTasks})
          </Link>
          <Link
            onClick={() => updateActiveTab("Completed")}
            className={`border px-4 py-2 text-sm ${
              activeTab === "Completed" ? "bg-black text-white" : ""
            } flex justify-center items-center`}
          >
            Completed ({doneTasks})
          </Link>
          <Link
            onClick={() => updateActiveTab("Pending")}
            className={`border px-4 py-2 text-sm ${
              activeTab === "Pending" ? "bg-black text-white" : ""
            } flex justify-center items-center`}
          >
            Pending ({pendingTasks})
          </Link>

          <Link
            onClick={() => updateActiveTab("Invitations")}
            className={`border px-4 py-2 text-sm ${
              activeTab === "Invitations" ? "bg-black text-white" : ""
            } flex justify-center items-center`}
          >
            Invitations ({invitations})
          </Link>
          <Link
            onClick={() => updateActiveTab("Collaborating")}
            className={`border px-4 py-2 text-sm ${
              activeTab === "Collaborating" ? "bg-black text-white" : ""
            } flex justify-center items-center`}
          >
            Collaborating (2)
          </Link>
          <Link
            onClick={() => updateActiveTab("Rejected")}
            className={`border px-4 py-2 text-sm ${
              activeTab === "Rejected" ? "bg-black text-white" : ""
            } flex justify-center items-center`}
          >
            Rejected (3)
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
