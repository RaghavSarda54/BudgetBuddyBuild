import React, { useState } from 'react'
import Transreuse from '../Transactions/Transreuse'
const RecentTrans = (props) => {
    const num=0;
    // console.log(props.trans);
  return (
    <div style={{border: "1px solid #d4d4d5"}}>
        {[...props.trans].reverse().slice(0,5).map((data)=><Transreuse ndata={data}></Transreuse>)}
        
    </div>
  )
}

export default RecentTrans