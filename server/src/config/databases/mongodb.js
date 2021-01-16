const mongoose = require("mongoose");

const mongodb = async () => {
  try {
    const success = mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    });
    console.log("database connected!");
  } catch (error) {
    console.log("DB connection error", error.message);
  }
};

module.exports = mongodb;
