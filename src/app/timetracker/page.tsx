"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@bugtracker/store";
import config from "@bugtracker/config";

interface WorkLog {
  id: number;
  developer: string;
  task: string;
  timeSpent: number;
  date: string;
}

const mockWorkLogs: WorkLog[] = [
  { id: 1, developer: "Alice", task: "Fix login bug", timeSpent: 2.5, date: "2025-03-18" },
  { id: 2, developer: "Bob", task: "UI improvements", timeSpent: 3, date: "2025-03-18" },
  { id: 3, developer: "Alice", task: "Refactor API", timeSpent: 1.5, date: "2025-03-17" },
  { id: 4, developer: "Charlie", task: "Database optimization", timeSpent: 4, date: "2025-03-16" },
];

export default function TimeTracker() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const [workLogs, setWorkLogs] = useState<WorkLog[]>([]);

  useEffect(() => {
    if (!user) {
      router.replace("/auth/login");
    } else if (user.role !== config.roles.manager) {
      router.replace("/dashboard");
    } else {
      setWorkLogs(mockWorkLogs);
    }
  }, [user, router]);

  if (!user) return <div>Redirecting...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{config.labels.dashboardTitle} - Time Tracker</h1>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ backgroundColor: config.theme.primaryColor, color: "#fff" }}>
            <th style={styles.th}>Developer</th>
            <th style={styles.th}>Task</th>
            <th style={styles.th}>Time Spent (hrs)</th>
            <th style={styles.th}>Date</th>
          </tr>
        </thead>
        <tbody>
          {workLogs.map((log) => (
            <tr key={log.id} style={{ borderBottom: "1px solid #ddd", textAlign: "center" }}>
              <td style={styles.td}>{log.developer}</td>
              <td style={styles.td}>{log.task}</td>
              <td style={styles.td}>{log.timeSpent}</td>
              <td style={styles.td}>{log.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  th: {
    padding: "10px",
    textAlign: "center" as const,
  },
  td: {
    padding: "10px",
  },
};
