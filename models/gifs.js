'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gifs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Gifs.belongsTo(models.Users, {foreignKey: "userId"})
    }
  }
  Gifs.init({
    url: DataTypes.STRING,
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    comment: DataTypes.TEXT,

  }, {
    sequelize,
    modelName: 'Gifs',
  });
  return Gifs;
};