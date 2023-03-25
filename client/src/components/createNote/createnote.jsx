import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "./createnote.css";
const CreateNote=()=>{
    const navigate=useNavigate();
    const [data,setData]=useState({title:"",description:""})
    const gotomainpageagain=()=>{
     navigate("/main");
    }
    const createAnote=(e)=>{
        e.preventDefault();
        if((data.title.length>=10 && data.title.length<=20) && (data.description.length>=30 && data.description.length<=100))
        {
            axios.post("http://localhost:3300/api/v1/usernote/note",data,
            {
                headers:{"jwttoken":JSON.parse(localStorage.getItem("userData")).token},
                "Content-Type":"application/json"
            }
            ).then((res)=>{
                if(res.data.message="post created successfully")
                {
                    alert("post created successfully");
                    navigate("/main");
                }
                else{
                    alert("please login again");
                    navigate("/");
                }
            })

        }
        else{
            alert("title length:10 to 20 & description length:30 to 100")
        }
        
    }
    return(
        <>
        <div className="formContainer">
            <form>
                <label>Title</label>
                <input type="text" placeholder="title" onChange={(e)=>{setData({...data,title:e.target.value})}}/>
                <label>Description</label>
                <textarea placeholder="What's on your mind?" onChange={(e)=>{setData({...data,description:e.target.value})}}></textarea>
                <button onClick={(e)=>{createAnote(e)}}>AddNote</button>
                <button onClick={gotomainpageagain}>GoBack</button>
            </form>

        </div>
        </>
    )
}
export default CreateNote;