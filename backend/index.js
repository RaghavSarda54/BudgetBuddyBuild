const express = require("express");
const app = express();
const port = 5001;

const mongoDB = require("./db");
mongoDB();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// app.use(express.json());
// app.use("/api/accounts", require("./routes/AccountsDisplay"));
app.use("/api/", require("./routes/userRoutes"));
app.listen(port, () => {
  console.log(`Server running on the port ${port}`);
});

// app.use() //middleware
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
