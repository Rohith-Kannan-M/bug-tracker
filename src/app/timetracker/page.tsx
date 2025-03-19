"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@bugtracker/store";
import config from "@bugtracker/config";
import dynamic from "next/dynamic";
import { EChartsOption } from "echarts";
const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export default function TimeTracker() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const tasks = useSelector((state: RootState) => state.tasks.tasks); // Get tasks from Redux

  useEffect(() => {
    if (!user) {
      router.replace("/auth/login");
    } else if (user.role !== config.roles.manager) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  if (!user) return <div>Redirecting...</div>;

  const chartOptions: EChartsOption = {
    title: { text: "Tasks Trend Over Time" },
    tooltip: {
      trigger: "axis",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: (params: any) => {
        console.log(params);
        const data = tasks[params[0].dataIndex];
        return `
          <b>Task by:</b> ${data.assignee} <br/>
          <b>Total Time Sent(in hours):</b> ${data.timeSpent} hrs
        `;
      },
    },
    xAxis: { type: "category", data: tasks.map((d) => d.title) },
    yAxis: { type: "value" },
    series: [
      {
        name: "Tasks",
        type: "line",
        data: tasks.map((d) => d.timeSpent),
        smooth: true,
        lineStyle: { width: 3 },
        itemStyle: { color: config.theme.primaryColor },
      },
    ],
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>{config.labels.dashboardTitle} - Time Tracker</h1>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ backgroundColor: config.theme.primaryColor, color: "#fff" }}>
            <th style={styles.th}>Assignee</th>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>Priority</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Time Spent (hrs)</th>
            <th style={styles.th}>Created At</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} style={{ borderBottom: "1px solid #ddd", textAlign: "center" }}>
              <td style={styles.td}>{task.assignee}</td>
              <td style={styles.td}>{task.title}</td>
              <td style={styles.td}>{task.priority}</td>
              <td style={styles.td}>{task.status}</td>
              <td style={styles.td}>{task.timeSpent}</td>
              <td style={styles.td}>{formatDate(task.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: "40px" }}>
        <ReactECharts option={chartOptions} style={{ height: 400 }} />
      </div>
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
