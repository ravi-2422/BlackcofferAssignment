const express = require("express");
const cors = require('cors');
const apiRoutes = require('./routes/routes');


const app  = express();
const connectDatabase = require('./config/dbConfig');
app.use(express.json());
require("dotenv").config({ path: './config/.env' });

app.use(cors());
//connecting to database
connectDatabase();

// Routes

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server is running on Port:", PORT);
})