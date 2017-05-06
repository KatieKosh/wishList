// module.exports = function(sequelize, DataTypes) {
//   var Author = sequelize.define("Author", {
//     // Giving the Author model a name of type STRING
//     name: DataTypes.STRING
//   },
//     // Here we'll pass a second "classMethods" object into the define method
//     // This is for any additional configuration we want to give our models
//     {
//       // We're saying that we want our Author to have Posts
//       classMethods: {
//         associate: function(models) {
//           // Associating Author with Posts
//           // When an Author is deleted, also delete any associated Posts
//           Author.hasMany(models.Post, {
//             onDelete: "cascade"
//           });
//         }
//       }
//     }
//   );
//   return Author;
// };

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // Giving the User model a name of type STRING
    name: DataTypes.STRING,
    authId: DataTypes.STRING
  },
    // Here we'll pass a second "classMethods" object into the define method
    // This is for any additional configuration we want to give our models
    {
      // We're saying that we want our User to have Posts
      classMethods: {
        associate: function(models) {
          // Associating User with Posts
          // When an User is deleted, also delete any associated Posts
          User.hasOne(models.Contactlist);
          User.hasMany(models.Wishlist, {
            onDelete: "cascade"
          });
        }
      }
    }
  );
  return User;
};
