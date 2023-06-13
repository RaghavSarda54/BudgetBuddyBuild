import React from 'react'
import styles from "./dashboard.module.css";
import New_Account from './New_Account';
const Credit = (props) => {
  return (
    
    <>
    <div className={styles.account_widget_group}>
                  <div className={styles.account_widget_group__header}>
                    <span className={styles.account_widget_group__name}>Credit</span>
                    <span className={styles.account_widget_group__total}>
                      <span className={`${styles.mono} ${styles.positive}`}>{props.total} Rs.</span>
                    </span>
                  </div>
                  {props.ndata.map((data)=> <New_Account ndata={data}/>)}
                </div></>
  )
}

export default Credit