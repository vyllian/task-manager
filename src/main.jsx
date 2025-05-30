import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './styles/main.scss'
import App from './App.jsx'
import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './taskSlice'

const store = configureStore({
  reducer:{
    tasks : taskReducer,
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
