# Schema Brainstorming

## Purpose
A user-based database with room for many wishlists, contact lists, contacts and items. 

### Plain English Schema

#### Table Relations
* A User may have many wishlists. (One-to-Many)
    * A wishlist belongs to one user. 
* A User may have one contact list. (One-to-One)
    * A Contact List belongs to one user.
* An Item may be present in many wishlists. (Many-to-Many)
    * (A wishlist may have many items)
* A contact may belong to many contact lists (One-to-Many)

#### Schema Overview, sans attributes/columns
* User
    * id
* Item
    * id
* Contact
    * id
* WishList
    * id
    * User.id (who this belongs to)
* ContactList
    * id
    * User.id (who this belongs to)
* JOIN: Items in which list?
    * id (individual item and wishList row, useful for "added date" etc.)
    * WishList.id
    * Item.id
* JOIN: Who's in a contact list?
    * id
    * ContactList.id
    * Contact.id

This should handle every relation we need.
    