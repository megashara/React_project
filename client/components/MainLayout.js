import Link from "next/link";
import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import SignUp from "./SignUp.js";
import SignIn from "./SignIn.js";
import { Button, Modal } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import {useSessionHook} from "../hooks/useSessionHook";

export function MainLayout({ children }) {
  const [session, loading] = useSession();

  console.log('main = ' + useSessionHook());

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
                {/* <Button onClick={signIn} variant="light">Sign in</Button> */}
                <SignIn />
                <SignUp />
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
      <main>{children}</main>
    </>
  );
} 
