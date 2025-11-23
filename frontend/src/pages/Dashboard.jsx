import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./pages.css";

const Dashboard = () => {
  const [details, setDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("http://localhost:5000/api/organisation")
      .then((response) => {
        setDetails(response.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(details);

  return (
    <div className="dashboard-main">
      <div className="dashboard-container">
        <h1 className="heading-1">HRMS Dashboard</h1>
        <h2 className="heading">{details.orgName}</h2>

        <h3>Welcome {details.userName}</h3>
        <div className="stats-container">
          <div className="stats-card">
            <h1 className="heading">Teams</h1>
            <h3 className="sub-heading">{details.teamCount}</h3>
          </div>
          <div className="stats-card">
            <h1 className="heading">Employees</h1>
            <h3 className="sub-heading">{details.employeesCount}</h3>
          </div>
        </div>

        <div className="teams-container">
          <button
            className="dashboard-card submit-button"
            onClick={() => navigate("/employees")}
          >
            <h3>Employees</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23.828"
              height="14.769"
            >
              <path d="m13.616 2.828 2.585 2.586H0v4h16.143l-2.527 2.526 2.828 2.829 7.384-7.384L16.444 0l-2.828 2.828z" />
            </svg>
          </button>

          <button
            className="dashboard-card submit-button"
            onClick={() => navigate("/teams")}
          >
            <h3>Teams</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23.828"
              height="14.769"
            >
              <path d="m13.616 2.828 2.585 2.586H0v4h16.143l-2.527 2.526 2.828 2.829 7.384-7.384L16.444 0l-2.828 2.828z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
