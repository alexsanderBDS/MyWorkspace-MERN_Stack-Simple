import React, { useState, useEffect, useContext } from "react";
import Users from "./pages/Users";
import CreateUser from "./pages/components/CreateUser";
import ErrorPage from "./pages/components/ErrorPage";
import { Route, Switch } from "react-router-dom";
import { UserContext } from "./pages/context/userContext";
import "./App.css";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    axios.get(process.env.REACT_APP_SERVER_USERS).then((res) => {
      setUsers(res.data);
      dispatch({
        type: "GET_USERS",
        payload: res.data,
      });
    });
  }, [dispatch]);

  return (
    <Switch>
      <Route exact path="/" component={CreateUser} />
      {users.map((data, i) => {
        return (
          <Route key={i} exact path={`/${data.username}`} component={Users} />
        );
      })}
      <Route exact path="/*" component={ErrorPage} />
    </Switch>
  );
}

export default App;
