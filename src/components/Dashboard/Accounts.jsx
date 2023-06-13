import React from 'react'
import styles from "./dashboard.module.css";
import Cash from './cash';
import Bank from './Bank';
import Credit from './Credit';
import { useEffect } from 'react';
import { useState } from 'react';
const Accounts = (props) => {
    // console.log("came");
    const [data,setdata]= useState();
    useEffect(()=>{
        
        async function fetchData(){
            const response= await fetch("/api/accounts",{ headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               },
            });
            const resp= await response.json();
            console.log(resp);
            setdata(resp);
            console.log(data);
        }
        
        fetchData();
    },[props.refresh,props.click]);
  return (
    <>
        {props.show && <div className={styles.worth_header}>
              <div className={styles.worth_heading}>
                <h4>NET WORTH</h4>
              </div>
              <div className={styles.net_worth}>
                <span className={`${styles.income_value} ${styles.positive}`}>
                  {data&& data.TotalCash+data.TotalBank+data.TotalCredit}Rs.
                </span>
              </div>
            </div>}
            <div className={styles.section__body}>
              <div className={styles.account_widget}>
                { data&&data.CashArray.length>0&&<Cash ndata={data.CashArray} total={data.TotalCash}/>}
                { data&&data.BankArray.length>0&&<Bank ndata={data.BankArray} total={data.TotalBank}/>}
                {data&&data.CreditArray.length>0&&<Credit ndata={data.CreditArray} total={data.TotalCredit}/>}
              </div>
            </div>
            </>
  );
}

export default Accounts;