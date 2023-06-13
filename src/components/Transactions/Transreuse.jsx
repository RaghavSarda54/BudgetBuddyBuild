import React from 'react'
import styles from './Transreuse.module.css'
const Transreuse = (props) => {
  // console.log(props)
  return (
    <div className={styles.mainall}>
    <div className={styles.date}>{props.ndata.date}</div>
       <div className={styles.name}>{props.ndata.note}</div> <div className={styles.account}>{props.ndata.from}{props.ndata.primarykey==0?`->`:`<-`}{props.ndata.tags}</div> <div className={`${styles.inex} ${props.ndata.primarykey==0?styles.negative:styles.positive}`}>{props.ndata.amount} Rs.</div>
    </div>
  )
}

export default Transreuse