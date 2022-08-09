const db = require("../helpers/db");

const publisher = {
  //create a publisher
  create: (userData, next) => {

    const query = "INSERT INTO publisher (name, language_id, created_by, created_date, updated_by, updated_date, status) VALUES ('" + userData.name + "', '" + userData.language_id + "', '" + userData.created_by + "','" + userData.created_date + "', '" + userData.updated_by + "', '" + userData.updated_date + "', '" + userData.status + "')";
    db.query(query, null, next);
  },

  //list all publishers
  list: (data, next) => {
    const query = "select publisher.id, publisher.name as pub_name, language.name as lang_name, email.content as email from  language, publisher, email where language.id = publisher.language_id and publisher.id = email.publisher_id and publisher.status = 1;";
    db.query(query, null, next);
  },

  //list availble publishers
  listAllPublisher: (data, next) => {
    const query = "SELECT publisher.name as pub_name, publisher.id as pub_id from publisher WHERE status = 1;";
    db.query(query, null, next);
  },

  //delete publishers ( changing the status to 4)
  delete: (id, next) => {
    const query = "UPDATE publisher SET status= 4 WHERE id =" + id + "";
    db.query(query, null, next);
  },


  changepublisherstatus: (userData, next) => {
    const query = "UPDATE publisher SET status = ? WHERE id = ?";
    db.query(query, [userData.status, userData.id], next);
  },

  update: (userData, next) => {
    console.log(userData);

    //updating email of the publisher
    const query = "UPDATE email SET content = '" + userData.email + "' WHERE publisher_id =" + userData.id + "";
    db.query(query, null, next);
  },


  //view individual publisher
  viewbyid: (id, next) => {
    const query = "select publisher.id, publisher.name as pub_name, language.name as lang_name, email.content as email  from publisher, email, language where publisher.id = email.publisher_id and language.id = publisher.language_id and  publisher.id = " + id + " ";

    db.query(query, null, next);
  }
  ,
  //passing publisher email to the email table
  emailCreate: (emailData, next) => {

    const query = "INSERT INTO email (publisher_id,created_by,created_date,content,updated_date,status) VALUES (" + emailData.db_id + ", 'admin', '2018-09-09', '" + emailData.email + "','2018-08-21', 2 )";

    db.query(query, null, next);
  },

  categoryCreate: (data, next) => {
    console.log(data);
    const query = "INSERT INTO category(name, created_by, created_date, updated_by, updated_date, status) VALUES ('" + data.name + "', '" + data.created_by + "', '" + data.created_date + "', '" + data.updated_by + "', '" + data.updated_date + "', " + data.status + ")";
    db.query(query, null, next);
  },

  listCategory: (next) => {

    const query = "SELECT category.id AS cat_id, category.name AS cat_name, language.name AS lang_name, COUNT(publisher.id) as no_publishers FROM category, language, publisher,pricing WHERE category.id = pricing.category_id  AND publisher.id = pricing.publisher_id  AND language.id = publisher.language_id GROUP BY category.id;";
    db.query(query, null, next);
  },

  // price for category per publisher
  createPrice: (data, next) => {
    console.log(data)
    const query = "INSERT INTO pricing(price, publisher_id, category_id, created_by, created_date) VALUES ('" + data.price + "', '" + data.publisher_id + "', '" + data.category_id + "', 'admin', '" + data.created_date + "')";
    db.query(query, null, next);
  },

  listLanguage: (data, next) => {
    const query = "select language.id, language.name, count(publisher.id) as no_articles from language, publisher where language.id = publisher.language_id group by language_id";
    db.query(query, null, next);
  },

  listLanguagePublisher: (id, next) => {
    const query = "select publisher.name as pub_name from publisher, language where publisher.language_id = language.id and language.id =" + id + "";
    db.query(query, null, next);
  }
  ,
  // list price per publisher and category
  viewPrice: (id, next) => {
    const query = "select publisher.name as pub_name, category.name as cat_name, pricing.price, pricing.publisher_id as pid , pricing.category_id as cid from pricing, publisher, category where publisher.id = pricing.publisher_id and pricing.category_id = category.id";

   // const query = "select publisher.name as pub_name, category.name as cat_name, pricing.price  from pricing, publisher, category where publisher.id = pricing.publisher_id and pricing.category_id = category.id;";
    db.query(query, null, next);
  },

  // list price per publisher
  listPrice: (id, next) => {
    const query = "select publisher.name as pub_name, category.name as cat_name, pricing.price, pricing.publisher_id as pid , pricing.category_id as cid from pricing, publisher, category where publisher.id = pricing.publisher_id and pricing.category_id = category.id";

   // const query = "select publisher.name as pub_name, category.name as cat_name, pricing.price  from pricing, publisher, category where publisher.id = pricing.publisher_id and pricing.category_id = category.id;";
    db.query(query, null, next);
  }
  ,

  //get price for create invoice
  getPrices:(data, next) => {
    const query =  "SELECT pricing.publisher_id, pricing.category_id, pricing.price, publisher.name FROM pricing INNER JOIN publisher ON pricing.publisher_id = publisher.id where pricing.category_id = '"+data.category_id+"' AND pricing.publisher_id in ( "+data.publisher_id+" ) ;";
    db.query(query, null, next);
  }
  ,

  getPrice:(data, next) => {
    //const query =  "SELECT pricing.publisher_id, pricing.category_id, pricing.price, publisher.name FROM pricing INNER JOIN publisher ON pricing.publisher_id = publisher.id where pricing.category_id = '"+data.category_id+"' AND pricing.publisher_id in ( "+data.publisher_id+" ) ;";
    const query =  "SELECT pricing.id, pricing.publisher_id, publisher.name, publisher.image, pricing.category_id, pricing.price, category.name as cat_name, language.name as lang_name FROM pricing INNER JOIN publisher ON pricing.publisher_id = publisher.id INNER JOIN language ON language.id = publisher.language_id INNER JOIN category on category.id = pricing.category_id where pricing.id in ( "+data.publisher_id+" ) ;";
    db.query(query, null, next);
  }
  ,
  // update price publisher - category
  updatePrice: (data, next) => {
    console.log(data.price)
    //UPDATE pricing SET price = "1200", updated_by="admin", updated_date= "2018-05-29 00:00:00" WHERE category_id = "18" AND publisher_id = "6";
    const query = "UPDATE pricing SET price = " + data.price + ", updated_by = 'admin', updated_date = '" + data.updated_date + "' WHERE  publisher_id = " + data.pid + " AND category_id = " + data.cid + "";

    db.query(query, null, next);
  },

  editprice: (data, next) => {

    const query = "UPDATE pricing SET price = " + data.price + " WHERE category_id =" + data.id + "";
    db.query(query, null, next);
  }
  ,

  filter: (data, next) => {
    const query = "select publisher.id , publisher.name , publisher.language_id , publisher.image , pricing.price from publisher inner join pricing on publisher.id = pricing.publisher_id where publisher.language_id =? and pricing.category_id =?;";
    db.query(query, [data.language_id, data.category_id], next);
  }
  ,

  getTotal:(data, next) => {
    const query =  "SELECT sum(pricing.price) as total from pricing where pricing.publisher_id in ( "+data.publisher_id+" ) and pricing.category_id = '"+data.category_id+"' ;";
    db.query(query, null, next);
  }
  ,

  getAllPublishers:(next) => {
    const query =  "select publisher.id ,  pricing.id as price_id, publisher.name , publisher.language_id, language.name as lang_name, pricing.category_id, publisher.image , pricing.price from publisher inner join pricing on publisher.id = pricing.publisher_id inner join language on language.id = publisher.language_id order by pricing.category_id;";
    db.query(query, null , next);
  }
  
};

module.exports = publisher;
