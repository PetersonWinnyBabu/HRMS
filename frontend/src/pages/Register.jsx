import axios from "axios";
import { useState } from "react";
import "./pages.css";

const Register = () => {
  const [organisationName, setOrganisationName] = useState("");
  const [adminName, setAdminName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setShowpassword] = useState(false);

  const onFormSubmit = (e) => {
    e.preventDefault();
    const url = "https://hrms-backend-ke9s.onrender.com/api/auth/register";

    axios
      .post(url, {
        orgName: organisationName,
        adminName,
        email,
        password,
      })
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.message);
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <div className="background-main">
      <div className="register-form-container">
        <h1 className="heading-1">Register Organisation Form</h1>
        <form className="register-form" onSubmit={onFormSubmit}>
          <div className="form-inputs">
            <label className="label" htmlFor="orgname">
              Organisation Name
            </label>
            <input
              id="orgname"
              className="input-box"
              type="text"
              value={organisationName}
              onChange={(e) => setOrganisationName(e.target.value)}
            />
          </div>
          <div className="form-inputs">
            <label className="label" htmlFor="admin">
              Admin Name
            </label>
            <input
              id="admin"
              className="input-box"
              value={adminName}
              type="text"
              onChange={(e) => setAdminName(e.target.value)}
            />
          </div>
          <div className="form-inputs">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="input-box"
              value={email}
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-inputs">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="input-box"
              value={password}
              type={showpassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="label" htmlFor="checkbox">
              <input
                onChange={() => setShowpassword(!showpassword)}
                id="checkbox"
                className="checkbox"
                type="checkbox"
              />
              Show Password
            </label>
          </div>
          <button className="submit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
