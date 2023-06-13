import React, { useEffect } from "react";
import styles from "./Savings.module.css";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Header from "../header/header";
import Navbar from "../navbar/navbar";
import { useState } from "react";
import Account_form from "./Account_form";
import NewAccount from "./NewAccount";
import accdata from "./test.json";
import Accounts from "../Dashboard/Accounts";

const Savings = () => {
  const [data,setdata]= useState([]);
  const [show,setshow]= useState(false);
  const togglestate= ()=>{
    setshow(false);
  }
  const setstate= ()=>{
    setshow(true);
  }
  useEffect(()=>{
    async function fetchData(){
      const response= await fetch("/api/accounts",{ headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       },
      //  body:JSON.stringify({id:"4"})
    });
      // console.log(response);
      const resp= await response.json();
      setdata(resp);
      console.log(data);
    }
    fetchData();
    
    // setdata(accdata);
  },[show]);
  return (
    <>
      <Header></Header>
      <Navbar>
      <div className={styles.transmain}>
        <div className={styles.addnew}>
          <button className={styles.new} onClick={setstate}>
            <span className={styles.plus}><AddBoxIcon /></span>
            New
          </button>
          </div>
          {/* {data.map((acc) => <NewAccount ndata={acc} />)} */}
          <Accounts refresh= {show} show={false}/>
        </div>
        
      </Navbar>
      {show && <Account_form togglestate={togglestate} />}
      {/* {show && <Accounts />} */}
    </>
  )
}

export default Savings;