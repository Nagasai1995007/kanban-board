import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Registration from "./Components/Registration";
import "bootstrap/dist/css/bootstrap.min.css";
import TaskManagement from "./Components/TaskManagement";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/TaskManagement" element={<TaskManagement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
