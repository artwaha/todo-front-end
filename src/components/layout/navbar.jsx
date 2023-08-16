import { Link } from "react-router-dom";

const Navbar = ({
  allTasks,
  doneTasks,
  pendingTasks,
  invitations,
  isLoadingNavBar,
}) => {
  return (
    <nav className="p-4">
      {!isLoadingNavBar && (
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
      )}
    </nav>
  );
};

export default Navbar;
