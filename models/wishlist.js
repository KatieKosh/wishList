// module.exports = function(sequelize, DataTypes) {
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
//       // We're saying that we want our Author to have Posts
//       classMethods: {
//         associate: function(models) {
//           // An Author (foreignKey) is required or a Post can't be made
//           Post.belongsTo(models.Author, {
//             foreignKey: {
//               allowNull: false
//             }
//           });
//         }
//       }
//     }
//   );
//   return Post;
// };
module.exports = function(sequelize, DataTypes) {
  var Wishlist = sequelize.define("Wishlist", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
    {
      // We're saying that we want our Author to have Wishlists
      classMethods: {
        associate: function(models) {
          // An Author (foreignKey) is required or a Wishlist can't be made
          Wishlist.belongsTo(models.User, {
            foreignKey: {
              allowNull: false
            }
          });
          Wishlist.belongsToMany(models.Item, { through: "ItemWishlist"});
        }
      }
    }
  );
  return Wishlist;
};
