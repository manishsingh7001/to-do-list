// import logo from './logo.svg';
import './App.css';
// import {useState} from "react";
import {BrowserRouter } from "react-router-dom"
// import Signup from './components/Signup.js';
// import Login from './components/Login';
// import Dashboard from './components/Dashboard'
import PublicRoutes from './PublicRoutes';
import MyContext from './context';

// import Header from './components/header';

function App() {
  // const [backgroundColor, setBackgroundColor] = useState("black");
    // const [screen, setScreen] = useState("signup")

    // const OnClickButton =(value) =>{
    //   console.log(">>>>>>>>>>>>>>OnClickButton",);
    //   setScreen(value)
    // }
 
  return (
    <MyContext.Provider>
      <BrowserRouter>
        <PublicRoutes />
      </BrowserRouter>  
      </MyContext.Provider>
  );
}

export default App;
 {/* <div>
        <button onClick={(event)=>OnClickButton("signup")}>SignUp</button>
        <button onClick={(event)=>OnClickButton("login")}>Login</button>
        <button onClick={(event)=>OnClickButton("dashboard")}>Dashboard</button>

      </div>

        {screen ==="signup" ? <Signup setScreen={setScreen} /> : <null />}
        {screen ==="login" ? <Login setScreen={setScreen}/> : <null />}
        {screen ==="dashboard" ? <Dashboard /> : <null />} */}