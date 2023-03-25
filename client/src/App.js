import Login from "./components/login/login";
import Register from "./components/register/register";
import CreateNote from "./components/createNote/createnote";
import MainPage from "./components/mainPage/mainpage";

// import NoteInfo from "./components/noteinfo/noteinfo";
import {BrowserRouter,Routes,Route} from "react-router-dom"



function App() {
  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="register" element={<Register/>}/>
    <Route path="main" element={<MainPage/>}/>
    <Route path="create" element={<CreateNote/>}/>
   </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
