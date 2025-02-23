const mongoose = require("mongoose");

const mongoConnection = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      throw error;
    });
};

module.exports = mongoConnection;
