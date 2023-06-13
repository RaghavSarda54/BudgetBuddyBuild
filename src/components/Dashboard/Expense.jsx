import React, { createContext, createRef } from "react";
import Dropdown from "./Dropdown";
import Custom from "./custom";
import styles from "./dashboard.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useRef } from "react";
// import { message } from "antd";
// import axios from "axios";
const Expense = (props) => {
  const dropref= useRef("");
  // console.log(dropref);
  const customref= useRef([]);

  const current = new Date();
  const curdate = `${current.getFullYear()}-${
    current.getMonth() + 1 > "9"
      ? current.getMonth() + 1
      : "0" + (current.getMonth() + 1)
  }-${current.getDate() > "9" ? current.getDate() : "0" + current.getDate()}`;
  // console.log(curdate);
  // const [totalexpense,settotalexpense]= useState(0);

  const [from,setfrom]= useState(""); 
  const [amount,setamount]= useState(""); 
  const [tags,settags]= useState(""); 
  const [note,setnote]= useState(""); 
  const [date,setdate]= useState(curdate); 
  const [totalexpense,settotalexpense]= useState(0.00);
  const [dropoptions,setdropoptions]= useState([]);
  const [message,setmessage] =useState("");
  const [isubmitted,setissubmiitted] =useState(false);
  
  const handlefrom= async(e)=>{
    // console.log(e);
    setfrom(e);
    var ssarr= e.split("(");
    dropref.current= {
      accountName:ssarr[0],
      accountGroup:(ssarr[1]).split(")")[0]
    };
    console.log(dropref.current);
  };

  const handleamount = async (e) => {
    setamount(e.target.value);
  };

  const handlemulti = async (e) => {
    // console.log(e.length -1);
    // if(e.length===0){
    //   customref.current= [];
    //   settags("");
    //   return;
    // }
    // if(tags.length ===0){
    //   customref.current.push({value:e[e.length-1].value,label:e[e.length-1].label});
    //   settags(e[e.length-1].value);
    //   return;
    // }
    // if(e.length>tags.split(",").length){
    //   customref.current.push({value:e[e.length-1].value,label:e[e.length-1].label});
    // settags((prevdata)=>{
    //   return prevdata+","+e[e.length-1].value;
    // });
    let s="";
    customref.current=[];
    e.forEach(element => {
      customref.current.push({value:element.value,label:element.label});
      if(s.length==0) s=s+element.value;
      else s=s+","+element.value;
    });
    settags(s);
  };
  // else{
  //   let arr= tags.split(",");
  //   let text= arr.slice(0,-1).join(",");
  //   customref.current= customref.current.slice(0,-1);
  //   settags(text);
  // }
  //   console.log(tags);
  // };

  const handlenote = async (e) => {
    setnote(e.target.value);
  };

  const handledate = async (e) => {
    setdate(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const balancearraay= amount.split(",");
    const sum= balancearraay.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
    // console.log(tags);
    // console.log(sum);
    const accname= from.split("(")[0];
    const acc= from.split("(")[1].split(")")[0]+"Array";
    const resp= await fetch("/api/accounts",{
      headers: { 'Content-Type': 'application/json' },
    });
    const data1= await resp.json();
    let obj= data1[acc].find(o=>o.accountName===accname);
    // console.log(obj);
    if(obj.balance<sum){
      setmessage("*Not Enough Balance");
      return;
    }
    if(from===""||tags===""||note===""||amount===""){
      setmessage("*All Fields are mandatory");
      return;
    }
    
    const tagsarray= tags.split(",");
    const notearray= note.split(","); 
    if(balancearraay.length !== tagsarray.length||balancearraay.length!==notearray.length||tagsarray.length!==notearray.length){
      setmessage("*Tags and Amount should be of same size");
      return;
    }
    for(let i=0;i<balancearraay.length;i++){
    if(props.setexp != null)props.setexp(balancearraay[i]);
    const ntrans= {
      id:"4",
      key:0,
      from:from,
      amount:parseFloat(balancearraay[i]),
      tags:tagsarray[i],
      note:notearray[i],
      date:date
    }
    const res= await fetch("/api/transactions",{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ntrans),
    });

    const data = await res.json();
    console.log(data);
  }
  // document.getElementById("my-form").reset();
  dropref.current= "";
  customref.current= [];
  setfrom("");
  setnote("");
  setamount("");
  settags("");
  // console.log(dropref);
  if(props.myclose != null)props.myclose();
  if(props.click != null)props.click();
  };

  useEffect(()=>{
    async function fetchData(){
    const response= await fetch("/api/accounts",{ headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     },
  });
  const resp= await response.json();
  // console.log(resp)
  // resp.forEach(element => {
  //   setdropoptions((prev)=>{
  //     return [...prev,{value:element.accountName,label:element.accountGroup}];
  //   })
  // });
  let arr1= resp.CashArray;
  let arr2= resp.BankArray;
  let arr3= resp.CreditArray;
  setdropoptions(arr1.concat(arr2,arr3));
}
  fetchData();
  console.log(dropoptions);
},[]);
  return (
    <div className={props.state === 1 ? styles.segment_active : styles.segment}>
      <form action="">
      <p className={styles.warning}>{message}</p>
        <div className={styles.fields}>
          <div className={styles.label_field}>
            <label htmlFor="">From</label>
            <Dropdown handlechange={handlefrom} options={dropoptions} value={dropref.current}></Dropdown>
          </div>
          <div className={styles.input}>
            <input
              required
              type="text"
              value={amount}
              className={styles.my_input}
              onChange={handleamount}
            />
            <div className={styles.smalldrop}>
              {/* <Dropdown options={[{value:"INR", label:""}]}></Dropdown> */}
              INR
            </div>
          </div>
        </div>
        <div className={styles.transaction_grid}>
          <div className={styles.transaction_grid_wide}>
            <label htmlFor="tags">Tags</label>
            <div className={styles.tags}>
              <Custom handlechange={handlemulti} options={[
  { value: "Groceries", label: "Groceries" },
  { value: "Rent", label: "Rent" },
  { value: "Restraunt", label: "Restraunt" },
  { value: "Shopping", label: "Shopping" }]} value={customref.current}></Custom>
            </div>
            <div className={styles.note}>
              <input
                type="text"
                name=""
                id=""
                placeholder="Note"
                value={note}
                className={styles.my_input}
                onChange={handlenote}
              />
            </div>
          </div>
          <div className={styles.transaction_grid_narrow}>
            <div className={styles.date_input}>
              <input
                type="date"
                name="date_input"
                value={curdate}
                className={styles.my_input}
                onChange={handledate}
              />
            </div>
            <div className={styles.add_expense}>
              <button
                className={styles.add_expense_button}
                onClick={handleClick}
              >
                Add Expense
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Expense;
