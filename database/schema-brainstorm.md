# Schema Brainstorming

## Purpose
A user-based database with room for many wishlists, contact lists, contacts and items. 

### Plain English Schema

#### Table Relations
* A User may have many wishlists. (One-to-Many)
* A User may have one contact list. (One-to-One)
* A Wishlist may have many items. (One-to-Many)
* An Item may be present in many wishlists. (Many-to-Many)
* A Contact List belongs to one user. (One-to-One)
* A contact may belong to many contact lists (One-to-Many)

#### Schema Ideas
* User
    * id
    * name
    * [(Safe for DB?) Authentication info]

* Contact 
    * id
    * Name
    * [Contact info, email, etc]

* Contact-List-User 
    * id as Contact List ID
    * User.id

* Contact-List-Table
    * 

    