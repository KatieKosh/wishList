-- Proposed Schema

-- CREATE DATABASE WishListApp_test_db;
-- USE WishListApp_test_db;
-- CREATE DATABASE WishListApp_db;
-- USE WishListApp_db;

CREATE TABLE User (
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id)
    -- User attributes
);

CREATE TABLE Item (
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    -- Item Attributes
    name VARCHAR(255) NOT NULL,
    best_price INT NOT NULL,
    source_url VARCHAR(255) NOT NULL,
    source_name VARCHAR(255) NOT NULL,
    img_url VARCHAR(255)
);

CREATE TABLE Contact (
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    -- Contact Attributes
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL -- Include validations
);

CREATE TABLE WishList (
    id INT NOT NULL AUTO_INCREMENT,
    userId INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES User(id),
    -- WishList Attributes
    name VARCHAR(255) DEFAULT "Wishlist"
);

CREATE TABLE ContactList (
    id INT NOT NULL AUTO_INCREMENT,
    userId INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (userId) REFERENCES User(id)
    -- Contact List Attributes
);

