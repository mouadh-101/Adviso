'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasOne(models.Consultant, { foreignKey: 'userId', as: 'consultant' });
    }
  }
  User.init({
    fullName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    profilePicture: { type: DataTypes.STRING },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
