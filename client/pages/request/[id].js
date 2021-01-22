import Head from "next/head";
import { MainLayout } from "../../components/MainLayout";
import  OpenRequestTable  from "../../components/OpenRequestTable";
import { useRouter } from 'next/router'
import { Button, Modal } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

export default function SingleRequest({ request, bids }) {
  return (
    <MainLayout>
      <div className="container mt-4">
        <h1>Request {request[0]._id}</h1>
        <div>
            {request[0].user.login}
            {Object.values(request[0].carElementMap)
            .map(el => (` ${el.carElement.name} - ${el.count}`))
            .join()}
            {request[0].openDate}
        </div>
        <h2>Bids</h2>
        <table className="table table-striped">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Car Elements</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Object.values(bids).map(bid => (
            <tr key={bid._id}>
              <td>{bid.user.login}</td>
                <td>
                  {bid.carElement.name}
                </td>
              <td>{bid.price}</td>
              <td> <Button variant="dark">Dark</Button></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </MainLayout>
  );
}

SingleRequest.getInitialProps = async (ctx) => {
  const resRequest = await fetch(`${process.env.API_URL}/request/${ctx.query.id}`);
  const jsonRequest = await resRequest.json();
  const resBid = await fetch(`${process.env.API_URL}/bid?requestId=${jsonRequest[0]._id}`);
  const jsonBid = await resBid.json();
  console.log(jsonBid)
  return { request: jsonRequest, bids: jsonBid };
};
