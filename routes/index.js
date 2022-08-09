const express = require('express');
const router = express.Router();
const article = require('./article');
const publishers = require('./publishers');
const categories = require('./categories');
const invoice = require('./invoice');
const validator = require('./../middlewares/validator');
const plans = require('./plans');

//Publisher routes
router.get('/publisher/list', publishers.list);//list all the publishers
router.get('/allPublisher/list', publishers.listAllPublisher);//list all availble publishers
router.post('/publisher/create',validator.publisherCreate, publishers.create);//create a publisher
router.delete('/publisher/:id', publishers.delete);//delete a publisher
router.put('/publisher/update/:id', publishers.update);//update publisher details 
router.get('/publisher/view/:id', publishers.viewbyid);//vew individual article
router.post('/publisher/filter', validator.publisherFilter, publishers.publisherFilter);
router.put('/publisher/status/:id',validator.publisherStatusChange,publishers.publisherChangeStatus);//publisher status change
router.post('/publisher/get-total', validator.getTotalPrice, publishers.getTotalPrice);
router.get('/publisher/get-all-publishers', publishers.getAllPublishers);

//Article routes
router.post('/article/get-latest', validator.getLatestArticles, article.getLatestArticles); // get latest articles
router.post('/article/get-history', validator.getHistoryArticles, article.getHistoryArticles); // get hitory articles
router.put('/article/status/:id',validator.articleStatusChange,article.changeStatus);//artcile status change
router.post('/article/dashboard', validator.getDashboardArticles, article.getDashboardArticles); // get dashboard articles
router.post('/article/pub-article', validator.getPublushersForaAnArticle, article.getPublushersForaAnArticle); // get dashboard article publishers

// category routes
router.get('/article', article.list);//pending list
router.get('/article/history', article.historylist);//history list
router.post('/article/create', article.create);//create article
router.delete('/article/:id', article.delete);//delete article
//router.delete('/article/remove/:id',article.delete);//delete article which ar rejected or published
router.get('/article/view/:id', article.viewbyid);//vew individual article
router.put('/article/update/:id', article.update);//update article content 
router.put('/article/command/:id', article.approvereject);//approve or reject article 
router.post('/file/upload', article.upload);

// category routes
router.post('/category/create',categories.create);//create a new category
router.get('/allCategory/list', categories.listAllCategories);//list all availble categories
router.get('/category/list', publishers.listCategory);//list all the category
router.get('/category/admin/list', categories.listCategoryAdmin);//admin view all the category 
router.delete('/category/:id',categories.delete);//delete category 
router.put('/category/update/:id',categories.update);//update category

//language routes  
router.get('/language/list', publishers.listLanguage);//list all the language
router.get('/language/pub/:id', publishers.listLanguagePublisher);//list all the language publishers

//pricing routes
router.post('/price/create', publishers.createPrice);//create a price package
router.get('/price/list', publishers.listPrice);//list all the price packages
router.get('/price/listing', publishers.viewPrice);//list all the prices
router.put('/price/update/:id',publishers.editprice);//edit price package
router.put('/price/update/admin/:pid/:cid',publishers.updatePrice);//update price per category-publisher

//Plan routes
router.post('/plans/create', plans.create);//create a plan
router.get('/plans', plans.list);//plans list
router.get('/plans/view', plans.viewbyid);//vew individual plan
router.delete('/plans/:id', plans.delete);//delete plans
router.put('/plans/update/:id', plans.update);//update plans details 

//Invoice routes
router.post('/invoice/get-invoice', validator.getInvoice , invoice.getInvoice);
router.post('/invoice/create-invoice', validator.createInvoice, invoice.create);
router.post('/invoice/get-invoice-by-id', validator.getInvoiceById, invoice.getInvoiceById);
router.post('/invoice/get-invoice-total', validator.getInvoiceById, invoice.getInvoiceTotal);

module.exports = router;
