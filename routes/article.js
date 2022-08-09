const Articles = require("../models/articles");
const Invoice = require("../models/invoices");
const response = require("../helpers/response");
var multer = require("multer");
var fs = require("fs");
var path = require("path");
var moment = require("moment");
var _ = require("lodash");
var async = require("async");

const article = {
  create: (req, res) => {
    const {
      title,
      publish_date,
      status,
      file_path,
      invoice_id,
      category_id,
      createdby,
      created_date,
      updatedby,
      updated_date
    } = req.body;

    const article_data = {
      title: title,
      publish_date: publish_date,
      status: status,
      file_path: file_path,
      invoice_id: invoice_id,
      category_id: category_id,
      createdby: createdby,
      created_date: created_date,
      updatedby: updatedby,
      updated_date: updated_date
    };

    Articles.create(article_data, (err, data) => {
      if (err) {
        response.fail(
          req,
          res,
          response.message.unable_to_load,
          "article create",
          err
        );
        return;
      } else {
        response.success(req, res, data, "successfully created");
        return;
      }
    });
  },

  delete: (req, res) => {
    Articles.delete(req.params.id, (err, data) => {
      if (err) {
        response.fail(
          req,
          res,
          response.message.unable_to_load,
          "article view",
          err
        );
        return;
      } else {
        response.success(req, res, data, "successfully deleted");
        return;
      }
    });
  },

  changeStatus: (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const data = {
      id: id,
      status: status
    };
    Articles.changestatus(data, (err, data) => {
      if (err) {
        response.fail(
          req,
          res,
          response.message.db_error,
          "article status change",
          err.message
        );
        return;
      } else {
        response.success(req, res, data, "successfully status changed");
        return;
      }
    });
  },
  //view individual article by id
  viewbyid: (req, res) => {
    Articles.viewbyid(req.params.id, (err, data) => {
      if (err) {
        response.fail(
          req,
          res,
          response.message.unable_to_load,
          "article view",
          err
        );
        return;
      } else {
        response.success(req, res, data, "successfully retrieved");
        return;
      }
    });
  },

  //approve or reject article by id
  approvereject: (req, res) => {
    const { status } = req.body;
    Articles.approvereject(req.params.id, status, (err, data) => {
      if (err) {
        response.fail(
          req,
          res,
          response.message.unable_to_load,
          "approve/reject article",
          err
        );
        return;
      } else {
        response.success(req, res, data, "successfully status changed");
        return;
      }
    });
  },

  update: (req, res) => {
    const { id } = req.params;
    const { publish_date, status, title } = req.body;
    var log_dir = `${__dirname}/../public`;
    if (!fs.existsSync(log_dir)) {
      fs.mkdirSync(log_dir);
    }
    if (!req.files) {
      response.fail(
        req,
        res,
        {
          file: ""
        },
        "Upload failed"
      );
    } else {
      var upload_file = req.files.file;
      var tmpname = upload_file.name.split(".");
      var new_file = Date.now() + "." + tmpname[1];

      upload_file.mv(log_dir + "/" + new_file, function(err) {
        if (err) {
          response.fail(
            req,
            res,
            {
              file: `public/${new_file}`
            },
            "Upload failed"
          );
        } else {
          const data = {
            id: id,
            title: title,
            publish_date: publish_date,
            status: status,
            file_path: new_file,
            updated_date: moment().format("YYYY-MM-DD HH:mm:ss")
          };
          console.log(data);
          Articles.update(data, (err, data) => {
            if (err) {
              response.fail(
                req,
                res,
                response.message.unable_to_load,
                "article update",
                err
              );
            } else {
              response.success(req, res, data, "successfully updated");
            }
          });
        }
      });
    }
  },

  //list down all the pending articles
  list: (req, res) => {
    Articles.list((err, data) => {
      if (err) {
        response.fail(
          req,
          res,
          response.message.unable_to_load,
          "article view",
          err
        );
        return;
      } else {
        response.success(req, res, data, "successfully retrieved");
        return;
      }
    });
  },

  //list  down articles (rejected/ published/ approved)
  historylist: (req, res) => {
    Articles.historylist((err, data) => {
      if (err) {
        response.fail(
          req,
          res,
          response.message.unable_to_load,
          "article view",
          err
        );
        return;
      } else {
        response.success(req, res, data, "successfully retrieved");
        return;
      }
    });
  },

  getLatestArticles: (req, res) => {
    const { created_by, status } = req.body;

    const data = {
      created_by: created_by,
      status: status
    };

    Articles.getLatest(data, (err, data) => {
      if (err) {
        response.fail(
          req,
          res,
          response.message.unable_to_load,
          "Latest draft articles view",
          err
        );
        return;
      } else {
        response.success(req, res, data, "successfully retrieved");
        return;
      }
    });
  },

  getDashboardArticles: (req, res) => {
    const { created_by } = req.body;

    const data = {
      created_by: created_by
    };

    Articles.getDashboard(data, (err, data) => {
      if (err) {
        response.fail(
          req,
          res,
          response.message.unable_to_load,
          "Latest dashboard articles view",
          err
        );
        return;
      } else {
        let data_list = [];
        async.eachSeries(
          data,
          function(item, cb) {
            Invoice.getInvoiceTotal(item.invoice, (err, row) => {
              if (err) {
                cb(err);
              } else {
                item.total = row[0].total;
                data_list.push(item);
                cb();
              }
            });
          },
          function(err) {
            if (err) {
              response.fail(
                req,
                res,
                response.message.unable_to_load,
                "draft dashboard total for an invoice",
                err
              );
              return;
            } else {
              response.success(req, res, data_list, "successfully retrieved");
              return;
            }
          }
        );
      }
    });
  },

  getPublushersForaAnArticle: (req, res) => {
    const { article_id } = req.body;

    const data = {
      article_id: article_id
    };

    Articles.getPublushersForaAnArticle(data, (err, data) => {
      if (err) {
        response.fail(
          req,
          res,
          response.message.unable_to_load,
          "Publisher list",
          err
        );
        return;
      } else {
        response.success(req, res, data, "successfully retrieved");
        return;
      }
    });
  },

  getHistoryArticles: (req, res) => {
    const { username } = req.body;

    const data = {
      username: username
    };
    Articles.getHistory(data, (err, data) => {
      if (err) {
        response.fail(
          req,
          res,
          response.message.unable_to_load,
          "Articles history view",
          err
        );
        return;
      } else {
        response.success(req, res, data, "successfully retrieved");
        return;
      }
    });
  },

  upload: (req, res) => {
    var log_dir = `${__dirname}/../public`;

    if (!fs.existsSync(log_dir)) {
      fs.mkdirSync(log_dir);
    }

    if (!req.files) {
      response.fail(
        req,
        res,
        {
          file: ""
        },
        "Upload failed"
      );
    } else {
      var upload_file = req.files.file;
      var tmpname = upload_file.name.split(".");
      var new_file = Date.now() + "." + tmpname[1];

      upload_file.mv(log_dir + "/" + new_file, function(err) {
        if (err) {
          response.fail(
            req,
            res,
            {
              file: `public/${new_file}`
            },
            "Upload failed"
          );
        } else {
          response.success(
            req,
            res,
            {
              file: `public/${new_file}`
            },
            "File has successfully uploaded"
          );
        }
      });
    }

    let uploadFile = req.files.file;
    const fileName = req.files.file.name;
    console.log("File Renamed.");
    console.log("File Renamed.", req.files.path);

    // fs.rename('sample-' + fileName, fileName, function (err) {
    //   if (err) {
    //     console.log(err);
    //     throw err;
    //   } else {
    //     console.log('File Renamed.');

    //     console.log(fileName);
    //     uploadFile.mv(
    //       `${__dirname}/../public/${fileName}`,
    //       function (err) {
    //         console.log(err);
    //         if (err) {
    //           return res.status(500).send(err)
    //         }
    //         res.json({
    //           file: `public/${req.files.file.name}`,
    //         })
    //       },
    //     )
    //   }
    // });
  }
};

var upload = multer({ storage: storage }).single("file");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

module.exports = article;
