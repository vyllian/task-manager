import React, { useState } from "react";
import "../styles/NewTask.scss";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../taskSlice";

const NewTask = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const createTask = async (e) => {
    if (!title || !desc) {
      alert("Завдання порожнє!");
    } else {
      e.preventDefault();
      dispatch(addTask({ title: title, description: desc }));
      setTitle("");
      setDesc("");
    }
  };
  return (
    <section className="new">
      <h1>Нове завдання</h1>
      <form className="form" onSubmit={createTask}>
        <label htmlFor="title">Назва</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="desc">Опис</label>
        <textarea
          name="desc"
          id="desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
        <button type="submit" className="addButton">
          Додати
        </button>
      </form>
    </section>
  );
};

export default NewTask;
