import React from "react";
import Header from "../header/header";
import Navbar from "../navbar/navbar";
import Details from "../IncExCharts/Details";
import { Grid } from "@material-ui/core";
import useStyles from "../IncExCharts/styles";

const Expenses = () => {
  const classes = useStyles();
  return (
    <>
      <Header />
      <Navbar>
        <Details title="Expense" />
      </Navbar>
    </>
  );
};

export default Expenses;
