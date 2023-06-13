import React from "react";
import { Form } from "react-bootstrap";
import styles from "./Dropdown.module.css";
import Select, { components } from "react-select";

 
export default function Dropdown(props) {
  // console.log(props.options);
  return (
    <Form.Select
      aria-label="Default select example"
      className={styles.dropdown}
      onChange={props.handlechange}
      // styles={CustomStyle} 
      defaultValue="Cash"
    >
      {/* <option>Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option> */}

      options= {props.options.map((opt) => {
        return (
          <option description={opt} value={opt}>
            {opt}
          </option>
        );
      })}
      
    </Form.Select>
  );
}



