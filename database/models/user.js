/*
module.exports = function (sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  },
    {
      // Boiler plate, but sets methods. Associate is a function
      // Using a method, determine what needs what
      // Posts can only have one author so posts belongs to models.author (from our models dir)
      // Authors .has many posts because one author can have more than one (or none) posts.
      classMethods: {
        associate: function (models) {
          // Using additional options like CASCADE etc for demonstration
          // Can also simply do Task.belongsTo(models.User);
          Post.belongsTo(models.Author, {
            foreignKey: {
              allowNull: true
            }
          });
        }
      }
    });
  return Post;
};
*/


module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        // USER ATTRIBUTES
    });
    
};