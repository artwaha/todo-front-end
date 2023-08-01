import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./layout/error-page";
import Tasks from "./component/tasks";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import TaskDetails from "./component/task-details";
import ViewMode from "./component/view-mode";
import EditMode from "./component/edit-mode";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
  },
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
  <RouterProvider router={router} />
  // <React.StrictMode>
  //     <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log());
