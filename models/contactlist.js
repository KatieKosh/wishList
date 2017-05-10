// Contactlist Model

module.exports = function (sequelize, DataTypes) {
	var Contactlist = sequelize.define("Contactlist", {
		// ATTRIBUTES
	},
		{
			classMethods: {
				associate: function (models) {
					Contactlist.belongsTo(models.User, {
						foreignKey: {
							allowNull: false
						}
					});
					Contactlist.belongsTo(models.User);
					Contactlist.belongsToMany(models.Contact, { through: "ContactContactlist"});
				}
			}
		}
	);

	return Contactlist;
};