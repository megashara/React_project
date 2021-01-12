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
        console.log(response);
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
        console.log(response);
        openRequests = response;
        this.setState({
          requests: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    //return openRequests;
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
        console.log(response);
        openRequests = response;
      })
      .catch(function (error) {
        console.log(error);
      });
    return Promise.resolve(openRequests ? openRequests : null);
  };

  render() {
    const { requests } = this.state;
    console.log(requests);

    return (
      <table className="table">
        <thead></thead>
        <tbody>
          {Object.keys(requests).map((item) => (
            <tr key={requests[item]._id}>
              <td>{requests[item].user.login}</td>
              <td>{requests[item].user.login}</td>
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
