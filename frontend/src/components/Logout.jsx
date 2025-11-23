import React from "react";

const Logout = () => {
  const logout = () => {
    localStorage.setItem("auth_token", "");
    window.location.reload();
  };
  return (
    <button className="submit-button" onClick={logout}>
      Logout
    </button>
  );
};

export default Logout;
