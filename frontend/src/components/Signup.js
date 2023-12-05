import { useNavigate } from "react-router";
import "../App.css";
import { useReducer } from "react";
import axios from "axios";

function Signup() {
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_NAME":
        return { ...state, name: action.payload };
      case "SET_EMAIL":
        return { ...state, email: action.payload };
      case "SET_PASSWORD":
        return { ...state, pass: action.payload };
      case "SET_MOBILE":
        return { ...state, mob: action.payload };
      case "SET_ADDRESS":
        return { ...state, address: action.payload };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    name: "",
    email: "",
    mob: "",
    pass: "",
    address: "",
  });

  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [pass, setPass] = useState("");
  // const [mob, setMob] = useState("");
  // const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    const data = {
      name: state.name,
      email: state.email,
      phone_no: state.mob,
      password: state.pass,
      address: state.address,
    };

    console.log("data", data);

    const res = await axios.post("http://localhost:5001/signup", data);
    console.log("res", res);

    // console.log("data", JSON.stringify(data));
    // localStorage.setItem("userInfo", JSON.stringify(data));
    navigate("/login");
    // props.setScreen("login");
  };

  const onChangeName = (event) => {
    dispatch({ type: "SET_NAME", payload: event.target.value });
  };
  const onChangeEmail = (event) => {
    dispatch({ type: "SET_EMAIL", payload: event.target.value });
  };
  const onChangePass = (event) => {
    dispatch({ type: "SET_PASSWORD", payload: event.target.value });
  };
  const onChangeMob = (event) => {
    dispatch({ type: "SET_MOBILE", payload: event.target.value });
  };
  const onChangeAddress = (event) => {
    dispatch({ type: "SET_ADDRESS", payload: event.target.value });
  };
  return (
    <div className="App">
      <h1>SignUp</h1>
      <form>
        <label>Name:</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={state?.name}
          onChange={onChangeName}
        ></input>
        <br></br>

        <label>Email:</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={state?.email}
          onChange={onChangeEmail}
        ></input>
        <br></br>
        <label>password:</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={state?.pass}
          onChange={onChangePass}
        ></input>
        <br></br>
        <label>mobile no:</label>
        <input
          type="number"
          placeholder="Enter your mobile no"
          value={state?.mob}
          onChange={onChangeMob}
        ></input>
        <br></br>
        <label>Address:</label>
        <input
          type="text"
          placeholder="Enter your Address"
          value={state?.address}
          onChange={onChangeAddress}
        ></input>
        <input type="submit" value="Submit" onClick={onSubmit}></input>
      </form>
      <div>
        <p>
          Already have a account{" "}
          <button onClick={() => navigate("/login")}>Login now </button>
        </p>
      </div>
    </div>
  );
}
export default Signup;
