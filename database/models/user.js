// Users Model
// 

module.exports = function (sequelize, DataTypes) {
	var User = sequelize.define("User", {
		// ATTRIBUTES
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {}
			// Insert validation
		}
	},
		{
			//ASSOCIATIONS
			classMethods: {
				// Takes in a parameter of all models
				associate: function (models) {
					User.hasOne(models.ContactList);
					User.hasMany(models.Wishlist, {
						// If user is removed, remove all associated wishlists
						onDelete: "CASCADE"
					});
				}
			}
		});
	return User;
};