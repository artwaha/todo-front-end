const allTasks = () => {
  return tasks.sort((task1, task2) => {
    if (task1.priority === "HIGH" && task2.priority === "LOW") {
      return -1;
    } else if (task1.priority === "LOW" && task2.priority === "HIGH") {
      return 1;
    } else {
      return 0;
    }
  });
};

const doneTasks = () => {
  return tasks
    .filter((task) => task.isCompleted)
    .sort((task1, task2) => {
      if (task1.priority === "HIGH" && task2.priority === "LOW") {
        return -1;
      } else if (task1.priority === "LOW" && task2.priority === "HIGH") {
        return 1;
      } else {
        return 0;
      }
    });
};

const task = (id) => {
  return tasks.find((t) => t.id === id);
};

const pendingTasks = () => {
  return tasks
    .filter((task) => !task.isCompleted)
    .sort((task1, task2) => {
      if (task1.priority === "HIGH" && task2.priority === "LOW") {
        return -1;
      } else if (task1.priority === "LOW" && task2.priority === "HIGH") {
        return 1;
      } else {
        return 0;
      }
    });
};

const countTasks = () => {
  const all = allTasks().length;
  const done = doneTasks().length;
  const pending = pendingTasks().length;
  return { all, done, pending };
};

module.exports = {
  task,
  allTasks,
  doneTasks,
  pendingTasks,
  countTasks,
};

let tasks = [
  // Task 1
  {
    title: "Complete Project Proposal",
    description: "Write a comprehensive project proposal for the new client.",
    priority: "HIGH",
    completed: true,
    createdAt: "2023-07-21T10:00:00",
    createdBy: {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    },
    lastUpdated: "2023-07-21T15:30:00",
    updatedBy: {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      password: "password456",
    },
  },

  // Task 2
  {
    id: 2,
    title: "Implement User Authentication",
    description: "Implement user authentication and login functionality.",
    priority: "HIGH",
    isCompleted: true,
    createdAt: "2023-07-21T11:00:00",
    createdBy: {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      password: "password789",
    },
    lastUpdated: "2023-07-21T16:45:00",
    updatedBy: {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    },
  },

  // Task 3
  {
    id: 3,
    title: "Design Database Schema",
    description: "Create a database schema for the application.",
    priority: "HIGH",
    isCompleted: false,
    createdAt: "2023-07-21T12:30:00",
    createdBy: {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      password: "password456",
    },
    lastUpdated: "2023-07-21T14:15:00",
    updatedBy: {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      password: "password789",
    },
  },

  // Task 4
  {
    id: 4,
    title: "Implement Frontend",
    description: "Develop the frontend of the application using React.",
    priority: "HIGH",
    isCompleted: true,
    createdAt: "2023-07-21T09:45:00",
    createdBy: {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    },
    lastUpdated: "2023-07-21T13:20:00",
    updatedBy: {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      password: "password456",
    },
  },

  // Task 5
  {
    id: 5,
    title: "Write API Documentation",
    description: "Prepare comprehensive API documentation for the backend.",
    priority: "LOW",
    isCompleted: true,
    createdAt: "2023-07-21T17:00:00",
    createdBy: {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      password: "password789",
    },
    lastUpdated: "2023-07-21T19:30:00",
    updatedBy: {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    },
  },
  // Task 6
  {
    id: 6,
    title: "Test Application",
    description: "Perform thorough testing of the application.",
    priority: "LOW",
    isCompleted: false,
    createdAt: "2023-07-21T14:00:00",
    createdBy: {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      password: "password456",
    },
    lastUpdated: "2023-07-21T17:15:00",
    updatedBy: {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      password: "password789",
    },
  },

  // Task 7
  {
    id: 7,
    title: "Fix Bugs",
    description: "Address and fix bugs reported during testing.",
    priority: "HIGH",
    isCompleted: true,
    createdAt: "2023-07-21T16:30:00",
    createdBy: {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    },
    lastUpdated: "2023-07-21T18:00:00",
    updatedBy: {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      password: "password456",
    },
  },

  // Task 8
  {
    id: 8,
    title: "Deploy Application",
    description:
      "Prepare the application for deployment to production servers.",
    priority: "LOW",
    isCompleted: false,
    createdAt: "2023-07-21T13:00:00",
    createdBy: {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      password: "password789",
    },
    lastUpdated: "2023-07-21T16:30:00",
    updatedBy: {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    },
  },

  // Task 9
  {
    id: 9,
    title: "Monitor Server Performance",
    description: "Set up monitoring tools to track server performance.",
    priority: "LOW",
    isCompleted: true,
    createdAt: "2023-07-21T11:30:00",
    createdBy: {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      password: "password456",
    },
    lastUpdated: "2023-07-21T15:45:00",
    updatedBy: {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      password: "password789",
    },
  },

  // Task 10
  {
    id: 10,
    title: "Prepare Release Notes",
    description: "Compile release notes for the upcoming software release.",
    priority: "LOW",
    isCompleted: false,
    createdAt: "2023-07-21T15:00:00",
    createdBy: {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    },
    lastUpdated: "2023-07-21T17:45:00",
    updatedBy: {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      password: "password456",
    },
  },
];

// tasks = []
