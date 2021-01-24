import Head from "next/head";
import { MainLayout } from "../../components/MainLayout";
import React, { useState, useEffect } from 'react';
import  OpenRequestTable  from "../../components/OpenRequestTable";
import { useRouter } from 'next/router'
import { Button, Modal, Form } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default function SingleRequest({ request, bids }) {

  const [carElement, setCarElement] = useState("");
  const [price, setPrice] = useState("");
  const [showThanks, setShowThanks] = useState(false);
  const handleThanksClose = () => setShowThanks(false);
  const handleThanksShow = () => setShowThanks(true);

  const addBidInTable = (e) => {
    const userId = "5ff21cb1083f3048109e85ee";
    e.preventDefault();
    console.log(request[0]._id)
    axios.post(`${process.env.API_URL}/bid/`, {
      carElementId: carElement,
      price: price,
      userId: userId,
      requestId: request[0]._id,
    })
    .then(function (response) {
      handleThanksShow();
      setPrice("");
    })
    .catch(function (error) {
      console.log(error);
    });
  
  }

  return (
    <MainLayout>
      <div className="container mt-4">
        <h1>Request {request[0]._id}</h1>
        <div className="d-flex flex-column align-items-start">
            <h2>Client {request[0].user.login}</h2>
            <div>Car elements:</div>
            <ul>
              {request[0].carElementMap
              .map(el => <li>{el.carElement.name} - {el.count}</li>)
              }
            </ul>
            <div className="date">Created date: {request[0].openDate}</div>
        </div>
        <Form>
          <h2 className="mt-4">Offer bid</h2>
          {showThanks && 
            <div style={{"color":"green","fontSize":"30px"}}>Thanks for bid!!!</div>
          }
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Choose car element</Form.Label>
            <Form.Control as="select" onChange={e => {handleThanksClose();setCarElement(e.target.value)}} >
              <option selected disabled> </option>
              {request[0].carElementMap.map(el => <option key={el.carElement.name} value={el.carElement._id}>{el.carElement.name}</option>)}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Price</Form.Label>
            <Form.Control type="text" placeholder="1.00" value={price} onChange={e => {handleThanksClose(); setPrice(e.target.value)}}/>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={addBidInTable}>
            Add bit
          </Button>
        </Form>
        <h2 className="mt-4">Bids</h2>
        <table className="table table-striped mt-4">
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
  return { request: jsonRequest, bids: jsonBid };
};
