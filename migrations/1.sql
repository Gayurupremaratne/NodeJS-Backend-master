alter table publisher add image varchar(255);

CREATE TABLE price_invoice (
    id int NOT NULL auto_increment,
    publisher_id int NOT NULL,
    price int,
    invoice_id int not null,
    PRIMARY KEY (id),
    FOREIGN KEY (invoice_id) REFERENCES invoice(id)
);

ALTER TABLE `invoice` 
DROP FOREIGN KEY `fk_invoice_advertisor1`;
ALTER TABLE `invoice` 
DROP COLUMN `advertiser_id`,
DROP INDEX `fk_invoice_advertisor1_idx` ;

ALTER TABLE `article` 
ADD COLUMN `file_path` VARCHAR(255) NULL AFTER `updated_date`;

ALTER TABLE `publisher_article` 
CHANGE COLUMN `id` `id` INT(11) NOT NULL AUTO_INCREMENT FIRST,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`id`, `publisher_id`, `article_id`);

ALTER TABLE `studio`.`pricing` 
ADD COLUMN `id` INT NOT NULL AFTER `status`,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`publisher_id`, `category_id`, `id`);


ALTER TABLE `studio`.`pricing` 
CHANGE COLUMN `id` `id` INT(11) NOT NULL AUTO_INCREMENT FIRST,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`id`, `publisher_id`, `category_id`);
