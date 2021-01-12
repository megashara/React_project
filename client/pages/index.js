import Head from "next/head";
import { MainLayout } from "../components/MainLayout";
import OpenRequestTable from "../components/OpenRequestTable";

export default function Home({ requests }) {
  return (
    <MainLayout>
      <h1>Home</h1>
      <OpenRequestTable />
    </MainLayout>
  );
}

Request.getInitialProps = async (ctx) => {
  const res = await fetch(`${process.env.API_URL}/request`);
  const json = await res.json();
  console.log(json);
  return { requests: json };
};
