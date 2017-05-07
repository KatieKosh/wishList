// 
// Contact Model
//

module.exports = function (sequelize, DataTypes) {
    var Contact = sequelize.define("Contact", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: {
                    args: true,
                    msg: "Please use a proper email address."
                }
            }
        }
    },
        {
            classMethods: {
                associate: function (models) {
                    Contact.belongsToMany(models.Contactlist, { through: "ContactContactlist" });
                }
            }
        }
        // ,
        // {
        //     // INSERT HERE ASSOCIATIONS
        //     classMethods: {
        //         associate: function (models) {
        //             Contact.belongsToMany(models.ContactList, { through: "ContactsInContactLists" });
        //         }
        //     }
        // }
    ); // END COLUMNS DEFINE
    // END TABLE DEFINE
    return Contact;
};