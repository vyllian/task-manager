import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, updateStatus, deleteTask } from "../taskSlice";
import "../styles/TaskList.scss";
import {
  useSearchParams,
  useNavigate,
  Link,
  useLocation,
} from "react-router-dom";
import binIcon from "../assets/icons8-bin.svg";

const TaskList = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.tasks);
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const completedParam = searchParams.get("completed");

  const setActiveTab = (id) => {
    const filters = document.getElementsByClassName("filter");
    Array.from(filters).forEach((button) => {
      if (button.id === id) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  };

  const chooseTab = () => {
    if (completedParam === null) {
      setActiveTab("all-tasks");
    } else if (completedParam === "true") {
      setActiveTab("completed-tasks");
    } else {
      setActiveTab("active-tasks");
    }
  };

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    if (!data.isLoading) {
      chooseTab();
    }
  }, [data.isLoading, completedParam]);


  let filteredTasks = [...data.data];
  if (completedParam === "true") {
    filteredTasks = filteredTasks.filter((task) => task.completed === true);
  } else if (completedParam === "false") {
    filteredTasks = filteredTasks.filter((task) => task.completed === false);
  }
  filteredTasks = filteredTasks.sort((a, b) => {
    if (a.completed === b.completed) {
      return b.id - a.id;
    }
    return a.completed - b.completed;
  });

  const handleFilter = (completed) => {
    if (completed === undefined) {
      navigate("/");
    } else {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("completed", completed);
      navigate({ search: newParams.toString() });
    }
  };

  const updateTaskStatus = async (task) => {
    dispatch(updateStatus({ id: task.id, completed: !task.completed }));
  };

  const handleDeleteTask = async (id) => {
    alert("Завдання видалено");
    dispatch(deleteTask(id));
  };
  if (data.isLoading) return <h1>Завантаження...</h1>;

  return (
    <section className="list">
      <h1>Мої завдання</h1>
      <nav>
        <div>
          <button
            id="all-tasks"
            className="filter"
            onClick={() => handleFilter()}
          >
            Усі
          </button>
          <button
            id="active-tasks"
            className="filter"
            onClick={() => handleFilter(false)}
          >
            Активні
          </button>
          <button
            id="completed-tasks"
            className="filter"
            onClick={() => handleFilter(true)}
          >
            Виконані
          </button>
        </div>
        <Link to={"/add"} className="addButton">
          Створити
        </Link>
      </nav>
      <table className="table">
        <tr className="task">
          <td className="task-check"></td>
          <td className="task-title">Назва</td>
          <td className="task-description">Опис</td>
          <td className="task-delete"></td>
        </tr>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <tr
              className={`task ${task.completed ? "completed" : ""}`}
              key={task.id}
            >
              <td className="task-check">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => updateTaskStatus(task)}
                />
              </td>
              <td className="task-title">
                <Link to={`/task/${task.id}`}>{task.title}</Link>
              </td>
              <td className="task-description">{task.description}</td>
              <td className="task-delete">
                <button
                  type="button"
                  onClick={() => {
                    handleDeleteTask(task.id);
                  }}
                >
                  <img src={binIcon} alt="delete" />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr className="no-tasks">
            <td>Немає завдань</td>
          </tr>
        )}
      </table>
    </section>
  );
};

export default TaskList;
