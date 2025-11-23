import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";
import "../pages/pages.css";

const AssignEmployeeItem = (props) => {
  const { details, selectedEmployees, assignEmployee } = props;

  const { first_name, email, id } = details;

  const isSelected = selectedEmployees.includes(id);

  return (
    <li className="team-detail-item">
      <div className="team-detail">
        <h3>Employeee Id : {id}</h3>
        <h3>Employee Name : {first_name}</h3>
        <h3>Email :{email}</h3>
      </div>
      <button
        className={isSelected ? "selected-button" : "submit-button"}
        onClick={() => assignEmployee(id)}
      >
        {isSelected ? "Selected" : "Select"}
      </button>
    </li>
  );
};

const AssignEmployee = (props) => {
  const { setShowEmployeeList, selectedEmployees } = props;
  const [employees, setEmployees] = useState([]);
  const [assignedId, setAssignedId] = useState([]);
  const [employeeIDs, setEmployeeIDs] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    api
      .get("https://hrms-backend-ke9s.onrender.com/api/employees")
      .then((response) => {
        setEmployees(response.data.response);
        console.log(response);
      })
      .catch((err) => console.log(err));
  }, []);

  const assignEmployee = (empId) => {
    if (!assignedId.includes(empId)) {
      setAssignedId((prev) => [...prev, empId]);
      setEmployeeIDs((prev) => [...prev, { employee_id: empId, team_id: id }]);
    } else {
      setAssignedId((prev) => [...prev.filter((id) => id !== empId)]);
      setEmployeeIDs((prev) => [
        ...prev.filter((each) => each.employee_id !== empId),
      ]);
    }
  };

  const onSuccess = (response) => {
    alert(response.message);
    window.location.reload(false);
  };
  const onFailure = (err) => {
    alert(err.message);
  };

  const assignBulk = () => {
    api
      .post(`https://hrms-backend-ke9s.onrender.com/api/teams/${id}/assign`, {
        employeeIDs,
      })
      .then((response) => onSuccess(response.data))
      .catch((err) => onFailure(err));
  };
  console.log(assignedId);
  console.log(selectedEmployees);
  console.log(employeeIDs);
  return (
    <div className="employees-add-list">
      <button
        className="submit-button"
        onClick={() => setShowEmployeeList(false)}
      >
        close
      </button>
      <ul className="employees-list-container">
        {employees.map((each) => (
          <AssignEmployeeItem
            details={each}
            key={each.id}
            selectedEmployees={assignedId}
            assignEmployee={assignEmployee}
          />
        ))}
      </ul>
      <button className="submit-button" onClick={assignBulk}>
        Assign Selected
      </button>
    </div>
  );
};

export default AssignEmployee;
