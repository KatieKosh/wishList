// 
// Item Model
//

module.exports = function (sequelize, DataTypes) {
    var Item = sequelize.define("Item", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
            // Insert validation
        },
        best_price: {
            type: DataTypes.INTEGER,
            allowNull: false
            // Insert Validation
        },
        source_name: {
            type: DataTypes.STRING,
            allowNull: false
            // Insert Validation
        },
        source_url: {
            type: DataTypes.STRING,
            allowNull: false
            // Insert Validation
        },
        img_url: {
            type: DataTypes.STRING,
            allowNull: false
            // Insert Validation
        }
    },
        {
            // ASSOCIATIONS
            classMethods: {
                associate: function (models) {
                    Item.belongsToMany(models.Wishlist, { through: "ItemWishlist" });
                }
            }
        }
    ); // END COLUMNS DEFINE
    // END TABLE DEFINE
    return Item;
};