'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@bugtracker/store';
import {
  addTask,
  deleteTask,
  updateTaskStatus,
  Task,
} from '@bugtracker/store/slices/taskSlice';
import config from '@bugtracker/config';

export default function TasksPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'Low',
  });

  useEffect(() => {
    if (!user) {
      router.replace('/auth/login');
    }
  }, [user, router]);

  const handleCreateTask = () => {
    if (!newTask.title) return;
    const task: Task = {
      id: Date.now(),
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority as Task['priority'],
      status: 'Open',
      assignee: user?.role === config.roles.developer ? user.email : 'Unassigned',
      createdAt: new Date().toISOString(),
      timeSpent: Math.floor(Math.random() * 11),
    };
    dispatch(addTask(task));
    setNewTask({ title: '', description: '', priority: 'Low' });
  };

  const handleDeleteTask = (id: number) => {
    dispatch(deleteTask(id));
  };

  const handleCloseTask = (id: number) => {
    dispatch(updateTaskStatus({ id, status: 'Pending Approval' }));
  };

  const handleApproveTask = (id: number) => {
    dispatch(updateTaskStatus({ id, status: 'Closed' }));
  };

  const handleReOpenTask = (id: number) => {
    dispatch(updateTaskStatus({ id, status: 'Open' }));
  };

  return (
    <div>
      <h1 className='text-title mb-4'>Manage tasks</h1>

      {user?.role === 'developer' && (
        <div className='mb-4'>
          <div>
            <h2 className='text-sub-title mb-2'>Create New Task</h2>
          </div>
          <div className='flex items-center'>
            <input
              type='text'
              placeholder='Title'
              value={newTask.title}
              className='input-text-box mr-5'
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
            />
            <textarea
              placeholder='Description'
              value={newTask.description}
              className='input-text-area mr-5'
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            />
            <select
              value={newTask.priority}
              className='input-select-box mr-5'
              onChange={(e) =>
                setNewTask({ ...newTask, priority: e.target.value })
              }
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <button className='input-button' onClick={handleCreateTask}>
              Create Task
            </button>
          </div>
        </div>
      )}

      <div>
        <h2 className='text-sub-title mb-2'>Task List</h2>

        <div className='flex mb-2'>
          <div className='mr-8'>
            <h2 className='text-sub-title'>Open</h2>
            {tasks.map((task) => (
              <>
                {task.status === 'Open' && (
                  <div
                    key={task.id}
                    style={{
                      border: '1px solid #ddd',
                      padding: '10px',
                      margin: '5px 0',
                      borderRadius: '5px',
                      width: '300px',
                    }}
                  >
                    <div className='flex items-center'>
                      <div className='mr-2'>{task.title}</div>
                      <div
                        className={
                          'priority-pill-' + task.priority.toLowerCase()
                        }
                      >
                        {task.priority}
                      </div>
                    </div>
                    <p>{task.description}</p>
                    <p>Assigned To: {task.assignee}</p>
                    <div className='flex items-center py-3'>
                      {user?.role === 'developer' && task.status === 'Open' && (
                        <button
                          className='input-button-action mr-2'
                          onClick={() => handleCloseTask(task.id)}
                        >
                          Close Task
                        </button>
                      )}
                      {user?.role === 'developer' && (
                        <button
                          className='input-button-action'
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          Delete Task
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </>
            ))}
          </div>
          <div className='mr-8'>
            <h2 className='text-sub-title'>Pending Approval</h2>
            {tasks.map((task) => (
              <>
                {task.status === 'Pending Approval' && (
                  <div
                    key={task.id}
                    style={{
                      border: '1px solid #ddd',
                      padding: '10px',
                      margin: '5px 0',
                      borderRadius: '5px',
                      width: '300px',
                    }}
                  >
                    <div className='flex items-center'>
                      <div className='mr-2'>{task.title}</div>
                      <div
                        className={
                          'priority-pill-' + task.priority.toLowerCase()
                        }
                      >
                        {task.priority}
                      </div>
                    </div>
                    <p>{task.description}</p>
                    <p>Assigned To: {task.assignee}</p>

                    <div className='flex items-center py-3'>
                      {user?.role === 'manager' &&
                        task.status === 'Pending Approval' && (
                          <button
                            className='input-button-action mr-2'
                            onClick={() => handleApproveTask(task.id)}
                          >
                            Approve Closure
                          </button>
                        )}

                      {user?.role === 'manager' && (
                        <button
                          className='input-button-action'
                          onClick={() => handleReOpenTask(task.id)}
                        >
                          Open
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </>
            ))}
          </div>
          <div className='mr-8'>
            <h2 className='text-sub-title'>Closed</h2>
            {tasks.map((task) => (
              <>
                {task.status === 'Closed' && (
                  <div
                    key={task.id}
                    style={{
                      border: '1px solid #ddd',
                      padding: '10px',
                      margin: '5px 0',
                      borderRadius: '5px',
                      width: '300px',
                    }}
                  >
                    <div className='flex items-center'>
                      <div className='mr-2'>{task.title}</div>
                      <div
                        className={
                          'priority-pill-' + task.priority.toLowerCase()
                        }
                      >
                        {task.priority}
                      </div>
                    </div>
                    <p>{task.description}</p>
                    <p>Assigned To: {task.assignee}</p>

                    <div className='flex items-center py-3'>
                      {user?.role === 'manager' && (
                        <button
                          className='input-button-action'
                          onClick={() => handleReOpenTask(task.id)}
                        >
                          Open
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </>
            ))}
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
