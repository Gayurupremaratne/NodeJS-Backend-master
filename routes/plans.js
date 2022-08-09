const plan = require("../models/plan");
const response = require("../helpers/response");

const plans = {
 
  //create plan
  create: (req, res) => {
    plan.create({}, (err, data) => {
      if (err) {
        response.fail(
          req,
          res,
          response.message.unable_to_load,
          "category view",
          err
        );
        return;
      } else {
        response.success(req, res, data, "successfully created");
        return;
      }
    });
  },

  //view plan list
  list: (req, res) => {
    plan.list({}, (err, data) => {
      if (err) {
        response.fail(
          req,
          res,
          response.message.unable_to_load,
          "category view",
          err
        );
        return;
      } else {
        response.success(req, res, data, "succesfully retrieved");
        return;
      }
    });
  },
  
  //update plan details
  update: (req, res) => {
    plan.update({}, (err, data) => {
      if (err) {
        response.fail(
          req,
          res,
          response.message.unable_to_load,
          "category view",
          err
        );
        return;
      } else {
        response.success(req, res, data, "succesfully updated");
        return;
      }
    });
  },

//view plan by id
  viewbyid: (req, res) => {
    plan.viewbyid({}, (err, data) => {
      if (err) {
        response.fail(
          req,
          res,
          response.message.unable_to_load,
          "category view",
          err
        );
        return;
      } else {
        response.success(req, res, data, "succesfully retrieved");
        return;
      }
    });
  },

//delete plan
  delete: (req, res) => {
    plan.delete({}, (err, data) => {
      if (err) {
        response.fail(
          req,
          res,
          response.message.unable_to_load,
          "category view",
          err
        );
        return;
      } else {
        response.success(req, res, data, "successfully delete");
        return;
      }
    });
  }

};

module.exports = plans;
