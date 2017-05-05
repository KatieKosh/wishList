// Wishlist Model
// 

module.exports = function (sequelize, DataTypes) {
    var Wishlist = sequelize.define("WishList", {
        // ATTRIBUTES
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
        {
            // INSERT HERE ASSOCIATIONS
        }
    );

    return Wishlist;
};