import { useNavigate } from "react-router-dom";
import "./register.css";
import {useState} from "react";
import axios from "axios";

const Register=()=>{
    const navigate=useNavigate();
    const gotoLoginPage=()=>{
        navigate("/");
    }
   
    const [form,setForm]=useState({email:"",password:""});
    const [error,setError]=useState({email:{isValid:true,message:""},password:{isvalid:true,message:""}});
    const [tick,setTick]=useState(false);
    const [confirm,setConfirm]=useState({data:"",isValid:false});
    // const validSubmission=form.email.length&&form.password.length&&tick
    const tickHandler=()=>{
        if(tick===true)
        {
            setTick(false);
        }
        else{
            setTick(true);
        }
    }
    const confirmPasswordHandler=(val)=>{
        setConfirm({...confirm,data:val})
        if(form.password===confirm.data){
            setConfirm({...confirm,isValid:true})
        }
        else{
            setConfirm({...confirm,isValid:false})
        }
    }
    const checkError=(type)=>{
        switch(type){
            case "email":{
                const reg=/^\W+([/.-]?\W)*@gmail\.com$/g;
                if(reg.test(form.email))
                {
                    setError({...error,email:{isValid:true,message:""}})
                }
                else{
                    setError({...error,email:{isValid:false,message:"give a valid email"}});
                    setForm({...form,email:""});
                }
                break;
            }
            case "password":{
                console.log(form.password);
                if(form.password.length>=15 || form.password.length<=10)
                {
                    setError({...error,password:{isvalid:false,message:"password should contain 10 to 15 characters"}});
                    setForm({...form,password:""});
                    
                }
                else{
                    setError({...error,password:{isvalid:true,message:""}})
                }
                break;
            }
            default:{
                setError({email:{isValid:true,message:""},password:{isvalid:true,message:""}});
            }
        }
    }
    const submittodatabase=(e)=>{
        e.preventDefault();
       if(form.email.length>0 && form.password.length>0 )
       {
           axios.post("https://prt25fullstackuttej.onrender.com/api/v1/user/register",form).then((res)=>{
            if(res.data.message==="User already registered"){
                alert("user mail exist");
            }
            else if(res.data.message==="successfully registered")
            {
                alert("registration successfull");
                navigate("/")
            }
           })
       }
       else{
        alert("all fields are manidatory");
       }
    }
    return(
        <>
        <div className="registerpagemaincontainer">
           <div>
            <h3>SignUp</h3>
            <div>
                <input type="email" placeholder="Email" onChange={(e)=>{setForm({...form,email:e.target.value})}} />
                {!error.email.isValid?<div>{error.email.message}</div>:null}
                <input type="password" placeholder="Password" onChange={(e)=>{setForm({...form,password:e.target.value})}}/>
                {!error.password.isvalid?<div>{error.email.password}</div>:null}
                <input type="password" placeholder="confirmPassword" onChange={(e)=>{confirmPasswordHandler(e.target.value)}} />
                <div>
                <input type="checkbox" onChange={tickHandler}/><span>I agree with terms and conditions</span>
                </div>
                <button onClick={submittodatabase}>Register</button>
                <button onClick={(e)=>{gotoLoginPage(e)}}>Login</button>
            </div>
           </div>
        </div>
        </>
    )
}
export default Register;