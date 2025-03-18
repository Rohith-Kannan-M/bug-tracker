const config = {
  appName: "Bug Tracker",
  appDescription: "A simple bug/task tracker app",
  theme: {
    primaryColor: "#007bff",
    secondaryColor: "#6c757d",
    backgroundColor: "#f8f9fa",
    textColor: "#212529",
  },
  labels: {
    loginTitle: "Login to Your Account",
    emailPlaceholder: "Enter your email",
    passwordPlaceholder: "Enter your password",
    loginButton: "Login",
    logoutButton: "Logout",
    dashboardTitle: "Dashboard",
    createTask: "Create Task",
    editTask: "Edit Task",
    deleteTask: "Delete Task",
    taskListTitle: "Task List",
  },
  taskStatus: ["Open", "Pending Approval", "Closed"],
  taskPriority: ["Low", "Medium", "High"],
  roles: {
    developer: "developer",
    manager: "manager",
  },
};
  
export default config;  