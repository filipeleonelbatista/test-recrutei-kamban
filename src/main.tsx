import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { LoaderProvider } from './context/LoaderContext'
import { TaskProvider } from './context/TasksContext'
import './global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoaderProvider>
      <TaskProvider>
        <App />
      </TaskProvider>
    </LoaderProvider>
  </StrictMode>,
)
