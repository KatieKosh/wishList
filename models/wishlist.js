// Wishlist Model

module.exports = function (sequelize, DataTypes) {
	var Wishlist = sequelize.define("Wishlist", {
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		category: {
			type: DataTypes.STRING,
			allowNull: false
		},
	},
		{
			classMethods: {
				associate: function (models) {
					Wishlist.belongsTo(models.User, {
						foreignKey: {
							allowNull: false
						}
					});
					Wishlist.belongsToMany(models.Item, { through: "ItemWishlist" });
				}
			}
		}
	);
	return Wishlist;
};
