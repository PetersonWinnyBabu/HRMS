import React from "react";
import api from "../services/api";

const Logout = () => {
  const logout = async () => {
    await api
      .post("https://hrms-backend-ke9s.onrender.com/api/auth/logout", {
        logout: true,
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem("auth_token");
          window.location.reload();
        }
      })
      .catch((err) => {
        alert("Something went Wrong");
        console.log(err);
      });
  };
  return (
    <button className="submit-button" onClick={logout}>
      Logout
    </button>
  );
};

export default Logout;
