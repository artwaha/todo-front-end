import { Link, useLocation } from "react-router-dom";
import NavItem from "./nav-item";
import { useState } from "react";
import { useEffect } from "react";

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

  return (
    <nav className="p-4 mx-auto w-full max-w-screen-lg flex flex-col">
      <div className="flex items-center justify-center my-2">
        <h2>Sherlock Holmes,</h2>
        <Link className=" ml-2">Logout</Link>
      </div>
      {!isLoadingNavBar && (
        <div className="flex mx-auto">
          <NavItem
            type="All"
            qty={allTasks}
            path="/tasks"
            borderColor="border-black"
            activeTab={activeTab}
          />
          <NavItem
            type="Completed"
            qty={doneTasks}
            path="done"
            borderColor="border-blue-500"
            activeTab={activeTab}
          />
          <NavItem
            type="Pending"
            qty={pendingTasks}
            path="pending"
            borderColor="border-orange-500"
            activeTab={activeTab}
          />
          <NavItem
            type="Invitations"
            qty={invitations}
            path="invitations"
            borderColor="border-purple-500"
            activeTab={activeTab}
          />
          <NavItem
            type="Collaborating"
            qty={collaboratingTasks}
            path="collaborating"
            borderColor="border-green-500"
            activeTab={activeTab}
          />

          <NavItem
            type="Rejected"
            qty={rejectedTasks}
            path="rejected"
            borderColor="border-red-500"
            activeTab={activeTab}
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
