import React from 'react'
import styles from "./NewAccount.module.css"
const NewAccount = (props) => {
  return (
    <div className={styles.mainall}>
    <div className={styles.date}>{props.ndata.accountName}</div>
       <div className={styles.name}>{props.ndata.accountGroup}</div> <div className={styles.inex}>{props.ndata.balance} Rs.</div>
    </div>
  )
}

export default NewAccount;