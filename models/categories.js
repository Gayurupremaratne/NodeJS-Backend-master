const db = require("../helpers/db");

const categories = {

  create: (data, next) => {
    //console.log(data);
    const query = "INSERT INTO category(name, created_by, created_date) VALUES ('" + data.Name + "','admin', '" + data.created_date + "' )";
    //const query="INSERT INTO category (name) VALUES('"+ data.Name +"')"; 
    db.query(query, null, next);
  },
  //list availble categories
  listAllCategories: (data, next) => {
    const query = "SELECT category.name as cat_name, category.id as cat_id from category WHERE status = 1;;";
    db.query(query, null, next);
  },

  //delete category  
  delete: (id, next) => {
    console.log(id)

    const query = "UPDATE category SET status= 0 WHERE id =" + id + "";
    db.query(query, null, next);
  },


  //update category name
  update: (userData, next) => {
    //updating category 
    const query = "UPDATE category SET name = '" + userData.name + "', updated_by='admin', updated_date= '" + userData.updated_date + "' WHERE id =" + userData.id + "";
    db.query(query, null, next);
  },

  listCategoryAdmin: (next) => {
    const query = "SELECT category.name AS cat_name,category.status AS status, language.name AS lang_name, category.id as id, COUNT(publisher.id) as no_publishers FROM category, language, publisher,pricing WHERE category.id = pricing.category_id AND category.status='1' AND publisher.id = pricing.publisher_id  AND language.id = publisher.language_id GROUP BY category.name, language.name";
    db.query(query, null, next);
  },
};

module.exports = categories;
