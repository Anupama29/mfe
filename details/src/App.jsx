import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Details = ({ data }) =>
  data ? (
    <div>
      <div>Username: {data.username}</div>
      <div>Emailid: {data.email}</div>
    </div>
  ) : (
    "User not selected"
  );

export { Details };

export default () => {
  ReactDOM.render(<Details />, document.getElementById("app"));
};
