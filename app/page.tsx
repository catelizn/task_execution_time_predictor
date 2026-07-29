'use client'

import { useState, useEffect } from 'react'

type Project = {
  id: string
  name: string
  description: string | null
  createdAt: string
}

type Task = {
  id: string
  title: string
  description: string | null
  status: string
  deadline: string | null
  assignee: string | null
  projectId: string
  project: Project
  createdAt: string
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const year = date.getFullYear()
  return `${month}/${day}/${year}`
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [projectName, setProjectName] = useState('')
  const [projectDesc, setProjectDesc] = useState('')
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDesc, setTaskDesc] = useState('')
  const [taskProjectId, setTaskProjectId] = useState('')
  const [taskDeadline, setTaskDeadline] = useState('')
  const [taskAssignee, setTaskAssignee] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchProjects = async () => {
    const res = await fetch('/api/projects')
    const data = await res.json()
    setProjects(data)
  }

  const fetchTasks = async () => {
    const res = await fetch('/api/tasks')
    const data = await res.json()
    setTasks(data)
  }

  useEffect(() => {
    fetchProjects()
    fetchTasks()
  }, [])

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: projectName, description: projectDesc }),
    })
    setProjectName('')
    setProjectDesc('')
    await fetchProjects()
    setLoading(false)
  }

  const handleTaskSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: taskTitle,
        description: taskDesc,
        projectId: taskProjectId,
        deadline: taskDeadline || null,
        assignee: taskAssignee || null,
      }),
    })
    setTaskTitle('')
    setTaskDesc('')
    setTaskProjectId('')
    setTaskDeadline('')
    setTaskAssignee('')
    await fetchTasks()
    setLoading(false)
  }

  const deleteTask = async (id: string) => {
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' })
    await fetchTasks()
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Project & Task Management</h1>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-3">New Project</h2>
          <form onSubmit={handleProjectSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
            />
            <textarea
              placeholder="Description"
              value={projectDesc}
              onChange={(e) => setProjectDesc(e.target.value)}
              className="w-full border rounded px-3 py-2"
              rows={2}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Project'}
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">New Task</h2>
          <form onSubmit={handleTaskSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Task title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
            />
            <textarea
              placeholder="Description"
              value={taskDesc}
              onChange={(e) => setTaskDesc(e.target.value)}
              className="w-full border rounded px-3 py-2"
              rows={2}
            />
            <select
              value={taskProjectId}
              onChange={(e) => setTaskProjectId(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select project</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <input
              type="date"
              value={taskDeadline}
              onChange={(e) => setTaskDeadline(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="Assignee"
              value={taskAssignee}
              onChange={(e) => setTaskAssignee(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Task'}
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Tasks</h2>
        <ul className="space-y-2">
          {tasks.map((t) => (
            <li key={t.id} className="border rounded p-3 flex justify-between items-start">
              <div>
                <div className="flex justify-between">
                  <h3 className="font-semibold">{t.title}</h3>
                  <span className="text-sm text-gray-500 ml-4">Project: {t.project.name}</span>
                </div>
                {t.description && <p className="text-gray-600">{t.description}</p>}
                {t.assignee && <p className="text-sm">Assignee: {t.assignee}</p>}
                {t.deadline && <p className="text-sm">Deadline: {formatDate(t.deadline)}</p>}
                <span className="text-xs text-gray-400">Created: {formatDate(t.createdAt)}</span>
              </div>
              <button
                onClick={() => deleteTask(t.id)}
                className="text-red-600 text-sm hover:underline ml-4 mt-1"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}