# Schema Brainstorming

## Purpose
A user-based database with room for many wishlists, contact lists, contacts and items. 

### Plain English Schema

#### Table Relations
* A User may have many wishlists.
* A User may have one contact list.
* A Wishlist may have many items.
* An Item may be present in many wishlists.
* A Contact List belongs to one user.
* A contact may belong to many contact lists

#### Schema Ideas
* User
    * id
    * name
    * [(Safe for DB?) Authentication info]
    