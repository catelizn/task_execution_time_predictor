'use client'

import { useState, useEffect } from 'react'
import { useSocket } from '@/lib/useSocket'

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
  const socket = useSocket()
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
  const [predicting, setPredicting] = useState(false)
  const [predictedTime, setPredictedTime] = useState<number | null>(null)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    fetch('/api/session', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user)
        } else {
          window.location.href = '/login'
        }
      })
      .catch(() => {
        window.location.href = '/login'
      })
  }, [])

  const fetchProjects = async () => {
    const res = await fetch('/api/projects', { credentials: 'include' })
    const data = await res.json()
    setProjects(data)
  }

  const fetchTasks = async () => {
    const res = await fetch('/api/tasks', { credentials: 'include' })
    const data = await res.json()
    setTasks(data)
  }

  useEffect(() => {
    if (user) {
      fetchProjects()
      fetchTasks()
    }
  }, [user])

  useEffect(() => {
    if (!socket) return

    socket.on('task-created', () => {
      fetchTasks()
    })

    socket.on('task-deleted', () => {
      fetchTasks()
    })

    return () => {
      socket.off('task-created')
      socket.off('task-deleted')
    }
  }, [socket])

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name: projectName, description: projectDesc }),
      })
      if (!res.ok) {
        const error = await res.text()
        console.error('Project creation error:', res.status, error)
        alert('Failed to create project')
        return
      }
      const data = await res.json()
      console.log('Project created:', data)
      setProjectName('')
      setProjectDesc('')
      await fetchProjects()
    } catch (error) {
      console.error('Project creation error:', error)
      alert('Failed to create project')
    } finally {
      setLoading(false)
    }
  }

  const handleTaskSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title: taskTitle,
          description: taskDesc,
          projectId: taskProjectId,
          deadline: taskDeadline || null,
          assignee: taskAssignee || null,
        }),
      })
      if (!res.ok) {
        const error = await res.text()
        console.error('Task creation error:', res.status, error)
        alert('Failed to create task')
        return
      }
      const data = await res.json()
      setTaskTitle('')
      setTaskDesc('')
      setTaskProjectId('')
      setTaskDeadline('')
      setTaskAssignee('')
      setPredictedTime(null)
      await fetchTasks()
      if (socket) {
        socket.emit('task-created', data)
      }
    } catch (error) {
      console.error('Task creation error:', error)
      alert('Failed to create task')
    } finally {
      setLoading(false)
    }
  }

  const predictTime = async () => {
    if (!taskDesc) {
      alert('Please enter task description first')
      return
    }
    setPredicting(true)
    try {
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ description: taskDesc }),
      })
      const data = await res.json()
      if (data.time) {
        setPredictedTime(data.time)
        alert(`Estimated time: ${data.time} hours`)
      } else {
        alert('Prediction failed: ' + (data.error || 'Unknown error'))
      }
    } catch (error) {
      alert('Prediction error: ' + String(error))
    } finally {
      setPredicting(false)
    }
  }

  const deleteTask = async (id: string) => {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      await fetchTasks()
      if (socket) {
        socket.emit('task-deleted', { id })
      }
    } catch (error) {
      console.error('Delete error:', error)
    }
  }

  const logout = async () => {
    await fetch('/api/logout', { method: 'POST', credentials: 'include' })
    window.location.href = '/login'
  }

  if (!user) {
    return <div className="p-6 text-center">Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Project & Task Management</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Hello, {user.name || user.email}</span>
          <button
            onClick={logout}
            className="text-sm text-red-600 hover:underline"
          >
            Logout
          </button>
        </div>
      </div>

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
            <div className="flex gap-2">
              <button
                type="button"
                onClick={predictTime}
                disabled={predicting || !taskDesc}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
              >
                {predicting ? 'Predicting...' : 'Predict time'}
              </button>
              {predictedTime !== null && (
                <span className="text-sm text-gray-600 self-center">
                  Estimate: {predictedTime}h
                </span>
              )}
            </div>
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
