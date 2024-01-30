const mongoose = require("mongoose");
const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //useCreateIndex: true
    })
    .then(
      (con) => {
        console.log(
          `MongoDB Database connected with HOST: ${con.connection.host}`
        );
      },
      (err) => {
        console.log(err);
      }
    );
};

module.exports = connectDatabase;
