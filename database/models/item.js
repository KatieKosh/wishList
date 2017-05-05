// 
// Item Model
//

module.exports = function (sequelize, DataTypes) {
    var Item = sequelize.define("Item", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {}
            // Insert validation
        },
        best_price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {}
            // Insert Validation
        },
        source_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {}
            // Insert Validation
        },
        source_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {}
            // Insert Validation
        },
        img_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {}
            // Insert Validation
        }   
    },
    {
        // ASSOCIATIONS
    }); // END COLUMNS DEFINE
    // END TABLE DEFINE
    return Item;
};