import React from "react";
import { Link } from "react-router-dom";
// import ReactDOM from 'react-dom/client';
import styles from "./Header.module.css";
// import logo from "./anim.gif";
//<button className={styles.btnn}> Login </button>
// import Login from "../../credentials/Login";
import logo from "./FINAL.jpg";
const Header = () => {
  return (
    <div className={styles.main}>
      <div>
        <img src={logo} className={styles.logoimg} alt="logo" />
      </div>
      <div className={styles.heading}>
        <h1>Budget Buddy</h1>
      </div>
      
    </div>
  );
};

// <div className={styles.btndiv}>
//         <Link to="/login">
//           <button className={styles.btnn}> Login </button>
//         </Link>
//       </div>
export default Header;
