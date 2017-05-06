// Contactlist Model
// 

module.exports = function (sequelize, DataTypes) {
	var ContactList = sequelize.define("ContactList", {
		// ATTRIBUTES...?
	},
		{
			// INSERT HERE ASSOCIATIONS
			// Associations should be handled by "hasOne" in user.js.
			classMethods: {
				associate: function (models) {
					ContactList.belongsToMany(Contact, { through: "ContactsInContactLists"});
				}
			}
		});
    
    return ContactList;
};