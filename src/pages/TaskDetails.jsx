import "../styles/TaskDetails.scss";
import { useDispatch, useSelector } from "react-redux";
import {  fetchTask, updateTask, deleteTask } from "../taskSlice";
import { useEffect, useState } from "react";
import {  useParams, useNavigate } from "react-router-dom";
import elipsis from '../assets/elipsis-h.svg'


const TaskDetails = ()=>{
    const dispatch = useDispatch();
    const {id} = useParams();
    
    const data = useSelector((state) => state.tasks);
    useEffect(()=>{
        dispatch(fetchTask(id));
    },[])
    
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [status, setStatus] = useState("");
    const [edit, setEdit] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

    const task = data.data;
    useEffect(()=>{
        setTitle(task.title);
        setDesc(task.description);
        setStatus(task.completed ? "completed":"active")
    },[task])


    useEffect(()=>{
        const inputs = document.getElementsByClassName('input');        
        Array.from(inputs).forEach((i) => {
            if(!edit){
                i.style.borderColor = 'transparent';
            }else{
                i.style='';
            }
        });
        
    },[edit])

    const handleUpdate = async()=>{
        dispatch(updateTask({id:id, task:{title:title,description:desc, completed: status==="active" ? false : true}}))
    }

    const handleDeleteTask = async () => {
        dispatch(deleteTask(id));
        navigate("/");
        alert("Завдання видалено");
        window.location.reload();
    };
    
    return (
      <section className="details">
        <a href="/" className="goBack">Назад</a>
        <div className="header">
            <h1>Завдання</h1>
            <button onClick={()=>{setShowOptions(!showOptions)}} disabled={edit}><img src={elipsis} alt="options" /></button>
            {showOptions && (
                <div className="header-options">
                    <ul>
                        <li onClick={()=>{setEdit(true); setShowOptions(false)}}>Редагувати</li>
                        <li onClick={()=>{handleDeleteTask()}}>Видалити</li>
                    </ul>
                </div>
            )}
        </div>

        <form className="form" >
          <label htmlFor="title">Назва</label>
          <input
            disabled={!edit}
            type="text"
            name="title"
            id="title"
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="desc">Опис</label>
          <textarea
            disabled={!edit}
            name="desc"
            id="desc"
            className="input"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <label htmlFor="status">Статус</label>
            <select name="status" disabled = {!edit} value={status} onChange={(e) => setStatus(e.target.value)} >
                <option value="active">Активне</option>
                <option value="completed">Виконане</option>
            </select>
          {edit && (
            <button type="submit" className="addButton" onClick={()=>handleUpdate()}>
                Оновити
            </button>
          )}
        </form>
      </section>
    );
}

export default TaskDetails;