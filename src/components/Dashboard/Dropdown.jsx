import React from "react";
import { Form } from "react-bootstrap";
import styles from "./Dropdown.module.css";
import Select, { components } from "react-select";

const CustomStyle = {
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? "rgba(0,0,0,0.3)" : "rgba(0,0,1,0)",
    ':active': {
      backgroundColor: state.isSelected ? "rgba(0,1,0,0)" : "rgba(1,0,0,0)"
    }
  })
}

const myOption = ({accountName,accountGroup,balance}) => {
   return (
    // <components.myOption {...props}>
       <div role="option" aria-checked="true" aria-selected="true" className={styles.item} >
      <span className={styles.description}>{accountName}</span>
      <span className={styles.right}>{accountGroup}</span>
      </div>
      // </components.myOption>
   );
 };
 
const Dropdown= React.forwardRef((props)=> {
  // console.log(props.options);
  return (
    <Select
      aria-label="Default select example"
      className={styles.dropdown}
      onChange={(option)=>props.handlechange(option.accountName+"("+option.accountGroup+")")}
      // value={getOptionValue(option){option.accountName}}
      // components= {{ Option: myOption }}
      value= {props.value}
      formatOptionLabel={myOption}
      options= {props.options}
      getOptionValue={(option) => option._id}
      // styles={CustomStyle} 
      // defaultValue={{label: props.options[0].accountName, value: props.options[0].accountGroup }}
    >
      {/* <option>Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option> */}

      {/* options= {props.options.map((opt) => {
        return (
          <option description={opt[1]} value={opt}>
            <div className={styles.optiondiv}>
              <span>{opt[0]}</span>
              <span className={styles.right}>{opt[1]}</span>
            </div>
          // </option>
        );
      })} */}
      
    </Select>
  );
})
export default Dropdown

