import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskList from './pages/taskList';
import NewTask from './pages/NewTask';
import TaskDetails from './pages/TaskDetails';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TaskList/>}></Route>
        <Route path='/add' element={<NewTask/>}></Route>
        <Route path='/task/:id' element={<TaskDetails/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
