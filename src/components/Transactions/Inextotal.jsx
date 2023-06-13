import React, { useContext } from 'react'
import styles from './Inextotal.module.css'
// import { ExpenseContext } from '../Dashboard/Expense'/

const Inextotal = (props) => {
  // const totalexpense= useContext(ExpenseContext);
  // console.log(totalexpense);
  return (
    <div className = {styles.totalinex}>
      <table className={styles.table}>
        <tr>
          <td>Total Income</td>
          <td className={`${styles.positive} ${styles.mono}`}>{props.totalinc} RS.</td>
        </tr>
        <tr>
          <td>Total Expense</td>
          <td className={`${styles.negative} ${styles.mono}`}>-{props.totalexp} RS.</td>
        </tr>
      </table>
    </div>
  )
}

export default Inextotal



