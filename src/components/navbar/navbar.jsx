import React from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PaidIcon from "@mui/icons-material/Paid";
import WalletIcon from "@mui/icons-material/Wallet";
import SavingsIcon from "@mui/icons-material/Savings";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
const Navbar = (props) => {
  return (
    <div className={styles.main}>
      <nav className={styles.navbarmain}>
        <ul>
          <li className={styles.navbarcont}>
            <div className={styles.na}>
              <Link to="/" className={styles.ulcont}>
                <DashboardIcon className={styles.dash} />
                Dashboard
              </Link>
            </div>
          </li>
          <li className={styles.navbarcont}>
            <div className={styles.na}>
              <Link to="/transactions" className={styles.ulcont}>
                <WalletIcon className={styles.dash} />
                Transactions
              </Link>
            </div>
          </li>
          <li className={styles.navbarcont}>
            <div className={styles.na}>
              <Link to="/income" className={styles.ulcont}>
                <PaidIcon className={styles.dash} />
                Income
              </Link>
            </div>
          </li>
          <li className={styles.navbarcont}>
            <div className={styles.na}>
              <Link to="/expenses" className={styles.ulcont}>
                <TrendingUpIcon className={styles.dash} />
                Expenses
              </Link>
            </div>
          </li>
          <li className={styles.navbarcont}>
            <div className={styles.na}>
              <Link to="/savings" className={styles.ulcont}>
                <SavingsIcon className={styles.dash} />
                Accounts
              </Link>
            </div>
          </li>

          {/* <AccountBalanceIcon/>    <li  className={styles.navbarcont}><Link to="/transactions" className={styles.ulcont}>Transactions</Link></li>
        <PaidIcon/>   <li  className={styles.navbarcont}><Link to="/income" className={styles.ulcont}>Income</Link></li>
            <li  className={styles.navbarcont}><Link to="/expenses" className={styles.ulcont}>Expenses</Link></li>
            <li  className={styles.navbarcont}><Link to="/savings" className={styles.ulcont}>Savings</Link></li> */}
        </ul>
      </nav>
      {props.children}
    </div>
  );
};

export default Navbar;
