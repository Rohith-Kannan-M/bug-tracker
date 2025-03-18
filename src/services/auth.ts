export const mockUsers: {email: string, password: string, role: "developer" | "manager"}[]  = [
  { email: "user1", password: "1", role: "developer" },
  { email: "user2", password: "2", role: "manager" }
];

export const authenticateUser = (email: string, password: string) => {
  return mockUsers.find(user => user.email === email && user.password === password) || {email: '', password: '', role: "developer" };
};
