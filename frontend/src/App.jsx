import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Employee from "./pages/Employee.jsx";
import Team from "./pages/Team.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import EmployeeDetails from "./pages/EmployeeDetails.jsx";
import TeamDetails from "./pages/TeamDetails.jsx";
import PrivateRoutes from "./services/PrivateRoutes.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/employees" element={<Employee />} />
          <Route path="/employees/:id" element={<EmployeeDetails />} />
          <Route path="/teams" element={<Team />} />
          <Route path="/teams/:id" element={<TeamDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
