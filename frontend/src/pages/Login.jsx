import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./pages.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setShowPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onSuccess = (token) => {
    localStorage.setItem("auth_token", token);
    navigate("/dashboard", { replace: true });
  };

  const onFailure = (err) => {
    setError(err);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const url = "https://hrms-backend-ke9s.onrender.com/api/auth/login";

    axios
      .post(url, {
        email,
        password,
      })
      .then((response) => {
        console.log(response);
        onSuccess(response.data.auth_token);
      })
      .catch((err) => {
        console.log(err);
        onFailure(err.response.data.message);
      });
  };
  const returnDashboard = () => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      return navigate("/dashboard", { replace: true });
    }
  };

  useEffect(() => {
    returnDashboard();
  }, );

  return (
    <div className="background-main">
      <div className="login-container-main">
        <img className="image-main" src="hrmanagement.jpg" alt="hrms" />

        <div className="login-form-container">
          <h1 className="heading">Human Resourse Management System</h1>

          <h3>Login</h3>

          <form className="login-form" onSubmit={onFormSubmit}>
            <div className="form-inputs">
              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className="input-box"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
              />
            </div>
            <div className="form-inputs">
              <label className="label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                className="input-box"
                type={showpassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
              />
            </div>
            <div className="form-inputs">
              <label className="label">
                <input
                  className="checkbox"
                  type="checkbox"
                  onChange={() => setShowPassword(!showpassword)}
                />
                Show Password
              </label>
            </div>

            <button className="submit-button" type="submit">
              Login
            </button>
          </form>
          {error && <p className="error-msg">{error}</p>}
          <p className="para1">
            Not Registered ? <a href="/register"> Register Here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
