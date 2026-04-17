import { useState } from 'react'
import './App.css'

const STORAGE_KEY = 'task-board-tasks'

const SAMPLE_TASKS = [
  { id: 1, text: '企画書を作成する', done: true },
  { id: 2, text: 'ミーティングの準備', done: false },
  { id: 3, text: '資料を送付する', done: false },
]

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
    saveTasks(SAMPLE_TASKS)
    return SAMPLE_TASKS
  } catch {
    return SAMPLE_TASKS
  }
}

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

function getNextId(tasks) {
  return tasks.length === 0 ? 1 : Math.max(...tasks.map(t => t.id)) + 1
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks)
  const [input, setInput] = useState('')

  function updateTasks(next) {
    setTasks(next)
    saveTasks(next)
  }

  function addTask() {
    const text = input.trim()
    if (!text) return
    updateTasks([...tasks, { id: getNextId(tasks), text, done: false }])
    setInput('')
  }

  function toggleTask(id) {
    updateTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  function deleteTask(id) {
    updateTasks(tasks.filter(t => t.id !== id))
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') addTask()
  }

  return (
    <div className="container">
      <h1>タスクボード</h1>
      <div className="input-row">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="タスクを入力..."
        />
        <button onClick={addTask}>追加</button>
      </div>
      <ul className="task-list">
        {tasks.length === 0 && (
          <li className="empty">タスクがありません</li>
        )}
        {tasks.map(task => (
          <li key={task.id} className={`task-item${task.done ? ' done' : ''}`}>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
            />
            <span className="task-text">{task.text}</span>
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
