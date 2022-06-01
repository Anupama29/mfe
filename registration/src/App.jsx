import { TableBody, TextField } from "@mui/material";
import React, {useState} from "react";
import ReactDOM from "react-dom";

import employeeService from "../../services";
import "./index.css";

const FieldSet = ({ name, type, label, value, ...rest }) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <input type={type} name={name} id={name} value={value} {...rest} />
  </div>
);

const RegistrationPage = () => {
  const initialData = {
    email: "",
    username: "",
    password: "",
  };
  const [data, setData] = useState(initialData);

  function handleChange(e) {
    const { name, value } = e.target;
    setData((d) => ({ ...d, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    employeeService
      .add(data)
      .then(() => {
        setData(initialData);
        alert('Employee Added Successfully!');
      })
      .catch(e => {
        alert(e.message);
      })
  }

  return (
    <form onChange={handleChange} onSubmit={handleSubmit}>
      <table>
      <tr>username<TextField name="username" label="Username" value={data.username} /></tr>
      <tr>email<TextField name="email" type="email" label="Email" value={data.email} /></tr>
      <tr>password<TextField
        name="password"
        type="password"
        label="Password"
        value={data.password}
        autoComplete="new-password"
      /></tr>
      <tr><div>
        <button type="submit">
          Register
        </button>
      </div></tr>
      </table>
    </form>
  );
};

export { RegistrationPage };

export default () => {
  ReactDOM.render(<RegistrationPage />, document.getElementById("app"));
};
