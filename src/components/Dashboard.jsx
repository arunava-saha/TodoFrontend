import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoForm from "./todos/TodoForm";
import TodoLists from "./todos/TodoLists";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const token = sessionStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const BASE_URL = "https://todo-backend-pink.vercel.app";

  const [userTodos, setUserTodos] = useState(null);
  const navigateTo = useNavigate();
  //to get all todos

  const fetchUserTodos = async () => {
    const resp = await axios.get(`${BASE_URL}/api/todo`);

    if (resp.data.todos.length > 0) {
      setUserTodos(resp.data.todos);
    }
  };

  useEffect(() => {
    fetchUserTodos();
    return;
  }, []);
  const logout = () => {
    sessionStorage.removeItem("token");
    navigateTo("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full mb-[3rem]">
      <div className="flex w-full relative">
        <button
          onClick={logout}
          className="absolute top-9 bg-red-500 px-4 py-2 w-15  right-4 text-xl rounded-md font-semibold"
        >
          LogOut
        </button>
      </div>
      <TodoForm fetchUserTodos={fetchUserTodos} BASE_URL={BASE_URL} />
      <TodoLists
        fetchUserTodos={fetchUserTodos}
        setUserTodos={setUserTodos}
        userTodos={userTodos}
        BASE_URL={BASE_URL}
      />
    </div>
  );
}

export default Dashboard;
