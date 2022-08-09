const response = require("../helpers/response");

const validator = {
  publisherFilter: (req, res, next) => {
    const { category_id, language_id } = req.body;
    if (category_id == "" || category_id == null) {
      return response.fail(
        req,
        res,
        response.message.parameter_missing,
        "category_id is Missing"
      );
    } else if (language_id == "" || language_id == null) {
      return response.fail(
        req,
        res,
        response.message.parameter_missing,
        "language_id is Missing"
      );
    } else {
      next();
    }
  },

  publisherStatusChange: (req, res, next) => {
    const { status } = req.body;
    if (status > 4) {
      return response.fail(
        req,
        res,
        response.message.parameter_missing,
        "invalid status value detected"
      );
    } else {
      next();
    }
  },

  //get article history
  getHistoryArticles: (req, res, next) => {
    const { username } = req.body;
    if (username == "" || username == null) {
      return response.fail(
        req,
        res,
        response.message.parameter_missing,
        "username is Missing"
      );
    } else {
      next();
    }
  },

  //create artcile validation
  createArticle: (req, res, next) => {

    const {
      title,
      publish_date,
      status,
      // content,
      file_path,
      invoice_id,
      category_id,
      createdby,
      created_date,
      updatedby,
      updated_date
    } = req.body;

    if (title == "" || title == null) {
      return response.fail(
        req,
        res,
        response.message.parameter_missing,
        "article_title is Missing"
      );
    } else if (publish_date == "" || publish_date == null) {
      return response.fail(
        req,
        res,
        response.message.parameter_missing,
        "publish_date is Missing"
      );
    } else if (status == "" || status == null) {
      return response.fail(
        req,
        res,
        response.message.parameter_missing,
        "status is Missing"
      );
    } else if (file_path == "" || file_path == null) {
      return response.fail(
        req,
        res,
        response.message.parameter_missing,
        "file_path is Missing"
      );
    } else if (invoice_id == "" || invoice_id == null) {
      return response.fail(
        req,
        res,
        response.message.parameter_missing,
        "invoice_id is Missing"
      );
    } else if (category_id == "" || category_id == null) {
      return response.fail(
        req,
        res,
        response.message.parameter_missing,
        "category_id is Missing"
      );
    } else if (createdby == "" || createdby == null) {
      return response.fail(
        req,
        res,
        response.message.parameter_missing,
        "createdby is Missing"
      );
    } else if (created_date == "" || created_date == null) {
      return response.fail(
        req,
        res,
        response.message.parameter_missing,
        "created_date is Missing"
      );
    } else if (updatedby == "" || updatedby == null) {
      return response.fail(
        req,
        res,
        response.message.parameter_missing,
        "updatedby is Missing"
      );
    } else if (updated_date == "" || updated_date == null) {
      return response.fail(
        req,
        res,
        response.message.parameter_missing,
        "updated_date is Missing"
      );
    } else {
      next();
    }
  },

  publisherCreate: (req, res, next) => {
    console.log('==============>', req.body);
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
    if (name == "" || name == null) {
      return response.fail(
        req,
        res,
        response.message.parameter_missing,
        "name is missing"
      );
    } else if (email == "" || email == null) {
      return response.fail(
        req,
        res,
        response.message.parameter_missing,
        "email is missing"
      );
    } else if (language_id == "" || language_id == null) {
      return response.fail(
        req,
        res,
        response.message.parameter_missing,
        "language_id is missing"
      );
    }
    else if (created_by == "" || created_by == null) {
      return response.fail(
        req,
        res,
        response.message.parameter_missing,
        "created_by is missing"
      );
    } else if (created_date == "" || created_date == null) {
      return response.fail(
        req,
        res,
        response.message.parameter_missing,
        "created_date is missing"
      );
    } else if (updated_by == "" || updated_by == null) {
      return response.fail(
        req,
        res,
        response.message.parameter_missing,
        "updated_by is missing"
      );
    } else if (updated_date == "" || updated_date == null) {
      return response.fail(
        req,
        res,
        response.message.parameter_missing,
        "updated_date is missing"
      );
    } else if (status == "" || status == null) {
      return response.fail(
        req,
        res,
        response.message.parameter_missing,
        "status is missing"
      );
    }
    else {
      next();
    }
  },

  articleStatusChange: (req, res, next) => {
    const { status } = req.body;
    if (status > 4) {
      return response.fail(
        req,
        res,
        response.message.parameter_missing,
        "invalid status value detected"
      );
    } else {
      next();
    }
  },

  articleupdate: (req, res, next) => {
    const { file_path } = req.body;
    if (file_path == "" || file_path == null) {
      return response.fail(
        req,
        res,
        response.message.parameter_missing,
        "file_path is empty"
      );
    } else {
      next();
    }
  },

  getInvoice: (req, res, next) => {
    const { publisher_id } = req.body;
    if (publisher_id == "" || publisher_id == null) {
      return response.fail(req, res, response.message.parameter_missing,
        "publisher_ids are Missing");

    } else {
      next();
    }
  },

  getLatestArticles: (req, res, next) => {
        const { created_by } = req.body;
        if ( created_by == "" || created_by == null){
            return response.fail(req, res, response.message.parameter_missing,
                "created_by is Missing");
     } else {
       
      next();
     }
  },
  getDashboardArticles: (req, res, next) => {
    console.log('=====================================>>>')
    const { created_by } = req.body;
    if ( created_by == "" || created_by == null){
        return response.fail(req, res, response.message.parameter_missing,
            "created_by is Missing");
 } else {
   
  next();
 }
},
  getTotalPrice: (req, res, next) => {
    const { publisher_id } = req.body;
    if (publisher_id == "" || publisher_id == null) {
      return response.fail(req, res, response.message.parameter_missing,
        "publisher_id is Missing");

    } else {
      next();
    }
  },

  createInvoice: (req, res, next) => {
    const {
      status,
      advertiser_id,
      created_by,
      created_date,
      updated_by,
      updated_date,
      publisher_id
    } = req.body;
    if (publisher_id == "" || publisher_id == null) {
      return response.fail(req, res, response.message.parameter_missing,
        "publisher_id is Missing");
    } else if (created_date == "" || created_date == null) {
      return response.fail(req, res, response.message.parameter_missing,
        "advertiser_id is Missing");
    } else {

            next();
        }
    },

    getInvoiceById: (req, res, next) => {
      const { invoice_id } = req.body;
      if ( invoice_id == "" || invoice_id == null){
          return response.fail(req, res, response.message.parameter_missing,
              "invoice_id is Missing");

      } else {
          next();
      }
  },
  getPublushersForaAnArticle: (req, res, next) => {
    const { article_id } = req.body;
    if ( article_id == "" || article_id == null){
        return response.fail(req, res, response.message.parameter_missing,
            "article_id is Missing");

    } else {
        next();
    }
}
      

}

module.exports = validator;
