import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
} from "@material-ui/core";
import { Doughnut } from "react-chartjs-2";
import useStyles from "./styles";
import styles from "./stylechart.module.css";
import useTransactions from "../../useTransactions";
import { Dummy } from "./Dummy";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./stylechart.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const Details = ({ title }) => {
  const [totalinc, settotalinc] = useState(0);
  const [totalexp, settotalexp] = useState(0);

  const [data, setData] = useState({
    datasets: [
      {
        label: "Amount",
        data: [],
        backgroundColor: [],
      },
    ],
    labels: [],
  });
  const [data1, setData1] = useState({
    datasets: [
      {
        label: "Amount",
        data: [],
        backgroundColor: [],
      },
    ],
    labels: [],
  });
  useEffect(() => {
    const fetchData = () => {
      fetch("/api/transactions")
        .then((data) => {
          const res = data.json();
          // console.log("data is", data);
          return res;
        })
        .then((res) => {
        
          console.log(res);
          const labels = [];
          const data = [];
          const backgC = [];

          const incdata = [];
          const inclabels = [];
          const expdata = [];
          const explabels = [];
          const incbackgC = [];
          const expbackgC = [];
          console.log(res.IncExpArray.length);
          console.log(res.totalIncome);
          console.log(res.totalExpense);

          const inctagAmountMap = new Map();
          const inctagColorMap = new Map();
          let j1 = 0x00f000;

          const exptagAmountMap = new Map();
          const exptagColorMap = new Map(); // new map to store colors of each tag
          let j2 = 0xff0000;

          let n = res.IncExpArray.length;
          for (let i = 0; i < n; i++) {
            const primaryk = res.IncExpArray[i].primarykey;
            console.log("PK:", primaryk);
            if (primaryk === 1) {
              const incExpArray = res.IncExpArray;
              // new map to store colors of each tag
              // console.log(incExpArray.length);
              // for (let m = 0; m < incExpArray.length; m++) {
              const item = incExpArray[i];
              console.log("ITEM:", item);
              const tag = item.tags;
              console.log("TAG:", tag);
              const amount = parseFloat(item.amount);
              console.log(amount);

              let color;
              if (inctagColorMap.has(tag)) {
                color = inctagColorMap.get(tag); // use existing color for tag
              } else {
                // assign a new color to tag if it doesn't already have one
                // const startgreen = 0xff0000;
                const endgreen = 0x008000;
                if (j1 > endgreen) {
                  // console.log(j);
                  let col = j1.toString(16); // Convert decimal to hexadecimal
                  let finalcol = "#" + col.padStart(6, "0"); // Add leading zeros if needed
                  // console.log("FINALCOL", finalcol);
                  color = finalcol;
                  // incbackgC.push(finalcol);
                  j1 += 1000;
                }
                inctagColorMap.set(tag, color); // store color for tag
              }

              if (inctagAmountMap.has(tag)) {
                const existingAmount = inctagAmountMap.get(tag);
                inctagAmountMap.set(tag, existingAmount + amount);
              } else {
                inctagAmountMap.set(tag, amount);
              }
              // }
              let k = 0;
              for (const [tag, amount] of inctagAmountMap) {
                incdata[k] = amount;
                inclabels[k] = tag;
                incbackgC[k] = inctagColorMap.get(tag);
                k++;
              }
              console.log("K IS:", k);
              // const startgreen = 0x00f000;
              // const endgreen = 0x008000;
            } else if (primaryk === 0) {
              const incExpArray = res.IncExpArray;

              // console.log(incExpArray.length);
              // for (let i = 0; i < incExpArray.length; i++) {
              const item = incExpArray[i];
              const tag = item.tags;
              const amount = parseFloat(item.amount);
              console.log(amount);

              let color;
              if (exptagColorMap.has(tag)) {
                color = exptagColorMap.get(tag); // use existing color for tag
              } else {
                // assign a new color to tag if it doesn't already have one
                // const startgreen = 0xff0000;
                const endgreen = 0x66000;
                if (j2 > endgreen) {
                  // console.log(j);
                  let col = j2.toString(16); // Convert decimal to hexadecimal
                  let finalcol = "#" + col.padStart(6, "0"); // Add leading zeros if needed
                  // console.log("FINALCOL", finalcol);
                  color = finalcol;
                  // incbackgC.push (finalcol);
                  j2 += 1000;
                }
                exptagColorMap.set(tag, color); // store color for tag
              }

              if (exptagAmountMap.has(tag)) {
                const existingAmount = exptagAmountMap.get(tag);
                exptagAmountMap.set(tag, existingAmount + amount);
              } else {
                exptagAmountMap.set(tag, amount);
              }
              // }
              let k = 0;
              for (const [tag, amount] of exptagAmountMap) {
                expdata[k] = amount;
                explabels[k] = tag;
                expbackgC[k] = exptagColorMap.get(tag);
                k++;
              }
              // console.log(tagAmountMap.size);
            }
          }

          if (title === "Income") {
            data.push(incdata);
            labels.push(inclabels);
            backgC.push(incbackgC);
          } else if (title === "Expense") {
            data.push(expdata);
            labels.push(explabels);
            backgC.push(expbackgC);
          }
          console.log(data[0][0]);

          console.log("EXPIS", totalexp);

          const INC = res.totalIncome;
          settotalinc(INC);
          console.log(settotalinc(INC))

          const EXP = res.totalExpense;
          settotalexp(EXP);
          console.log(settotalexp(EXP));

          setData({
            datasets: [
              {
                label: "Amount",
                data: data[0], //since there is only one array in the data either the income or the expense array
                backgroundColor: backgC[0],
              },
            ],
            labels: labels[0],
          });
          let backgc= ["#d35400","#e67e22","#2980b9"];
        let data1=[];
        let labels1=[];
        if (title === "Income") {
          data1.push(res.totalCashIncome);
          data1.push(res.totalBankIncome);
          data1.push(res.totalCreditIncome);
          
        } else if (title === "Expense") {
          data1.push(res.totalCashExpense);
          data1.push(res.totalBankExpense);
          data1.push(res.totalCreditExpense);
        }
        labels1.push("Cash");
        labels1.push("Bank");
        labels1.push("Credit");
        console.log(data1);
        setData1({
          datasets: [
            {
              label: "Amount",
              data: data1, //since there is only one array in the data either the income or the expense array
              backgroundColor: backgc,
            },
          ],
          labels: labels1,
        });
        })
        .catch((e) => console.log(e));
      }
        
    fetchData();
  }, [title]);
  const classes = useStyles();
  const { chartData } = useTransactions(title); //parameter of useTransactions hook is title
  // console.log(INC[0] + ":" + EXP[0]);

  //{title === "Income" ? { totalinc } : { totalexp }}
  // {title === "Expense" ? data[1] : data[0]}

  return (
    <>
      <div className="main">
        <div className="details_card">
          <Card
            className={title === "Expense" ? classes.expense : classes.income}
          >
            <div className="head">
              <CardHeader title={title} />
            </div>

            <CardContent className="heig">
              <Typography variant="h5">
                {title === "Income" ? totalinc : totalexp} &#8377;
              </Typography>
              <div className="dummy">
                <Doughnut data={data} />
              </div>
              <div className="dummy">
                <Doughnut data={data1} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Details;
