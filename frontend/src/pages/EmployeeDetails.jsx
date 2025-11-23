import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm";

import api from "../services/api";
import "./pages.css";
const EmployeeDetails = () => {
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [employeeTeamDetails, setEmployeeTeamDetails] = useState([]);
  const { id } = useParams();
  const [showEditForm, setShowEditForm] = useState(false);

  const navigate = useNavigate();

  const assignDetails = (response) => {
    setEmployeeDetails(response.employee_details);
    setEmployeeTeamDetails(response.employee_team_details);
  };

  useEffect(() => {
    api
      .get(`https://hrms-backend-ke9s.onrender.com/api/employees/${id}`)
      .then((response) => {
        console.log(response);
        assignDetails(response.data.response);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const deleteEmp = async () => {
    await api
      .delete(`https://hrms-backend-ke9s.onrender.com/api/employees/${id}`)
      .then((response) => {
        if (response.status === 200) {
          alert(`Successfully Deleted Employee ${id}`);
          navigate("/employees", { replace: true });
        }
      })
      .catch((err) => console.log(err));
  };
  const unAssign = async (teamId) => {
    await api
      .delete(
        `https://hrms-backend-ke9s.onrender.com/api/teams/${teamId}/unassign`,
        {
          data: { employee_id: id, team_id: teamId },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.message);
          window.location.reload(false);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="background-main">
      {showEditForm ? (
        <>
          <button
            className="close-button submit-button"
            onClick={() => setShowEditForm(false)}
          >
            Cancel
          </button>
          <EmployeeForm formType="edit" id={id} />
        </>
      ) : (
        <div className="dashboard-container">
          <h1 className="heading">Employee Details</h1>
          <div className="employeeDesc">
            <h1 className="sub-heading">
              First Name : {employeeDetails.first_name}
            </h1>
            <h1 className="sub-heading">
              Last Name : {employeeDetails.last_name}
            </h1>
            <h2 className="sub-heading">Employee Id : {employeeDetails.id}</h2>
            <h2 className="sub-heading">Email: {employeeDetails.email}</h2>
            <h2 className="sub-heading">Phone: {employeeDetails.phone}</h2>
          </div>

          <>
            <h1 className="heading">Employee Teams</h1>
            <div className="employee-teams-list">
              {employeeTeamDetails.length === 0 ? (
                <div className="container-assign">
                  <h1>No teams Assigned</h1>
                  <button
                    className="submit-button "
                    onClick={() => navigate("/teams")}
                  >
                    Assign teams
                  </button>
                </div>
              ) : (
                <ul className="teams-list">
                  {employeeTeamDetails.map((each) => (
                    <li className="team-detail-item" key={each.id}>
                      <div className="team-detail">
                        <h2 className="sub-heading">Team Id : {each.id} </h2>
                        <h2 className="sub-heading">Name : {each.name}</h2>
                        <p className="para1">
                          Description : {each.description}
                        </p>
                      </div>
                      <button
                        className="submit-button"
                        onClick={() => unAssign(each.id)}
                      >
                        Unassign Team
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <div className="button-container">
                <button
                  className="control-button"
                  onClick={() => setShowEditForm(true)}
                >
                  Edit Details
                </button>
                <button className="control-button" onClick={deleteEmp}>
                  Delete Employee
                </button>
              </div>
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetails;
