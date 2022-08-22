require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const ApiRoute = require("./routes");

/* TODO: 
    - extract token from authentication header assuming its Bearer token
    - open new endpoints for the rest of the pages
    

*/

const app = express();

const corsOptions = {
    origin: ["http://localhost:3000", "https://bt-portfolio-22.herokuapp.com"],
};
app.use(cors(corsOptions));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

// MongoDB Connection
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.CLUSTER_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority`
);

app.use("/api/", ApiRoute);

let port = process.env.PORT || 3333;
app.listen(port, () => {
    console.log("listening on port " + port);
});
