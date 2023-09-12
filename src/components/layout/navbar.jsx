import { useLocation, useNavigate } from "react-router-dom";
import NavItem from "./nav-item";
import { useState } from "react";
import { useEffect } from "react";
import { useAuthContext } from "../../contexts/user-contex";
const userService = require("../../services/user-service");

const Navbar = ({
  allTasks,
  doneTasks,
  pendingTasks,
  invitations,
  collaboratingTasks,
  rejectedTasks,
  isLoadingNavBar,
  username,
}) => {
  const [activeTab, setActiveTab] = useState("");
  const navigate = useNavigate();
  let location = useLocation();

  const { updateAuthenticatedUser } = useAuthContext();

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

  const handleLogout = () => {
    // delete items from local storage
    userService.logout();
    updateAuthenticatedUser(false);
    navigate("/");
  };

  return (
    <nav className="p-4 mx-auto w-full max-w-screen-lg flex flex-col">
      <div className="flex items-center justify-between my-2 p-2 text-sm ">
        {username && (
          <h2 className="font-mono">
            Welcome, <span className="font-extrabold">{username}</span>
          </h2>
        )}
        {username && (
          <button
            onClick={handleLogout}
            className="underline text-red-700 font-semibold font-mono hover:font-bold"
          >
            Logout
          </button>
        )}
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
