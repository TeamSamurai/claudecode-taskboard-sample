import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/claudecode-taskboard-sample/task-board/',
  plugins: [react()],
})
