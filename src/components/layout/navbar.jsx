import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavStateContext } from "../../App";
const taskService = require("../../services/task-service");

const Navbar = () => {
  const { setRefreshNav } = useContext(NavStateContext);
  const [allTasks, setAllTasks] = useState(0);
  const [doneTasks, setDoneTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [invitations, setInvitations] = useState(0);
  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Render Navigation");
        const count = await taskService.countTasks();
        setAllTasks(count.all);
        setDoneTasks(count.done);
        setPendingTasks(count.pending);
        setInvitations(count.invitations);
        setRefreshNav(false);
      } catch (error) {
        console.error({ layer: "VIEW", error });
      }
    }
    fetchData();
  }, [setRefreshNav]);

  return (
    <nav className="p-4">
      {/* {!refreshNav && ( */}
      <ul className="flex justify-around text-xs">
        <li>
          <Link
            to="/tasks"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold shadow-md transition duration-300 ease-in-out"
          >
            All ({allTasks})
          </Link>
        </li>
        <li>
          <Link
            to="done"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold shadow-md transition duration-300 ease-in-out"
          >
            Completed ({doneTasks})
          </Link>
        </li>
        <li>
          <Link
            to="pending"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold shadow-md transition duration-300 ease-in-out"
          >
            Pending({pendingTasks})
          </Link>
        </li>
        <li>
          <Link
            to="invitations"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold shadow-md transition duration-300 ease-in-out"
          >
            Invitations({invitations})
          </Link>
        </li>
      </ul>
      {/* )} */}
    </nav>
  );
};

export default Navbar;
