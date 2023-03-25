import Topbar from "../topbar/topbar";
import "./noteinfo.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const NoteInfo=(props)=>{
    const navigate=useNavigate();
    const goBackHandler=()=>{
        props.xrr[props.ind]=false;
        props.setXrr([...props.xrr]);
    }
    const noteDeleteHandler=()=>{
        const url=`http://localhost:3300/api/v1/usernote/note/${props.info._id}`
         axios.delete(url).then((res)=>{
            navigate("/main");
         }).catch((e)=>{console.log(e)})
    }
    return(
        <>
        <div className="noteinfomaincontainer">
        <Topbar/>
        <div className="noteinfobodycontainer">
        <div>
            {props.info.title}
        </div>
        <div>
             {props.info.description} 
        </div>
        <div>
            <button>Update</button>
            <button onClick={noteDeleteHandler}>Delete</button>
            <button onClick={goBackHandler}>Goback</button>
        </div>
        </div>
        </div>
        </>
    )
}
export default NoteInfo;