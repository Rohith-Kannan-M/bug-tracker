export const authenticateUser = (email: string, password: string) => {
  const envUsers = JSON.parse(JSON.stringify(process.env.USERS || []));
  const mockUsers = JSON.parse(envUsers) as { email: string, password: string, role: "developer" | "manager" }[];
  return mockUsers.find(user => user.email === email && user.password === password) || {email: '', password: '', role: "developer" };
};
