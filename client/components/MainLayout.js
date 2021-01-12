import Link from "next/link";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import "bootstrap/dist/css/bootstrap.min.css";

export function MainLayout({ children }) {
  const [session, loading] = useSession();

  return (
    <>
      <div className="container">
        <div className="row  align-center justify-content-between">
          <nav className="col-sm-12 col-md-7 d-flex justify-content-between">
            <Link href="/">
              <a className="btn btn-outline-success">Home</a>
            </Link>
            <Link href="/request">
              <a className="btn btn-outline-success">Request</a>
            </Link>
            <Link href="/bid">
              <a className="btn btn-outline-success">Bids</a>
            </Link>
            <Link href="/user">
              <a className="btn btn-outline-success">User</a>
            </Link>
          </nav>
          <div className="col-sm-12 col-md-5 ">
            {!session && (
              <>
                Not signed in
                <button onClick={signIn}>Sign in</button>
                <Link href="/singUp">
                  <a>Sing Up</a>
                </Link>
              </>
            )}
            {session && (
              <>
                Signed in as {session.user.login}
                <button onClick={signOut}>Sign out</button>
              </>
            )}
          </div>
        </div>
      </div>
      <main>{children}</main>
    </>
  );
}
