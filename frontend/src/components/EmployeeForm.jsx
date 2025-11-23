import { useState } from "react";
import api from "../services/api";


const EmployeeForm = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  let url = "";

  const { formType, id } = props;
  if (formType === "edit") {
    url = `http://localhost:5000/api/employees/${id}`;
  } else {
    url = "http://localhost:5000/api/employees";
  }

  console.log(url);

  const onSuccess = (data) => {
    alert(data.message);
    setEmail("");
    setFirstName("");
    setLastName("");
    setPhone("");
    window.location.reload(false);
  };

  const onFailure = (err) => {
    console.log(err);
    alert(err.response.data.message);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    if (formType === "edit") {
      api
        .put(url, {
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
        })
        .then((response) => onSuccess(response.data))
        .catch((err) => onFailure(err));
    } else {
      api
        .post(url, {
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
        })
        .then((response) => onSuccess(response.data))
        .catch((err) => onFailure(err));
    }
  };

  return (
    <div className="form-container">
      <h1 className="heading">
        {formType === "edit" ? "Edit" : "Add"} Employee Form
      </h1>
      <form className="employee-form" onSubmit={onFormSubmit}>
        <div className="employee-form-inputs">
          <label className="label" htmlFor="firstName">
            First Name
          </label>
          <input
            id="firstName"
            className="input-box"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </div>
        <div className="employee-form-inputs">
          <label className="label" htmlFor="lastName">
            Last Name
          </label>
          <input
            id="lastName"
            className="input-box"
            type="text"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>

        <div className="employee-form-inputs">
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            value={email}
            className="input-box"
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className="employee-form-inputs">
          <label className="label" htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            value={phone}
            className="input-box"
            type="text"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </div>

        <button className="submit-button" type="submit">
          {formType === "edit" ? "Edit" : "Add"} Employee
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
