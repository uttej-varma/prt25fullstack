import "./topbar.css";
import { useNavigate } from "react-router-dom";
import {useEffect} from "react"
// import axios from "axios";
const Topbar=()=>{
    const navigate=useNavigate();
    const logOutHandler=()=>{
        localStorage.removeItem("userData");
        navigate("/");

    }
    const createNoteHandler=()=>{
         navigate("/create");
    }
    useEffect(()=>{
        if(localStorage.getItem("userData")===null)
        {
            navigate("/");
        }
    })
    
    return(
        <>
        <div className="topBarContainer">
            <button onClick={logOutHandler}>Home</button>
            <button onClick={createNoteHandler}>+AddNote</button>
            <button>XdeleteAll</button>
            <button>^Export</button>
        </div>
        </>
    )
}
export default Topbar;