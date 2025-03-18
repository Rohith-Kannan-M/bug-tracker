import { NextResponse } from "next/server";

type Task = {
    id: number;
    title: string;
    description: string;
    priority: "Low" | "Medium" | "High";
    status: "Open" | "Pending Approval" | "Closed";
    assignee: string;
    createdAt: string;
    timeSpent: number;
  };

  let tasks: Task[] = [];

export async function GET() {
  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  const newTask = await req.json();
  tasks.push(newTask);
  return NextResponse.json(newTask);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  tasks = tasks.filter(task => task.id !== id);
  return NextResponse.json({ message: "Task deleted" });
}
