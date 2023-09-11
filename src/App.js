import React from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Collaborating from "./components/collaborating";
import EditMode from "./components/edit-mode";
import Invitations from "./components/invitations";
import ErrorPage from "./components/layout/error-page";
import Layout from "./components/layout/layout";
import Login from "./components/login";
import Register from "./components/register";
import Rejected from "./components/rejected";
import TaskDetails from "./components/task-details";
import Tasks from "./components/tasks";
import ViewMode from "./components/view-mode";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="login" />,
      errorElement: <ErrorPage />,
    },
    { path: "/login", element: <Login /> },
    { path: "register", element: <Register /> },
    {
      path: "tasks",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Tasks location="All" />,
        },
        {
          path: "done",
          element: <Tasks location="Done" />,
        },
        {
          path: "pending",
          element: <Tasks location="Pending" />,
        },
        {
          path: "invitations",
          element: <Invitations />,
        },
        {
          path: "collaborating",
          element: <Collaborating />,
        },
        {
          path: "rejected",
          element: <Rejected />,
        },
        {
          path: "/tasks/:taskId",
          element: <TaskDetails />,
          children: [
            {
              index: true,
              element: <ViewMode />,
            },
            {
              path: "edit",
              element: <EditMode />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
