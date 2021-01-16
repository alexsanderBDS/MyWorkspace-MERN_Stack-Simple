import React, { useState } from "react";
import axios from "axios";

function CreateUser() {
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [exist, setExist] = useState("none");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get(process.env.REACT_APP_SERVER_USERS)
      .then((res) => {
        const data = res.data.find((url) => {
          return url.username === user;
        });

        if (data) {
          console.log("Already exists");
          setExist("block");
          throw new Error("Taken!");
        }
      })
      .catch(() => {
        console.log("None exist");
      });

    axios
      .post(process.env.REACT_APP_CREATE_NEW_USER, {
        name,
        user,
        text: `This page is for ${name}`,
      })
      .then(() => {
        alert("Data was send to server!");
        console.log("Okay");
        setName("");
        setUser("");
      })
      .catch((error) => {
        console.log(error);
        setName("");
        setUser("");
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        Admin Workspace | Create an user page
      </header>
      <section className="container">
        <form onSubmit={handleSubmit} className="admin-create">
          <div>
            <label>Name</label>
            <input
              type="text"
              onChange={({ target }) => setName(target.value)}
              placeholder="Provide an user name"
              required={true}
              value={name}
            />
            <label>Username</label>
            <input
              onChange={({ target }) => {
                setUser(target.value);
                setExist("none");
              }}
              placeholder="Provide a valid username"
              type="text"
              required={true}
              value={user}
            />
            <span className="message" style={{ display: exist }}>
              Already Taken!
            </span>
            <button>Create</button>
          </div>
        </form>
      </section>
      <footer>This the footer</footer>
    </div>
  );
}

export default CreateUser;
