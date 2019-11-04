const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
import {DB_URL}  from '../config/constants';
class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(DB_URL, {
        useNewUrlParser: true, 
        useFindAndModify: false, 
        useCreateIndex:true,
        useUnifiedTopology: true
        })
      .then(() => {
        console.log('Database connected to: ' + DB_URL);
      })
      .catch(err => {
        console.error(err);
      });
  }
}

module.exports = new Database();