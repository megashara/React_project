import Link from "next/link";
import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import SignUp from "./SignUp.js";
import { Button, Modal } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

export function MainLayout({ children }) {
  const [session, loading] = useSession();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <header className="p-3" style={{'background':'#4284D3'}}>
      <div className="container">
        <div className="row align-center justify-content-between">
          <nav className="col-sm-12 col-md-7 d-flex justify-content-between">
            <Link href="/">
              <a className="btn btn-outline-light col-2">Home</a>
            </Link>
            <Link href="/request">
              <a className="btn btn-outline-light col-2">Request</a>
            </Link>
            <Link href="/bid">
              <a className="btn btn-outline-light col-2">Bids</a>
            </Link>
            <Link href="/balance">
              <a className="btn btn-outline-light col-2">Balance</a>
            </Link>
          </nav>
          <div className="col-sm-12 col-md-5 d-flex justify-content-end">
            {!session && (
              <>
                <Button onClick={signIn} variant="light">Sign in</Button>
                <Button variant="light" onClick={handleShow} className="ml-3">Sign Up</Button>
                {/* <Link href="/signUp">
                  <a className="btn btn-light ml-3">Sing Up</a>
                </Link> */}
              </>
            )}
            {session && (
              <>
                {session.user.login}
                <Button onClick={signOut} className="btn btn-light">Sign out</Button>
              </>
            )}
          </div>
        </div>
      </div>
      </header>
      <div className="modal fade" id="sign-up-form">
        <Modal show={show} onHide={handleClose}>
          <SignUp />
        </Modal>
      </div>

      <main>{children}</main>
    </>
  );
} 
