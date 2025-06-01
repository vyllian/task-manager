import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskList from './pages/taskList';
import NewTask from './pages/NewTask';
import TaskDetails from './pages/TaskDetails';
import { loginAndStoreToken } from './components/user';

function App() {
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loginAndStoreToken()
      .then(({ user }) => {
        setUser(user);       
      })
      .catch((err) => {
        console.error("Помилка логіну:", err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);  
      });
  }, []);

  if (loading) return <h1>Завантаження...</h1>

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
