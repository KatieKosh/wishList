-- Proposed Schema

CREATE DATABASE WishListApp;
USE WishListApp;

CREATE TABLE User (
    userId INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (userId)
    -- User attributes
);

CREATE TABLE Item (
    itemId INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (itemId)
    -- Item Attributes
);

CREATE TABLE Contact (
    contactId INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (contactId)
    -- Contact Attributes
);

CREATE TABLE WishList (
    wishListId INT NOT NULL AUTO_INCREMENT,
    userId INT NOT NULL,
    PRIMARY KEY (wishListId),
    FOREIGN KEY (userId) REFERENCES User(userId)
    -- WishList Attributes
);

CREATE TABLE ContactList (
    contactListId INT NOT NULL AUTO_INCREMENT,
    userId INT NOT NULL,
    PRIMARY KEY(contactListId),
    FOREIGN KEY (userId) REFERENCES User(userId)
    -- Contact List Attributes
);

