import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TeamForm from "../components/TeamForm.jsx";
import api from "../services/api";
import "./pages.css";
import AssignEmployee from "../components/AssignEmployee.jsx";

const TeamDetailEmployeeListItem = (props) => {
  const { details, unAssignEmployee } = props;
  const { id } = details;

  return (
    <li className="team-detail-item">
      <div className="team-detail">
        <h2 className="sub-heading">Employee Id : {details.id}</h2>
        <h2 className="sub-heading">
          Name : {details.first_name + " " + details.last_name}
        </h2>
        <p className="para1">Email : {details.email}</p>
        <p className="para1">Phone : {details.phone}</p>
      </div>

      <button className="submit-button" onClick={() => unAssignEmployee(id)}>
        Unassign Employee
      </button>
    </li>
  );
};

const TeamDetails = () => {
  const [teamDetails, setTeamDetails] = useState({});
  const [teamEmployeeDetails, setTeamEmployeeDetails] = useState([]);
  const { id } = useParams();
  const [showEditForm, setShowEditForm] = useState(false);
  const [showEmployeeList, setShowEmployeeList] = useState(false);

  const navigate = useNavigate();

  const assignDetails = (response) => {
    setTeamDetails(response.team_details);
    setTeamEmployeeDetails(response.employee_details);
  };

  useEffect(() => {
    api
      .get(`http://localhost:5000/api/teams/${id}`)
      .then((response) => {
        console.log(response);
        assignDetails(response.data.response);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const deleteTeam = async () => {
    await api
      .delete(`http://localhost:5000/api/teams/${id}`)
      .then((response) => {
        if (response.status === 200) {
          alert(`Successfully Deleted Team ${id}`);
          navigate("/teams");
        }
      })
      .catch((err) => console.log(err));
  };

  const unAssignEmployee = async (empId) => {
    await api
      .delete(`http://localhost:5000/api/teams/${id}/unassign`, {
        data: { employee_id: empId, team_id: id },
      })
      .then((response) => {
        alert(response.data.message);
        window.location.reload(false);
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
          <TeamForm formType="edit" id={id} />
        </>
      ) : (
        <div className="dashboard-container">
          <h1 className="heading">Team Details</h1>
          <div className="employeeDesc">
            <h1 className="sub-heading">Team Name: {teamDetails.name}</h1>
            <h1 className="sub-heading">
              Description: {teamDetails.description}
            </h1>
          </div>
          {showEmployeeList ? (
            <AssignEmployee
              setShowEmployeeList={setShowEmployeeList}
             
            />
          ) : (
            <>
              <h1 className="heading">Employees</h1>
              <div className="employee-teams-list">
                {teamEmployeeDetails.length === 0 ? (
                  <div className="container-assign">
                    <h1>No Employees Assigned</h1>
                    <button
                      className="submit-button "
                      onClick={() => setShowEmployeeList(!showEmployeeList)}
                    >
                      Assign Employees
                    </button>
                  </div>
                ) : (
                  <ul className="teams-list">
                    {teamEmployeeDetails.map((each) => (
                      <TeamDetailEmployeeListItem
                        details={each}
                        key={each.id}
                        unAssignEmployee={unAssignEmployee}
                      />
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
                  <button className="control-button" onClick={deleteTeam}>
                    Delete Team
                  </button>
                  <button
                    className="control-button"
                    onClick={() => setShowEmployeeList(!showEmployeeList)}
                  >
                    Assign Employees
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TeamDetails;
