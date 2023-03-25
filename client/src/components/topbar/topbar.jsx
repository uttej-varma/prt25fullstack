import "./topbar.css";
import { useNavigate } from "react-router-dom";
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