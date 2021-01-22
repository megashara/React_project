import Link from "next/link";
import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

const propTypes = {
  user: PropTypes.object,
};

class OpenRequestTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: {},
    };
  }

  getOpenRequests = () => {
    let openRequests;
    axios
      .get(`${process.env.API_URL}/request`, {
        params: {
          onlyOpen: true,
        },
      })
      .then(function (response) {
        openRequests = response;
      })
      .catch(function (error) {
        console.log(error);
      });
    return Promise.resolve(openRequests ? openRequests : null);
  };

  componentWillMount() {
    let openRequests;
    axios
      .get(`${process.env.API_URL}/request`, {
        params: {
          onlyOpen: true,
        },
      })
      .then((response) => {
        openRequests = response;
        this.setState({
          requests: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getOpenRequests = () => {
    let openRequests;
    axios
      .get(`${process.env.API_URL}/request`, {
        params: {
          onlyOpen: true,
        },
        withCredentials: true,
      })
      .then(function (response) {
        openRequests = response;
      })
      .catch(function (error) {
        console.log(error);
      });
    return Promise.resolve(openRequests ? openRequests : null);
  };

  render() {
    const { requests } = this.state;

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Car Elements</th>
            <th>Open Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Object.values(requests).map(request => (
            <tr key={request._id}>
              <td>{request.user.login}</td>
                <td>
                  {Object.values(request.carElementMap)
                    .map(el => (` ${el.carElement.name} - ${el.count}`))
                    .join()}
                </td>
              <td>{request.openDate}</td>
              <td><Link href={'/request/'+request._id}><a>More info</a></Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

OpenRequestTable.displayName = "OpenRequestTable";

OpenRequestTable.propTypes = propTypes;


export default OpenRequestTable;
