// import logo from './logo.svg';
import { useNavigate } from "react-router";
import "../App.css";
import { useState, useReducer } from "react";
import axios from "axios";
import MyContext from "../context";
import Header from "./header";
import { useContext } from "react";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const context = useContext(MyContext);
  console.log(">>>>>>props", props);
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(email, password);

    setError("");
    const data = {
      email: email,
      password: password,
    };

    const res = await axios.post("http://localhost:5001/login", data);

    // let data = localStorage.getItem("userInfo");
    // data = data ? JSON.parse(data) : null;

    console.log(">>>>>>>>>>>>>>>>>>>data", data);

    console.log("res", res);
    if (data && email === data.email) {
      if (password === data.password) {
        console.log("User LoggedIn successfully!!");
        localStorage.setItem("token", res.data.data.token);
        // props.setScreen("dashboard")
        navigate("/add-task");
      } else {
        setError("Password doesn't match");
      }
    } else {
      setError("User Not found");
    }
  };

  /**
   * false, empty string, 0, null, undefined are falsy values
   */
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangePassword = (event) => {
    setPass(event.target.value);
  };
  return (
    <div className="App" >
      <h2>Login</h2>
      <form>
        <input
          type="email"
          placeholder="Email"
          onChange={onChangeEmail}
          required
        ></input>
        <br></br>
        <input
          type="password"
          placeholder="Password"
          onChange={onChangePassword}
          required
        ></input>
        <br></br>
        {error ? <p style={{ color: "red" }}>{error}</p> : null}
        <button onClick={onSubmit}>Submit</button>
      </form>
      {/* <div>
        <p>Do not have account <button onClick={()=>navigate("/signup")}>Signup now </button></p>
      </div> */}
    </div>
  );
}

export default Login;
