const db = require("../helpers/db");

const plan = {

  //create a plan
  create: (data, next) => {
    const query ="";
    db.query(query, null, next);
  },
 
  //list all plans
  list: (data, next) => {
    const query = "";
    db.query(query, null, next);
  },

  //delete plans
  delete: (id, next) => {
    console.log(id);
    const query = "";
    db.query(query, null, next);
  },
  
  //update plan details
  update: (id, next) => {
    console.log(id);
    const query = "";
    db.query(query, null, next);
  },

  //view individual plan
  viewbyid: (id, next) => {
    console.log(id);
    const query = "";
    db.query(query, null, next);
  }
};

module.exports = plan;
