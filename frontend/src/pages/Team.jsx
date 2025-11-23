import { useEffect, useState } from "react";
import "./pages.css";
import api from "../services/api";
import { Link } from "react-router-dom";
import TeamForm from "../components/TeamForm";
import Logout from "../components/logout.jsx";

const TeamListItem = (props) => {
  const { details } = props;
  const { id, name, description } = details;

  return (
    <Link className="link" to={`/teams/${id}`}>
      <li className="team-detail-item">
        <div>
          <h1 className="heading">{name}</h1>
          <h3>{description}</h3>
        </div>
      </li>
    </Link>
  );
};

const Team = () => {
  const [teamsDetails, setTeamsDetails] = useState([]);

  const [teamForm, setTeamForm] = useState(false);

  useEffect(() => {
    api
      .get("https://hrms-backend-ke9s.onrender.com/api/teams")
      .then((response) => {
        console.log(response);
        setTeamsDetails(response.data.response);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(teamsDetails);

  return (
    <div className="background-main">
      <Logout />
      <div className="employee-list-main">
        <h1 className="heading">Teams List</h1>
        <button
          className="submit-button"
          onClick={() => setTeamForm(!teamForm)}
        >
          {teamForm ? "Close" : "Create Team"}
        </button>
        {teamForm ? (
          <TeamForm />
        ) : (
          <ul className="employee-list">
            {teamsDetails.map((each) => (
              <TeamListItem details={each} key={each.id} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Team;
