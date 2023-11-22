if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const cors = require("cors");
const express = require("express");
const router = require("./router");
const errHandler = require("./middlewares/errHandler");
const app = express();
const port = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use(router);

app.use(errHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
