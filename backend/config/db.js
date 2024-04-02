const { connect, set } = require('mongoose');

const connectWithDB = () => {
  set('strictQuery', false);
  connect(process.env.DB_URL, {
    dbName: process.env.DB_NAME
  })
    .then(() => {
      console.log(`DB connected successfully`);
    })
    .catch((err) => {
      console.log(`DB connection failed`);
      console.log(err);
      process.exit(1);
    });
};

module.exports = connectWithDB;
