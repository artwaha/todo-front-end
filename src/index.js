import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Collaborating from "./components/collaborating";
import EditMode from "./components/edit-mode";
import Invitations from "./components/invitations";
import ErrorPage from "./components/layout/error-page";
import Login from "./components/login";
import Register from "./components/register";
import Rejected from "./components/rejected";
import TaskDetails from "./components/task-details";
import Tasks from "./components/tasks";
import ViewMode from "./components/view-mode";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
const userService = require("./services/user-service");
const userId = userService.getLoggedOnUser();
console.log("Logged On User: ", userId);

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  { path: "/", element: <Login />, errorElement: <ErrorPage /> },
  { path: "register", element: <Register /> },
  {
    path: "tasks",
    element: <App />,
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
root.render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log());
