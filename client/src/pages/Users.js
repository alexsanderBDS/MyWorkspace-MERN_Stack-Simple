import React, { useContext } from "react";
import { UserContext } from "./context/userContext";

const Users = () => {
  const username = window.location.pathname.replace("/", "").trim();
  const { state } = useContext(UserContext);

  const handleLink = () => {
    window.open(process.env.REACT_APP_DEEPLINK_FIREBASE);
  };

  const { users } = state;

  const response = users
    ? users.find((res) => {
        return res.username === username;
      })
    : "";

  return (
    <div>
      <h1>{response ? response.text : "Error Page!"}</h1>
      <button onClick={handleLink}>Share</button>
    </div>
  );
};

export default Users;
