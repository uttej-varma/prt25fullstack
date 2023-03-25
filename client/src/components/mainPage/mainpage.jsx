import Card from "../cardcomponent/card";
import Topbar from "../topbar/topbar";
import "./mainpage.css";
import {data} from "../../dummy";
import axios from "axios";
import { useState} from "react";
import { useEffect } from "react";
const MainPage=()=>{
  const [arr,setArr]=useState(new Array(data.length).fill(false));
  const [note,setNote]=useState([]);
  const url=`http://localhost:3300/api/v1/usernote/note/${JSON.parse(localStorage.getItem("userData")).id}`
  useEffect(()=>{
    axios.get(url).then((res)=>{
           if(res.data.message==="user notes fetched")
           {
            setNote([...res.data.data]);
           }
    }).catch((e)=>{console.log(e)})
  })
  return(
    <>
      <Topbar/>
      <div className="mainpageBodyContainer">
          <div className="mainpageFilter">
            <input type="text" placeholder="search by title"/>
            <button>Search</button>
          </div>
          <div className="mainPageoverflowcontainer">
               {
                note.map((value,index)=>{
                    return <Card data={value} key={index} number={index} urr={arr} setUrr={setArr}/>
                })
               }
          </div>
        
      </div>
    </>
  )
}
export default MainPage;