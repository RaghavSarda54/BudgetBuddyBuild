import React from 'react'
import Expense from '../Dashboard/Expense';
import Income from '../Dashboard/Income';
import Investment from '../Dashboard/Investment';
import { useState } from 'react';
import styles from "../Dashboard/dashboard.module.css";
import styles1 from "../savings/Account_form.module.css"
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';
const TransactionModal = (props) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => { //cleanup
      document.body.style.overflowY = "scroll";
    };
  }, []);
    const [toggleState, setToggleState] = useState(1);
    

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const close=()=>{
    props.togglestate();
  }
  return (
    <>
    <div className={styles1.account_form}>
    <div className={styles1.account_form_inside}>
        <button className={styles1.icon} onClick={props.togglestate}><CloseIcon  /></button>
    <div className={styles1.header}>
        <InsertDriveFileIcon />
        <h4>New Transaction</h4>
    </div>
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
            <Expense state={toggleState} myclose={close} setexp={props.setexp} />
            <Income state={toggleState} myclose={close} setinc={props.setinc}/>
            <Investment state={toggleState} />
            </div>
            </div>
            </>
  )
}

export default TransactionModal