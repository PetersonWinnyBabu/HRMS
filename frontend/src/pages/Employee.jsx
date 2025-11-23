import { useEffect, useState } from "react";
import "./pages.css";

import EmployeeForm from "../components/EmployeeForm";
import EmployeeListItem from "../components/EmployeeListItem";
import api from "../services/api";
import Logout from "../components/logout";

const Employee = () => {
  const [employeesList, setEmployeesList] = useState([]);

  const [employeeFrompen, setEmployeeFormOpen] = useState(false);

  useEffect(() => {
    api
      .get("https://hrms-backend-ke9s.onrender.com/api/employees")
      .then((response) => {
        setEmployeesList(response.data.response);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="background-main">
      <Logout />
      <div className="employee-list-main">
        <h1 className="heading-1">Employees List</h1>

        <button
          className="submit-button"
          onClick={() => setEmployeeFormOpen(!employeeFrompen)}
        >
          {employeeFrompen ? "Close" : "Add Employee"}
        </button>

        {employeeFrompen ? (
          <EmployeeForm />
        ) : (
          <ul className="employee-list">
            {employeesList.map((each) => (
              <EmployeeListItem details={each} key={each.id} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Employee;
