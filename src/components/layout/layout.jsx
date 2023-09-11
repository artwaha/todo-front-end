import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Navbar from "./navbar";
export const NavStateContext = createContext();
const taskService = require("../../services/task-service");
const userService = require("../../services/user-service");

function Layout() {
  const [allTasks, setAllTasks] = useState(0);
  const [doneTasks, setDoneTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [invitations, setInvitations] = useState(0);
  const [collaboratingTasks, setCollaboratingTasks] = useState(0);
  const [rejectedTasks, setRejectedTasks] = useState(0);
  const [isLoadingNavBar, setIsLoadingNavBar] = useState(true);

  useEffect(() => {
    fetchDataNavBar();
  }, []);

  const fetchDataNavBar = async () => {
    const userId = userService.getLoggedOnUser();
    setIsLoadingNavBar(true);
    const count = await taskService.countTasks(userId);
    setAllTasks(count.all);
    setDoneTasks(count.done);
    setPendingTasks(count.pending);
    setInvitations(count.invitations);
    setCollaboratingTasks(count.collaborating);
    setRejectedTasks(count.rejected);
    setIsLoadingNavBar(false);
  };

  return (
    <div className="flex flex-col container mx-auto min-h-screen">
      <Navbar
        allTasks={allTasks}
        doneTasks={doneTasks}
        pendingTasks={pendingTasks}
        invitations={invitations}
        rejectedTasks={rejectedTasks}
        collaboratingTasks={collaboratingTasks}
        isLoadingNavBar={isLoadingNavBar}
      />
      <main className="flex-1 p-4 mx-auto w-full max-w-screen-lg">
        <Outlet context={{ fetchDataNavBar }} />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
