const db = require("../helpers/db");

const invoices = {

    create: (data, next) => {
         console.log("modal :", data.total);
         const query = "INSERT INTO invoice (total, status, created_by, created_date, updated_by, updated_date) VALUES ( '?', ?, ?, ?, ?, ? )";
         db.query(query, [data.total, data.status, data.created_by, data.created_date, data.updated_by, data.updated_date] , next);
         console.log(next);
     },

     createInvoicePrice: (data, next) => {
        console.log("modal :", data.price);
        const query = "INSERT INTO price_invoice (publisher_id, price, invoice_id) VALUES ( ?, ?, ? )";
        db.query(query, [data.publisher_id, data.price, data.invoice_id] , next);
        console.log(next);
    },

    getInvoiceById: (data, next) => {

        const query = "SELECT publisher.name,invoice.id as invoice_id, price_invoice.price, invoice.created_date from publisher, price_invoice, invoice where invoice.id = price_invoice.invoice_id and price_invoice.publisher_id = publisher.id and invoice.id = ?";
        db.query(query, [data.invoice_id] , next);
        console.log(next);
    },

    getInvoiceTotal: (data, next) => {
        // console.log('===================>>>',data);
        const query = "SELECT total FROM invoice where invoice.id = ? ";
        db.query(query, [data] , next);
      
    }

};
module.exports = invoices;
