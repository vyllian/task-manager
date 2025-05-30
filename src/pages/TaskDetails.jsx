import { useParams } from "react-router-dom"

const TaskDetails = ()=>{
    const {id} = useParams();

    return(
        <h1>{id}</h1>
    )
}

export default TaskDetails;