// module.exports = function (sequelize, DataTypes) {
//   var Post = sequelize.define("Post", {
//     title: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         len: [1]
//       }
//     },
//     body: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//       len: [1]
//     }
//   },
//     {
//       // Boiler plate, but sets methods. Associate is a function
//       // Using a method, determine what needs what
//       // Posts can only have one author so posts belongs to models.author (from our models dir)
//       // Authors .has many posts beca 

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
        // END COLUMNS DEFINE
    });
    // END TABLE DEFINE
};