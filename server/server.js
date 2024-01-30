const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/routes");
const fs = require("fs");

const app = express();
const connectDatabase = require("./config/dbConfig");
const { default: mongoose } = require("mongoose");
const Data = require("./models/Data");
app.use(express.json());
require("dotenv").config({ path: "./config/.env" });

app.use(cors());
//connecting to database
connectDatabase();

const jsonData = {};

function saveData() {
  const filePath = "./models/jsondata.json";
  const db = mongoose.connection;

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    try {
      jsonData = JSON.parse(data);
      for (const obj of jsonData) {
        const newData = new Data(obj);
        newData.save();
        //console.log("Data saved to MongoDB:", obj);
      }
    } catch (parseError) {
      console.error("Error parsing JSON data:", parseError);
    }
  });
}
saveData();
// Routes

app.use("/api", apiRoutes);

// use for testing
app.get('/api/data', (req, res)=>{
    res.json(jsonData);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running on Port:", PORT);
});
