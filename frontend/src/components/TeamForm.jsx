import { useState } from "react";
import api from "../services/api";
import "../pages/pages.css";
const TeamForm = (props) => {
  const { formType, id } = props;
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");

  let url = "";

  if (formType === "edit") {
    url = `https://hrms-backend-ke9s.onrender.com/api/teams/${id}`;
  } else {
    url = "https://hrms-backend-ke9s.onrender.com/api/teams";
  }

  const onSuccess = (data) => {
    if (formType === "edit") {
      alert(data.message);
      setTeamName("");
      setDescription("");
      window.location.reload(false);
    } else {
      alert(data.message);
      window.location.reload(false);
    }
  };

  const onFailure = (err) => {
    console.log(err);
    alert(err.response.data.message);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (formType === "edit") {
      api
        .put(url, {
          name: teamName,
          description,
        })
        .then((response) => onSuccess(response.data))
        .catch((err) => onFailure(err));
    } else {
      await api
        .post(url, {
          name: teamName,
          description,
        })
        .then((response) => {
          onSuccess(response.data);
          console.log(response);
        })
        .catch((err) => onFailure(err));
    }
  };

  return (
    <div className="form-container">
      <h1 className="heading">
        {formType === "edit" ? "Edit" : "Create"} Team
      </h1>
      <form className="employee-form" onSubmit={onFormSubmit}>
        <div className="employee-form-inputs">
          <label className="label" htmlFor="teamName">
            Team Name
          </label>
          <input
            id="teamName"
            className="input-box"
            value={teamName}
            onChange={(e) => {
              setTeamName(e.target.value);
            }}
          />
        </div>
        <div className="employee-form-inputs">
          <label className="label" htmlFor="description">
            Description
          </label>
          <input
            id="description"
            className="input-box"
            type="text"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>

        <button className="submit-button" type="submit">
          {formType === "edit" ? "Edit" : "Create"} Team
        </button>
      </form>
    </div>
  );
};

export default TeamForm;
