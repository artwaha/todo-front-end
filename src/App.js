import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../src/components/layout/footer";
import Navbar from "../src/components/layout/navbar";
export const NavStateContext = createContext();
const taskService = require("./services/task-service");

function App() {
  const [allTasks, setAllTasks] = useState(0);
  const [doneTasks, setDoneTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [invitations, setInvitations] = useState(0);
  const [isLoadingNavBar, setIsLoadingNavBar] = useState(true);

  useEffect(() => {
    fetchDataNavBar();
  }, []);

  const fetchDataNavBar = async () => {
    setIsLoadingNavBar(true);
    const count = await taskService.countTasks();
    setAllTasks(count.all);
    setDoneTasks(count.done);
    setPendingTasks(count.pending);
    setInvitations(count.invitations);
    setIsLoadingNavBar(false);
  };

  return (
    <div className="flex flex-col container mx-auto min-h-screen over ">
      <Navbar
        allTasks={allTasks}
        doneTasks={doneTasks}
        pendingTasks={pendingTasks}
        invitations={invitations}
        isLoadingNavBar={isLoadingNavBar}
      />
      <main className="flex-1 p-4 mx-auto w-full max-w-screen-lg">
        <Outlet context={{ fetchDataNavBar }} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
