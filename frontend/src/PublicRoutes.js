import {Routes, Route} from "react-router"
import Signup from './components/Signup.js';
import Login from './components/Login';
import Dashboard from './components/Dashboard'
import Todo from "./components/todo.js";
import NavBar from './components/nav/Navbar';



function PublicRoutes (){

    return(
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-task" element={<Todo />} />
        </Routes>
    )
}


export default PublicRoutes;
