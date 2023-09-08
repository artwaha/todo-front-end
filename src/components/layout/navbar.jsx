import { useLocation } from "react-router-dom";
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

  const updateActiveTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <nav className="p-4 mx-auto">
      {!isLoadingNavBar && (
        <div className="flex">
          <NavItem
            color="black"
            type="All"
            qty={allTasks}
            path="/tasks"
            activeTab={activeTab}
            onClick={() => updateActiveTab("All")}
          />
          <NavItem
            color="blue"
            colorValue={500}
            type="Completed"
            qty={doneTasks}
            path="done"
            activeTab={activeTab}
            onClick={() => updateActiveTab("Completed")}
          />
          <NavItem
            color="orange"
            colorValue={500}
            type="Pending"
            qty={pendingTasks}
            path="pending"
            activeTab={activeTab}
            onClick={() => updateActiveTab("Pending")}
          />
          <NavItem
            color="purple"
            colorValue={500}
            type="Invitations"
            qty={invitations}
            path="invitations"
            activeTab={activeTab}
            onClick={() => updateActiveTab("Invitations")}
          />
          <NavItem
            color="green"
            colorValue={500}
            type="Collaborating"
            qty={collaboratingTasks}
            path="collaborating"
            activeTab={activeTab}
            onClick={() => updateActiveTab("Collaborating")}
          />

          <NavItem
            color="red"
            colorValue={500}
            type="Rejected"
            qty={rejectedTasks}
            path="rejected"
            activeTab={activeTab}
            onClick={() => updateActiveTab("Rejected")}
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
