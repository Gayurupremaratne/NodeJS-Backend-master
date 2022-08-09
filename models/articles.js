const db = require("../helpers/db");

const articles = {


  create: (data, next) => {

    const query = "INSERT INTO article (title, publish_date, status, file_path, invoice_id, category_id, created_by, created_date, updated_by, updated_date) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )";
    db.query(query, [data.title, data.publish_date, data.status, data.file_path, data.invoice_id, data.category_id, data.created_by, data.created_date, data.updated_by, data.updated_date], next);

  },

  createPublisherArticle: (data, next) => {

    const query = "INSERT INTO publisher_article (publisher_id, article_id ) VALUES ( ?, ? )";
    db.query(query, [data.publisher_id, data.article_id], next);

  },

  changestatus: (data, next) => {

    const query = "UPDATE article SET status = ? WHERE id =?";

    db.query(query, [data.status, data.id], next);
  },

  delete: (id, next) => {
    const query = "UPDATE article SET status = '4' WHERE id =" + id + "";

    db.query(query, null, next);
  },

  //view 'pending' articles list
  list: next => {
    const query = "select article.title, article.id, article.created_by, article.status, publisher.name from article, publisher, publisher_article where article.id = publisher_article.article_id AND publisher.id = publisher_article.publisher_id AND article.status = 0";
    db.query(query, null, next);
  },

  //view aticle history list (published/ rejected/ approved)
  historylist: next => {
    const query = "select article.title, article.id, article.created_by,article.created_date, article.publish_date ,article.status, publisher.name from article, publisher, publisher_article where article.id = publisher_article.article_id AND publisher.id = publisher_article.publisher_id AND article.status =1";
    db.query(query, null, next);
  },

  update: (data, next) => {
    const query = "UPDATE article SET status=?, publish_date=?, title=?, file_path=?, updated_date=? WHERE id = ?";
    db.query(query, [data.status, data.publish_date, data.title, data.file_path, data.updated_date, data.id], next);
  },



  approvereject: (id, status, next) => {
    const query = "UPDATE article SET status = ? WHERE id = ?";
    db.query(query, [status, id], next);
  },


  viewbyid: (id, next) => {
    const query = "SELECT * FROM article WHERE id =" + id + "";
    db.query(query, null, next);
  },

  getLatest: (data, next) => {
    const query = "SELECT article.id as article_id, article.created_date, article.invoice_id, category.name AS category, publisher.name AS pub_name, language.name AS language FROM article, category, publisher_article, publisher, language WHERE article.created_by = ? AND category.id = article.category_id AND article.status = ? AND article.id = publisher_article.article_id AND publisher.id = publisher_article.publisher_id AND publisher.language_id = language.id ORDER BY article.created_date DESC;";
    db.query(query, [data.created_by, data.status], next);
  },

  getDashboard: (data, next) => {
    const query = "SELECT article.id  as article_id, article.title as article_title,article.created_date, article.invoice_id as invoice, category.name AS category, publisher.name AS pub_name,article.status as status, language.name AS language FROM article, category, publisher_article, publisher, language WHERE article.created_by = ? AND article.status NOT LIKE '0' AND category.id = article.category_id AND article.id = publisher_article.article_id AND publisher.id = publisher_article.publisher_id AND publisher.language_id = language.id ORDER BY article.created_date DESC";
    db.query(query, data.created_by, next);
  },

  getPublushersForaAnArticle: (data, next) => {
    const query = "SELECT publisher.name  AS publisher,publisher.image AS image, price_invoice.price, price_invoice.invoice_id AS invoice_id, language.name AS language FROM price_invoice, publisher, language WHERE price_invoice.publisher_id = publisher.id AND language.id = publisher.language_id";
    db.query(query, data.article_id, next);
  },

  getHistory: (data, next) => {
    const query = "SELECT * FROM article WHERE created_by = ? AND (status = 1 OR status = 2 OR status = 4 OR status = 3 OR status=5) ORDER BY id DESC";
    db.query(query, data.username, next);
  },
};

module.exports = articles;
