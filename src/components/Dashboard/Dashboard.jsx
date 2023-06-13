import React from "react";
import Header from "../header/header";
import Navbar from "../navbar/navbar";
import styles from "./dashboard.module.css";
import Dropdown from "./Dropdown";
import Custom from "./custom";
import { useState } from "react";
import Expense from "./Expense";
import Income from "./Income";
import Investment from "./Investment";
import RecentTrans from "./RecentTrans";
import { useContext } from "react";
import { TransContext } from "../../App";
import { Clickcontext } from "../../App";
import { useEffect } from "react";
import Accounts from "./Accounts";
const Dashboard = () => {
    const [toggleState, setToggleState] = useState(1);
    const [alltrans,setclick,setrefresh]= useContext(TransContext);
  useEffect(()=>{
    setrefresh();
  },[])
    // setrefresh();
  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <>
      <Header></Header>
      <Navbar>
        <div className={styles.row}>
          <div className={styles.row1}>
            <Accounts show= {true} click={setclick}/>
            </div>
          <div className={styles.row2}>
            <h4>NEW TRANSACTION</h4>
            <div className={styles.item_menu}>
              <a  className={toggleState === 1 ? styles.item_menu_a_active : styles.item_menu_a}onClick={() => toggleTab(1)}>
                Expenses
              </a>
              <a  className={toggleState === 2 ? styles.item_menu_a_active : styles.item_menu_a} onClick={() => toggleTab(2)}>
                Income
              </a>
              <a className={toggleState === 3 ? styles.item_menu_a_active : styles.item_menu_a} onClick={() => toggleTab(3)}>
                Investments
              </a>
            </div>
            <Expense state={toggleState} click={setclick}/>
            <Income state={toggleState} click={setclick}/>
            {/* <Investment state={toggleState} /> */}
            {alltrans.length>0&&<div style={{paddingTop: "20px"}}><h3>Recent Transactions</h3><RecentTrans trans={alltrans}></RecentTrans></div>}
          </div>
        </div>
      </Navbar>
    </>
  );
};

export default Dashboard;
