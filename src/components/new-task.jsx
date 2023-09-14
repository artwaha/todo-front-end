import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
const taskService = require("../services/task-service");
const userService = require("../services/user-service");

const NewTask = () => {
  const { fetchDataNavBar } = useOutletContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  function getFormData() {
    // Get Dirty fields
    const dirtyFields = Object.keys(formData).filter(
      (key) => formData[key] !== ""
    );

    // Only save the dirty fields
    const updatedFormData = {};
    dirtyFields.forEach((field) => {
      updatedFormData[field] = formData[field];
    });

    return updatedFormData;
  }

  const handleSave = async () => {
    const updatedFormData = getFormData();
    // console.log(Object.keys(updatedFormData).length);

    if (
      Object.keys(updatedFormData).length !== 3 ||
      updatedFormData.priority === "none"
    ) {
      alert("Please fill all required fields!");
    } else {
      const userId = userService.getLoggedOnUserId();
      const postFormData = {
        ...formData,
        createdBy: {
          id: userId,
        },
      };

      const savedTask = await taskService.saveTask(postFormData);

      if (Object.keys(saveButton).length) {
        fetchDataNavBar();
        navigate(`/tasks/${savedTask.id}`);
      } else {
        navigate("/tasks");
        alert("Unable to save...something went wrong!");
      }
    }
  };

  return (
    <>
      {controlButtons()}
      <form>
        <div className="mt-4">
          <label className="block font-medium text-gray-700">Title</label>
          <input
            name="title"
            onChange={handleChange}
            className="p-1 border border-blue-300 outline-none w-full mt-1 text-sm"
          />
        </div>

        <div className="mt-4">
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            onChange={handleChange}
            className="p-1 border border-blue-300 outline-none w-full mt-1 text-sm"
          />
        </div>

        <div className="mt-4">
          <label className="block font-medium text-gray-700">Priority</label>
          <select
            name="priority"
            onChange={handleChange}
            className="p-1 border border-blue-300 mt-1 text-sm outline-none"
          >
            <option value="none">Select One</option>
            <option value="HIGH">High</option>
            <option value="LOW">Low</option>
          </select>
        </div>
      </form>
    </>
  );

  function controlButtons() {
    return (
      <div className="flex items-center mb-4">
        {backButton()}
        {saveButton()}
      </div>
    );
  }

  function saveButton() {
    return (
      <button
        onClick={handleSave}
        className="text-sm rounded-full border border-black px-2 py-1 ml-auto hover:font-semibold"
      >
        Save
      </button>
    );
  }

  function backButton() {
    return (
      <button
        onClick={() => navigate("/tasks")}
        className="text-sm rounded-full border border-black hover:font-semibold px-2 py-1 flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-4 h-4 mr-2 -ml-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span className="ml-[-5px]">Back</span>
      </button>
    );
  }
};

export default NewTask;
