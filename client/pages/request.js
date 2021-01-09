import Head from "next/head";
import { MainLayout } from "../components/MainLayout";

export default function Request({ requests }) {
  return (
    <MainLayout>
      Page all Requests
      <br />
      {Object.keys(requests).map((item) => (
        <div key={requests[item]._id} className="card-panel">
          {requests[item].userId}
        </div>
      ))}
    </MainLayout>
  );
}

Request.getInitialProps = async (ctx) => {
  const res = await fetch(`${process.env.API_URL}/request`);
  const json = await res.json();
  console.log(json);
  return { requests: json };
};
