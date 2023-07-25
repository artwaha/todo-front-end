const taskCollaborators = (userId, taskId) => {
  return collaborators.filter(
    (collaborator) =>
      userId !== collaborator.user.id || taskId !== collaborator.task.id
  );
};

module.exports = { taskCollaborators };

const collaborators = [
  {
    id: 1,
    user: {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      password: "password456",
    },
    task: {
      id: 1,
      title: "Complete Project Proposal",
      description: "Write a comprehensive project proposal for the new client.",
      priority: "HIGH",
      isCompleted: false,
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
    invitationStatus: "PENDING",
  },
  // Collaborator 1 (Already provided above)

  // Collaborator 2
  {
    id: 2,
    user: {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      password: "password789",
    },
    task: {
      id: 2,
      title: "Implement User Authentication",
      description: "Implement user authentication and login functionality.",
      priority: "MEDIUM",
      isCompleted: false,
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
    invitationStatus: "ACCEPTED",
  },

  // Collaborator 3
  {
    id: 3,
    user: {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    },
    task: {
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
    invitationStatus: "PENDING",
  },
  // Collaborator 4 (Sample data for brevity; use similar structure for other collaborators)
  {
    id: 4,
    user: {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      password: "password456",
    },
    task: {
      id: 5,
      title: "Write API Documentation",
      description: "Prepare comprehensive API documentation for the backend.",
      priority: "LOW",
      isCompleted: false,
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
    invitationStatus: "PENDING",
  },

  // Collaborator 5
  {
    id: 5,
    user: {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      password: "password789",
    },
    task: {
      id: 7,
      title: "Fix Bugs",
      description: "Address and fix bugs reported during testing.",
      priority: "HIGH",
      isCompleted: false,
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
    invitationStatus: "ACCEPTED",
  },

  // Collaborator 6
  {
    id: 6,
    user: {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    },
    task: {
      id: 8,
      title: "Deploy Application",
      description:
        "Prepare the application for deployment to production servers.",
      priority: "MEDIUM",
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
    invitationStatus: "ACCEPTED",
  },
];
