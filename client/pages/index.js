import Head from "next/head";
import { MainLayout } from "../components/MainLayout";
import OpenRequestTable from "../components/OpenRequestTable";


export default function Home({ requests }) {
  return (
    <MainLayout>
      <div className="container mt-4">
        <h3>Open Requests</h3>
        <OpenRequestTable />
      </div>
    </MainLayout>
  );
}

Request.getInitialProps = async (ctx) => {
  const res = await fetch(`${process.env.API_URL}/request?id=`);
  const json = await res.json();
  return { requests: json };
};
