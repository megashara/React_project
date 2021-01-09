import { MainLayout } from "../components/MainLayout";
import { useState } from "react";

export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  async function submitForm() {
    const res = await fetch(`${process.env.API_URL}/login`);
  }

  return (
    <MainLayout>
      <h1>login page</h1>
      <form>
        <input
          name="login"
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <br />
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button onClick={submitForm}>login in</button>
      </form>
    </MainLayout>
  );
}
