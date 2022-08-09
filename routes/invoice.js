const response = require("../helpers/response");
const Publisher = require("../models/publisher");
const invoices = require("../models/invoices");
const articles = require("../models/articles");

const invoice = {
  getInvoice: (req, res) => {
    const { publisher_id, category_id } = req.body;
    const publishers = publisher_id.toString().replace(/[\[\]']/g, '');
    const data = {
      publisher_id: publishers,
      category_id: category_id
    };
    // console.log(data.publisher_id)
    // console.log("publishers ", publishers);
    Publisher.getPrice(data, (err, data) => {
      if (err) {
        response.fail(
          req,
          res,
          response.message.unable_to_load,
          "Invoice",
          err
        );
        return;
      } else {
        response.success(req, res, data, "Invoice");
        return;
      }
    });
  },

  //newly updated method===============
  getInvoiceById: (req, res) => {
    const { invoice_id } = req.body;
    const data = {
      invoice_id: invoice_id
    };
    invoices.getInvoiceById(data, (err, data) => {
      if (err) {
        response.fail(
          req,
          res,
          response.message.unable_to_load,
          "Invoice_by_ID",
          err
        );
        return;
      } else {
        response.success(req, res, data, "Invoice_by_ID");
        return;
      }
    });
  }
  //==============================
  ,

  getInvoiceTotal: (req, res) => {
    const { invoice_id } = req.body;
    const data = {
      invoice_id: invoice_id
    };
    invoices.getInvoiceTotal(data, (err, data) => {
      if (err) {
        response.fail(
          req,
          res,
          response.message.unable_to_load,
          "InvoiceTotal",
          err
        );
        return;
      } else {
        response.success(req, res, data, "InvoiceTotal");
        return;
      }
    });
  },

  create: (req, res) => {
    const {
      status,
      advertiser_id,
      created_by,
      created_date,
      updated_by,
      updated_date,
      publisher_id,
      category_id
    } = req.body;

    const publishers = publisher_id.toString().replace(/[\[\]']/g, '');

    const data_get_total = {
      publisher_id: publishers,
      category_id: category_id
    };

    Publisher.getTotal(data_get_total, (err, data) => {
      if (err) {
        response.fail(
          req,
          res,
          response.message.unable_to_load,
          "getTotal",
          err
        );
        console, log(err.message);
        return;
      } else {
        //response.success(req, res, data, "Total publishers prices");
        //
        const total_price = data[0].total;
        //console.log("total: ", total_price);
        if (total_price !== null && total_price !== undefined) {
          const invoice_data = {
            total: total_price,
            status: status,
            created_by: created_by,
            created_date: created_date,
            updated_by: updated_by,
            updated_date: updated_date,
            publisher_id: publishers,
            category_id: category_id

          };
          console.log("dataset: ", invoice_data);
          invoices.create(invoice_data, (err, data) => {
            if (err) {
              response.fail(
                req,
                res,
                response.message.unable_to_load,
                "create",
                err
              );
              //console,log(err.message);
              return;
            } else {
              //response.success(req, res, data, "Total publishers prices");
              //console.log("inserted id: ", data.insertId);
              const invoice_id = data.insertId;

              const article_data = {
                title: "",
                publish_date: null,
                status: status,
                file_path: null,
                content: "",
                invoice_id: invoice_id,
                category_id: category_id,
                created_by: created_by,
                created_date: created_date,
                updated_by: null,
                updated_date: null
              }
              articles.create(article_data, (err, data) => {

                if (err) {
                  response.fail(
                    req,
                    res,
                    response.message.unable_to_load,
                    "articles create",
                    err
                  );
                  return;
                } else {
                  console.log("success: ", data);
                  console.log("invoice_id", publisher_id);
                  console.log("cat_id: ", category_id);

                  const article_id = data.insertId;

                  //return;
                  for (let key in publisher_id) {
                    let publisher = publisher_id[key];
                    if (publisher !== "" && publisher !== null) {
                      //console.log(key, publisher);

                      const invoice_price = {
                        category_id: category_id,
                        publisher_id: publisher
                      }

                      Publisher.getPrices(invoice_price, (err, data) => {

                        if (err) {
                          response.fail(
                            req,
                            res,
                            response.message.unable_to_load,
                            "getPrice",
                            err
                          );
                          return;
                        } else {
                          //console.log("publisher price: ", data[0].price);
                          const publisher_price = data[0].price;

                          const invoice_price_data = {
                            publisher_id: publisher,
                            price: publisher_price,
                            invoice_id: invoice_id
                          };

                          console.log("invoice_price", invoice_price_data);

                          invoices.createInvoicePrice(invoice_price_data, (err, data) => {

                            if (err) {
                              response.fail(
                                req,
                                res,
                                response.message.unable_to_load,
                                "createInvoicePrice",
                                err
                              );
                              return;
                            } else {
                              //console.log("success: ", data);
                              //console.log("completed");
                              const pub_articles = {
                                publisher_id: publisher,
                                article_id: article_id
                              }
                              articles.createPublisherArticle(pub_articles, (err, data) => {

                                if (err) {
                                  response.fail(
                                    req,
                                    res,
                                    response.message.unable_to_load,
                                    "publisher_articles",
                                    err
                                  );
                                  return;
                                } else {
                                  //console.log("success: ", data);

                                  console.log("completed333333");
                                  response.success(req, res, { article_id: article_id }, "Invoice_by_ID");
                                  return;
                                }
                              });
                            }
                          });

                        }
                      });

                    }
                  }
                }
              });

            }
          });

        }
      }
    });
  }
}

module.exports = invoice;