"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@bugtracker/store";
import { useEffect } from 'react';
import config from '@bugtracker/config';

export default function Dashboard() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (!user) {
      router.replace("/auth/login");
    }
  }, [user, router]);

  if (!user) return <div>Redirecting...</div>;


  return (
    <div>
      <h1 className='text-title mb-8'>Dashboard - {user.role === config.roles.manager ? "Manager" : "Developer"}</h1>
      <div>
        <button className='input-button mb-5' onClick={() => router.push("/tasks")}>{'Manage Tasks >'}</button><br/>
        {user.role === config.roles.manager && <button className='input-button' onClick={() => router.push("/timetracker")}>{'View Developer Work Logs >'}</button> }
      </div>
    </div>
  );
}
