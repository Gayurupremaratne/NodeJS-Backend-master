const Publisher = require("../models/publisher");
const response = require("../helpers/response");
const moment = require('moment');

const publishers = {
  //create publisher
  create: (req, res) => {
   
    
    const {
      name,
      email,
      language_id,
      created_by,
      created_date,
      updated_by,
      updated_date,
      status
    } = req.body;
    console.log('==============>>>>>', language_id);
    
    const userData = {
      name: name,
      language_id: language_id,
      created_by: created_by,
      created_date: created_date,
      updated_by: updated_by,
      updated_date: updated_date,
      status: status
    };

    Publisher.create(userData, (err, data) => {
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
        db_id = JSON.parse(JSON.stringify(data)).insertId;
        var emailList = email;
        emailList.forEach(element => {
          const emailData = {
            db_id: db_id,
            email: element,
            created_date: created_date
          };

          Publisher.emailCreate(emailData, (err, result) => {
            if (err) {
              response.fail(
                req,
                res,
                response.message.unable_to_load,
                "email create",
                err
              );
              return;
            } else {
              response.success(req, res, result, "Successfully created");
              return;
            }
          });
        });
      }
    });
  },

  //status change publisher
  publisherChangeStatus: (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const data = {
      id: id,
      status: status
    };
    Publisher.changepublisherstatus(data, (err, data) => {
      if (err) {
        response.fail(
          req,
          res,
          response.message.db_error,
          "publisher status change",
          err.message
        );
        return;
      } else {
        response.success(req, res, data, "successfully status changed");
        return;
      }
    });
  },

  //view publisher list
  list: (req, res) => {
    Publisher.list({}, (err, data) => {
      if (err) {
        response.fail(
          req,
          res,
          response.message.unable_to_load,
          "publishers list",
          err
        );
        return;
      } else {
        response.success(req, res, data, "succesfully retrieved");
        return;
      }
    });
  },

  //update publisher details
  update: (req, res) => {
    const { id } = req.params;
    const { email } = req.body;

    const userData = {
      id: id,
      email: email
    };

    Publisher.update(userData, (err, data) => {
      if (err) {
        response.fail(
          req,
          res,
          response.message.unable_to_load,
          "db error",
          err
        );
        return;
      } else {
        response.success(req, res, data, "succesfully updated");
        return;
      }
    });
  },


  //view publisher by id
  viewbyid: (req, res) => {
    Publisher.viewbyid(req.params.id, (err, data) => {
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

  //delete publisher
  delete: (req, res) => {
    Publisher.delete(req.params.id, (err, data) => {
      if (err) {
        response.fail(
          req,
          res,
          response.message.unable_to_load,
          "delete publisher",
          err
        );
        return;
      } else {
        response.success(req, res, data, "successfully delete");
        return;
      }
    });
  },

  //create a price package
  createPrice: (req, res) => {
    const {
      price,
      pub_id,
      cat_id
    } = req.body;
    const cdate = moment().format("YYYY-MM-DD hh:mm");

    const userData = {
      price: price,
      publisher_id: pub_id,
      category_id: cat_id,
      created_date: cdate
    };

    Publisher.createPrice(userData, (err, data) => {
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

  //list category
  listCategory: (req, res) => {
    Publisher.listCategory((err, data) => {
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
  
  //list category
  listLanguage: (req, res) => {
    Publisher.listLanguage(req.params.id, (err, data) => {
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

  //list all available publishers
  listAllPublisher: (req, res) => {
    Publisher.listAllPublisher(req.params.id, (err, data) => {
      if (err) {
        response.fail(
          req,
          res,
          response.message.unable_to_load,
          "publisher view",
          err
        );
        return;
      } else {
        response.success(req, res, data, "successfully retrieved");
        return;
      }
    });
  },
  


  //list category
  listLanguagePublisher: (req, res) => {
    Publisher.listLanguagePublisher(req.params.id, (err, data) => {
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

  //list category
  listPrice: (req, res) => {
    Publisher.listPrice(req.params.id, (err, data) => {
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

   //list pricing
   viewPrice: (req, res) => {
    Publisher.viewPrice(req.params.id, (err, data) => {
      if (err) {
        response.fail(
          req,
          res,
          response.message.unable_to_load,
          "Pricing view",
          err
        );
        return;
      } else {
        response.success(req, res, data, "successfully retrieved");
        return;
      }
    });
  },

   //get total price
   getTotalPrice: (req, res) => {
    const { publisher_id , category_id } = req.body;
    const publishers = publisher_id.toString().replace(/[\[\]']/g,'' );
    const data = {
        publisher_id : publishers,
        category_id : category_id
    };
    Publisher.getTotal(data, (err, data) => {
      if (err) {
        response.fail(
          req,
          res,
          response.message.unable_to_load,
          "Total publishers prices",
          err
        );
        return;
      } else {
        response.success(req, res, data, "Total publishers prices");
        return;
      }
    });
  },


  
  //update price per category and publisher
  updatePrice: (req, res) => {
    const { cid } = req.params;
    const { pid } = req.params;
    const { price } = req.body;
    const upDate = moment().format("YYYY-MM-DD hh:mm");

    const priceData = {
      cid: cid,
      pid: pid,
      price: price,
      updated_date: upDate
      
    };
    Publisher.updatePrice(priceData, (err, data) => {
      if (err) {
        response.fail(
          req,
          res,
          response.message.unable_to_load,
          "category publisher price",
          err
        );
        return;
      } else {
        response.success(req, res, data, "Successfully updated!");
        return;
      }
    });
  },


  //edit price
  editprice: (req, res) => {
    const { id } = req.params;
    const { price } = req.body;

    const pricData = {
      id: id,
      price: price
    };
    Publisher.editprice(pricData, (err, data) => {
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
        response.success(req, res, data, "successfully updated");
        return;
      }
    });
  },

  publisherFilter: (req, res) => {
    const { category_id, language_id } = req.body;
    const data = {
      category_id: category_id,
      language_id: language_id
    };
    Publisher.filter(data, (err, data) => {
      if (err) {
        console.log(err.message);
        response.fail(
          req,
          res,
          response.message.unable_to_load,
          "publishers filter",
          err
        );
        return;
      } else {
        //console.log(req.body);
        response.success(req, res, data, "Publishers");
        return;
      }
    });
  },

  getAllPublishers: (req, res) => {
    Publisher.getAllPublishers((err, data) => {
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

};

module.exports = publishers;
