import { useEffect, useRef, useState } from "react";

// import { useNavigate } from "react-router";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { FaSearch, FaTrash } from "react-icons/fa";
import { IoMdDoneAll } from "react-icons/io";
import { BiSolidHourglassTop } from "react-icons/bi";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [date, setDate] = useState();
  const [input, setInput] = useState("");

  const navigate = useNavigate();
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const LogOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  useEffect(() => {
    fetchAllTask();
  }, [input]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      const newTodo = {
        text: inputValue,
        date: date,
      };

      const res = await axios.post(`http://localhost:5001/add-task`, newTodo, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });

      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setInputValue("");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, []);

  const fetchAllTask = async () => {
    const res = await axios.get(
      `http://localhost:5001/get-tasks?searchText=${input}`,
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    );
    // console.log("res", res);
    setTodos(res.data.data);
  };

  const markAsComplete = async (id) => {
    console.log(">>>>id", id);
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure want to mark this task as completed?")) {
      const res = await axios.patch(
        `http://localhost:5001/mark-as-complete/${id}`,
        {},
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );

      //   console.log("res", res);
      fetchAllTask();
    }
  };

  const deleteTask = async (id) => {
    console.log(">>>>id", id);
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure want to delete this task?")) {
      const res = await axios.delete(
        `http://localhost:5001/delete-task/${id}`,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      console.log("res", res);
      fetchAllTask();
    }
  };

  return (
    <div className="App" ref={topRef}>
      <div>
        <button onClick={() => bottomRef.current.scrollIntoView()}>
          Scroll to bottom
        </button>
      </div>

      <button class="logout" onClick={LogOut}>
        Log Out
      </button>
      <h1>Todo List</h1>

      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Enter a new todo"
          value={inputValue}
          onChange={handleInputChange}
        />
        <input
          type="date"
          placeholder="Enter a new todo"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
      <div class="search-bar-container">
        <div>
          <FaSearch id="search-icon" />
          <input
            placeholder="Type to search...."
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Todo</th>
            <th>Status</th>
            <th>Mark As Completed</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.date}</td>
              <td>{todo.text}</td>
              <td>
                {todo.isCompleted ? <IoMdDoneAll /> : <BiSolidHourglassTop />}
              </td>
              <td>
                {todo.isCompleted ? (
                  "--"
                ) : (
                  <button onClick={() => markAsComplete(todo._id)}>
                    Mark As Complete
                  </button>
                )}
              </td>
              <td>
                <FaTrash onClick={() => deleteTask(todo._id)} />
                {/* <button onClick={() => deleteTask(todo._id)}>Delete</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div ref={bottomRef}>
        <button onClick={() => topRef.current.scrollIntoView()}>
          Scroll to Top
        </button>
      </div>
    </div>
  );
}

export default Todo;
