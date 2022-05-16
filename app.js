const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const app = express();

dotenv.config({ path: ".env" });
require("./db/conn");

// body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use("/users", require("./routes/users"));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server running on port no ${PORT}`);
});
