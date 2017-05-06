// 
// Contact Model
//

module.exports = function (sequelize, DataTypes) {
    var Contact = sequelize.define("Contact", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {}
            // Insert validation
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {}
            // Insert Validation
        }
    },
        {
			// INSERT HERE ASSOCIATIONS
			classMethods: {
				associate: function (models) {
					Contact.belongsToMany(models.ContactList, { through: "ContactsInContactLists"});
				}
			}
		}); // END COLUMNS DEFINE
    // END TABLE DEFINE
    return Contact;
};