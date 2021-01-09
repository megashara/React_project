import Link from "next/link";

export function MainLayout({ children }) {
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
          <Link href="/login">
            <a>login</a>
          </Link>
        </div>
      </div>

      <main>{children}</main>
    </>
  );
}
