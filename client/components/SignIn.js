import { Modal, Form , Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import {useSessionHook} from "../hooks/useSessionHook";

export default function SignIn() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleErrorClose = () => setShowError(false);
  const handleErrorShow = () => setShowError(true);
  const [recipientID, setRecipientID] = useState("");
  let sessionHook = useSessionHook(recipientID);
  function validateForm() {
    return login.length > 0 && password.length > 0;
  }

  async function handleSubmit(credentials) {
    let user;
    console.log(credentials);
    await axios
      .get(`${process.env.API_URL}/user`, {
        params: {
          login: credentials.login,
          password: credentials.password,
        },
      })
      .then(function (response) {
        user = response;
      })
      .catch(function (error) {
        console.log(error);
      });
    return Promise.resolve(user ? user : null);
  }

  const onLoginSubmit = async e => {
    e.preventDefault();
    if (login && password) {
     let done = await handleSubmit({ login, password });
     if(!done){
      handleErrorShow();
      document.getElementById('login').style.borderColor = "red";
      document.getElementById('password').style.borderColor = "red";
     }else{
      setRecipientID(login);
      handleClose();
      handleErrorClose();
      setLogin("");
      setPassword("");
     }
    }

    
  };

  return (
    <>
      <Button variant="light" onClick={handleShow} className="ml-3">Sign Up</Button>
      <div className="modal fade" id="sign-up-form">
        <Modal show={show} onHide={handleClose} closeButton>
        <div className="popup-registration">
          <Modal.Header closeButton>
            <Modal.Title>Sign in</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={onLoginSubmit}>
              {showError && <div style={{color:"red"}}>
                Error!!<br/>
                User alredy exist!!!
              </div>}
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
                Sign in
              </Button>
            </Form>
          </Modal.Body>
        </div>
        </Modal>
      </div>
    </>
  );
}
