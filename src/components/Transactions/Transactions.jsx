import React from "react";
import styles from "./Transactions.module.css";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Header from "../header/header";
import Navbar from "../navbar/navbar";
import Transreuse from "./Transreuse";
import Inextotal from "./Inextotal";
import TransactionModal from "./TransactionModal";
import { useState } from "react";
import { useEffect } from "react";
const Transactions = () => {
  const [show,setshow]= useState(false);
  const [alltrans,setalltrans]= useState([]);
  const [totalincome,settotalincome]= useState(0.00);
  const [totalexpense,settotalexpense]= useState(0.00);

  // const togglestate= ()=>{
  //   setshow(false);
  // }
  // const setstate= ()=>{
  //   setshow(true);
  // }
  const setexp= (amount)=>{
    const namount= parseFloat(totalexpense)+parseFloat(amount);
    settotalexpense(namount);
  }
  const setinc= (amount)=>{
    const namount= parseFloat(totalincome)+parseFloat(amount);
    settotalincome(namount);
  }
  useEffect(()=>{
    async function fetchData(){
      const response= await fetch("/api/transactions",{ headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       },
      //  body:JSON.stringify({id:"4"})
    });
      // console.log(response);
      const resp= await response.json();
      setalltrans(resp.IncExpArray);
      settotalexpense(resp.totalExpense);
      settotalincome(resp.totalIncome);
      // console.log(alltrans);
    }
    fetchData();
  }, [show]);
  return (
    <>
      <Header></Header>
      <Navbar>
        <div className={styles.transmain}>
          <div className={styles.addnew}>
            <button
              className={styles.new}
              onClick={() => {
                setshow(true);
              }}
            >
              <span className={styles.plus}>
                <AddBoxIcon />
              </span>
              New
            </button>
          </div>
          <div className={styles.transaction_list}>
            {/* <Transreuse Date="31/05/23" Name="Party" inexval="1900" from="Alice" to="Bob" />

          <Transreuse Date="23/04/23" Name="Shopping" inexval="35" from="Alice" to="Bob"/>
          <Transreuse Date="23/04/23" Name="Shopping" inexval="345" from="Alice" to="Bob" />
          <Transreuse Date="23/04/23" Name="Salon" inexval="321" from="Alice" to="Bob"/>
          <Transreuse Date="23/04/23" Name="Shopping" inexval="345" from="Alice" to="Bob" />
          <Transreuse Date="23/04/23" Name="Playing" inexval="345" from="Alice" to="Bob"/>
          <Transreuse Date="23/04/23" Name="Shopping" inexval="345" from="Alice" to="Bob"/>
          <Transreuse Date="23/04/23" Name="Shopping" inexval="345" from="Alice" to="Bob"/> */}
            {alltrans.map((data) => (
              <Transreuse ndata={data} />
            ))}
          </div>
          {/* {if(data.primarykey===0){settotalexpense(totalexpense+data.amount)} else {settotalincome(totalincome+data.amount)} */}
          <div className={styles.transaction_footer}>
          <Inextotal totalexp={totalexpense} totalinc= {totalincome}/>
          </div>
        </div>
      </Navbar>
      {show && <TransactionModal togglestate={()=>{
    setshow(false);
  }} setexp={setexp} setinc={setinc}/>}
    </>
  );
};

export default Transactions;
