import { Modal, Form , Button } from 'react-bootstrap';
import { useState } from "react";
import axios from "axios";

export default function SignUp() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [showError, setShowError] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleThanksClose = () => setShowThanks(false);
  const handleThanksShow = () => setShowThanks(true);
  const handleErrorClose = () => setShowError(false);
  const handleErrorShow = () => setShowError(true);

  function validateForm() {
    return login.length > 0 && password.length > 0;
  }

  async function handleSubmit(cretation) {
    let res;
    await axios
      .post(`${process.env.API_URL}/user`, {
        login: cretation.login,
        password: cretation.password,
      })
      .then(function (response) {
        res = response;
      })
      .catch(function (error) {
        console.log(error);
      });
      return res;
  }

  const onLoginSubmit = async e => {
    e.preventDefault();
    if (login && password) {
     let done = await handleSubmit({ login, password });
     if(!done){
      handleErrorShow();
      document.getElementById('login').style.borderColor = "red";
     }else{
      handleClose();
      handleThanksShow();
      handleErrorClose();
      setLogin("");
      setPassword("");
      setTimeout(() => {
       handleThanksClose();
      }, 1500);
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
            <Modal.Title>Registration</Modal.Title>
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
                Sign Up
              </Button>
            </Form>
          </Modal.Body>
        </div>
        </Modal>
      </div>
      <Modal show={showThanks} onHide={handleThanksClose} backdrop="static" keyboard={false}>
        <Modal.Body>
          Thanks for registration!
        </Modal.Body>
      </Modal>
    </>
  );
}
