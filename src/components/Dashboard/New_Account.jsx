import React from 'react'
import styles from "./dashboard.module.css";
const New_Account = (props) => {
  return (
    <>
    <div className={styles.account_widget_account}>
                    <div className={styles.account_widget_account__name}>
                      <a href="/transactions/A1505887770863">{props.ndata.accountName}</a>
                    </div>
                    <div className={styles.account_widget_account__balance}>
                      <span className={`${styles.mono} ${styles.positive}`}>{props.ndata.balance} Rs.</span>
                    </div>
                  </div>
    </>
  )
}

export default New_Account