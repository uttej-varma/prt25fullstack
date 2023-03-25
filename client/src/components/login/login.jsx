import "./login.css"
import { useNavigate } from "react-router-dom";
import {useState} from "react";
import {useEffect} from "react";
import axios from "axios";
const Login=()=>{
    useEffect(()=>{
        if(localStorage.getItem("userData")!==null)
        {
            navigate("/main");
        }
        else if(localStorage.getItem("userData")===null){
            navigate("/");
        }
    })
    const navigate=useNavigate();
    const [form,setForm]=useState({email:"",password:""});
    const gotoRegister=()=>{
        navigate("/register")
    }
    const loginHandler=(e)=>{
        e.preventDefault();
        if(form.email.length>0 && form.password.length>0 )
        {
            axios.post("https://prt25fullstackuttej.onrender.com/api/v1/user/login",form).then((res)=>{
             if(res.data.message==="user should register"){
                 alert("user not exist");
             }
             else if(res.data.message==="invalid Credentials")
             {
                 alert("invalid Credentials");
             }
             else if(res.data.message==="user loggedin successfully"){
                localStorage.removeItem("userData");
                localStorage.setItem("userData",JSON.stringify(res.data));
                    
                        navigate("/main");
                    
             }
            })
        }
        else{
         alert("all fields are manidatory");
        }
    }
    return(
        <>
        <div className="loginpagemaincontainer">
           <div>
            <h3>SignIn</h3>
            <div>
                <label>Email</label>
                <input type="email" placeholder="Email" onChange={(e)=>{setForm({...form,email:e.target.value})}}/>
                <label>Password</label>
                <input type="password" placeholder="Password" onChange={(e)=>{setForm({...form,password:e.target.value})}}/>
                <div>
                <input type="checkbox"/><span>Remember me</span>
                </div>
                <button onClick={(e)=>{loginHandler(e)}}>submit</button>
                <div className="loginforgot">forgot password?</div>
                <button onClick={gotoRegister}>Register</button>
            </div>
           </div>
        </div>
        </>
    )
}
export default Login;