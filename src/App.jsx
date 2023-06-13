import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/header/header';
import Navbar from './components/navbar/navbar';
import { Route, Router, Routes } from "react-router-dom";
// import { Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Transactions from './components/Transactions/Transactions';
import Expenses from './components/Expenses/Expenses';
import Savings from './components/savings/Savings';
import Income from './components/Income/Income';
import { useEffect } from 'react';
import { createContext } from 'react';
import Login from './credentials/Login';
import Register from "./credentials/Register"
export const TransContext = createContext();
function App() {
  const [alltrans,setalltrans]= useState([]);
  const [clicked,setclicked]= useState(false);
  const [refreshed,setrefreshed]= useState(false);
  const setclick= ()=>{
    setclicked(!clicked);
  }
  const setrefresh= ()=>{
    setrefreshed(!refreshed);
  }
  useEffect(()=>{
    async function fetchData(){
      const response= await fetch("/api/transactions",{ headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       },
    });
      const resp= await response.json();
      setalltrans(resp.IncExpArray);
    }
    fetchData();
  }, [clicked,refreshed]);
  return (
    <>
      {/* <Header />
    <Navbar></Navbar> */}
    <TransContext.Provider value={[alltrans,setclick,setrefresh]}>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/transactions" element={<Transactions />}></Route>
        <Route path="/savings" element={<Savings />}></Route>
        <Route path="/expenses" element={<Expenses />}></Route>
        <Route path="/income" element={<Income />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
      </TransContext.Provider>
    </>
  );
}

export default App;
