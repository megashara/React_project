import { MainLayout } from "./MainLayout";
import FetchService from "../services/FetchService.js";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import axios from "axios";

export default function SignUp() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return login.length > 0 && password.length > 0;
  }

  async function handleSubmit(cretation) {
    await axios
      .post(`${process.env.API_URL}/user`, {
        login: cretation.login,
        password: cretation.password,
      })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const onLoginSubmit = (e) => {
    e.preventDefault();
    console.log("32");
    if (login && password) {
      handleSubmit({ login, password });
    }
  };

  return (
    <div className="popup-registration" 
      style={{position: 'absolute', width: '400px', top: '100px', left:'50%', 'marginLeft': '-200px', 'zIndex': '10'}}>
      <h3>Registration</h3>
      <div className="Login">
        <Form onSubmit={onLoginSubmit}>
          <Form.Group size="lg" controlId="login">
            <Form.Label>login</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={login}
              onChange={e => setLogin(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button block size="lg" type="submit" disabled={!validateForm()}>
            Sign Up
          </Button>
        </Form>
      </div>
    </div>
  );
}
