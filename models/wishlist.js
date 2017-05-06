// Wishlist Model
// 

module.exports = function (sequelize, DataTypes) {
    var Wishlist = sequelize.define("WishList", {
        // ATTRIBUTES
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
    ,
        {
            // ASSOCIATIONS
            classMethods: {
                // Joining
                associate: function (models) {
                    //Wishlist.belongsToMany(models.Item, { through: "ItemsInWishlists" });
                    Wishlist.belongsTo(models.User, {
                        foreignKey: {
                            allowNull: false
                        }
                    });
                }
            }
        }
    );

    return Wishlist;
};