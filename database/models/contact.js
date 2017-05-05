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
    }); // END COLUMNS DEFINE; INSERT ASSOCIATIONS HERE
    // END TABLE DEFINE
};