import React from "react";
import ReactDOM from "react-dom";

import employeeService from "../../services";
import "./index.css";


const List = ({ onItemSelect, onEmptyList }) => {
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    employeeService
      .findAll()
      .then(employees => {
        if (!employees.length) {
          onEmptyList()
        } else {
          setList(employees);
        }
      })
      .catch(() => {
        alert("Failed to load Employees!");
      });
  });

  return (
    <ul>
      {list.map((emp) => (
        // <li key={emp.id}>
          <button className="list-item" value ={emp.u} onClick={() => onItemSelect(emp)}>
            <span className="username">{emp.username}</span>
          </button>
        // </li>
      ))}
    </ul>
  );
};

export { List };

export default () => {
  ReactDOM.render(<List />, document.getElementById("app"));
};
