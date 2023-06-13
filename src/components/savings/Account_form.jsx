import React, { useEffect } from "react";
import Dropdown2 from "../Dashboard/Dropdown2";
import styles from "./Account_form.module.css";

// import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
// import CloseIcon from "@mui/icons-material/Close";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { log } from "util";
import { message } from "antd";

const Account_form = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  const [account, setaccount] = useState("");
  const [balance, setbalance] = useState("");
  const [group, setgroup] = useState("Cash");
  const [message,setmessage]= useState("");
  const handle_account = (e) => {
    setaccount(e.target.value);
  };
  const handlebalance = (e) => {
    setbalance(e.target.value);
  };

  const handlegroup = (e) => {
    setgroup(e.target.value);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    if(account===""||group===""||balance===""){
      setmessage("*All Fields are mandatory");
      return;
    }
    const naccount = {
      id:"4",
      account_name: account,
      account_group: group,
      account_balance: parseFloat(balance),
    };
    console.log(naccount);
    const res = await fetch("/api/accounts", {
      //from savings to /api/accounts done
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(naccount),
    });
    props.togglestate();
  };
  return (
    <div className={styles.account_form}>
      <div className={styles.account_form_inside}>
        <div className={styles.addnew}>
          <button className={styles.icon} onClick={props.togglestate}>
            <CloseIcon />
          </button>
        </div>
        <div className={styles.header}>
          <InsertDriveFileIcon />
          <h4>New Account</h4>
        </div>
        <div className={styles.content}>
          <form>
            <p className={styles.warning}>{message}</p>
            <div className={styles.fields}>
              <div className={styles.label_field}>
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  name="Name"
                  required="true"
                  className={styles.my_input}
                  placeholder="Account Name"
                  onChange={handle_account}
                />
              </div>
              <div className={styles.label_field}>
                <div>
                  <label htmlFor="">From</label>
                  <Dropdown2 handlechange={handlegroup} options={["Cash","Bank","Credit"]}></Dropdown2>
                </div>
                <div className={styles.input}>
                  <input
                    required
                    min="0.01"
                    step="0.01"
                    type="number"
                    className={styles.my_input}
                    placeholder="Balance"
                    onChange={handlebalance}
                  />
                  <div className={styles.smalldrop}>INR</div>
                </div>
                <div className={styles.add_expense}>
                  <button
                    className={styles.add_expense_button}
                    onClick={handlesubmit}
                  >
                    Add Account
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// const handlesubmit= async(e)=>{
//   e.preventDefault();
//   const naccount= {
//     id:"4",
//     account_name:account,
//       account_group:group,
//       account_balance:balance
//   }
//   console.log(JSON.stringify(naccount));
//   const res= await fetch("/api/accounts",{
//     method: "POST",
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(naccount)
//   })

//   const data= await res.json();
//   console.log(data);
//   props.togglestate();

// }
//   return (
//     <div>
//     <div className={styles.account_form}>
//     <div className={styles.account_form_inside}>
//         <button className={styles.icon} onClick={props.togglestate}><CloseIcon  /></button>
//     <div className={styles.header}>
//         <InsertDriveFileIcon />
//         <h4>New Account</h4>
//     </div>
//     <div className={styles.content}>
//               <form method="POST" >
//                 <div className={styles.fields}>
//                   <div className={styles.label_field}>
//                     <label htmlFor="">Name</label>
//                     <input type="text" name="Name" required="true" className={styles.my_input} placeholder='Account Name' onChange={handle_account}/>
//                   </div>
//                   <div className={styles.label_field}>
//                     <div>
//                     <label htmlFor="">From</label>
//                     <Dropdown handlechange={handlegroup}></Dropdown>
//                   </div>
//                   <div className={styles.input}>
//                     <input
//                       required
//                       min="0.01"
//                       step="0.01"
//                       type="number"
//                       className={styles.my_input}
//                       placeholder='Balance'
//                       onChange={handlebalance}
//                     />
//                     <div className={styles.smalldrop}>
//                       INR
//                     </div>
//                   </div>
//                     <div className={styles.add_expense}>
//                       <button className={styles.add_expense_button} onClick={handlesubmit}>
//                         Add Account
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

export default Account_form;
