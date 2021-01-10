import Link from "next/link";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/client";

export function MainLayout({ children }) {
  const [session, loading] = useSession();

  return (
    <>
      <div>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/request">
            <a>Request</a>
          </Link>
          <Link href="/bid">
            <a>Bids</a>
          </Link>
          <Link href="/user">
            <a>User</a>
          </Link>
        </nav>
        <div className="">
          {!session && (
            <>
              Not signed in <br />
              <button onClick={signIn}>Sign in</button>
              <Link href="/singUp">
                <a>Sing Up</a>
              </Link>
            </>
          )}
          {session && (
            <>
              Signed in as {session.user.login} <br />
              <button onClick={signOut}>Sign out</button>
            </>
          )}
        </div>
      </div>

      <main>{children}</main>
    </>
  );
}
