import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Employee from "./pages/Employee.jsx";
import Team from "./pages/Team.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import EmployeeDetails from "./pages/EmployeeDetails.jsx";
import TeamDetails from "./pages/TeamDetails.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/employees" element={<Employee />} />
        <Route path="/employees/:id" element={<EmployeeDetails />} />
        <Route path="/teams" element={<Team />} />
        <Route path="/teams/:id" element={<TeamDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
