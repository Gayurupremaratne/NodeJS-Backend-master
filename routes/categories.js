const Categories = require("../models/categories");
const response = require("../helpers/response");
const moment = require('moment');


const categories = {   
  //create category page
  create: (req, res) => {
    const cdate = moment().format("YYYY-MM-DD hh:mm");

    const {
      name,
    } = req.body;
    
    const catData = {
      
      Name: name,
      created_date: cdate
  
    };
    console.log(catData)

    Categories.create(catData, (err, data) => {
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
        response.success(req, res, data, "successfully cerated");
        return;
      }
    });
  },

    //list all available categories
    listAllCategories: (req, res) => {
      Categories.listAllCategories(req.params.id, (err, data) => {
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
          response.success(req, res, data, "successfully retrieved");
          return;
        }
      });
    },
    

    //list category admin
  listCategoryAdmin: (req, res) => {
    Categories.listCategoryAdmin((err, data) => {
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
  },


    
 //update category 
 update: (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const udate = moment().format("YYYY-MM-DD hh:mm");
  
    const userData = {
      id: id,
      name: name,
      updated_date:udate
    };
    console.log(userData)
    Categories.update(userData, (err, data) => {
      if (err) {
        response.fail(
          req,
          res,
          response.messages.unable_to_load,
          "db error",
          err
        );
        return;
      } else {
        response.success(req, res, data, "succesfully retrieved");
        return;
      }
    });
  },

  

  //delete category
  delete: (req, res) => {
    // const { id } = req.params;
    // console.log(id)
    Categories.delete(req.params.id, (err, data) => {
      if (err) {
        response.fail(
          req,
          res,
          response.messages.unable_to_load,
          "category view",
          err
        );
        return;
      } else {
        response.success(req, res, data, "successfully delete");
        return;
      }
    });
  },


  
  
     
};

module.exports = categories;