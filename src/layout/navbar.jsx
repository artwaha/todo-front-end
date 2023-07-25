import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const taskService = require("../service/task-service");

const Navbar = () => {
  const [allTasks, setAllTasks] = useState(0);
  const [doneTasks, setDoneTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const count = await taskService.countTasks();
        setAllTasks(count.all);
        setDoneTasks(count.done);
        setPendingTasks(count.pending);
      } catch (error) {
        console.error({ layer: "VIEW", error });
      }
    }
    fetchData();
  }, []);

  return (
    <nav className="p-4 border-b text-xs">
      <ul className="flex justify-around p-0">
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
      </ul>
    </nav>
  );
};

export default Navbar;
