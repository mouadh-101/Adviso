'use strict';

import { Model, DataTypes } from 'sequelize';
import jwt from 'jsonwebtoken';
import { SECRET_ACCESS_TOKEN } from '../config/index.js';

class User extends Model {
  static associate(models) {
    this.hasOne(models.Consultant, { foreignKey: 'userId', as: 'consultant' });
  }

  // Define instance method within the class
  generateAccessJWT() {
    const payload = {
      id: this.id, // Use `this.id` instead of `this._id`
    };
    return jwt.sign(payload, SECRET_ACCESS_TOKEN, {
      expiresIn: '20m',
    });
  }
}

const UserSchema = (sequelize) => {
  User.init({
    fullName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    profilePicture: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users', // Make sure the table name matches your migration file
    timestamps: true // Sequelize automatically manages `createdAt` and `updatedAt` fields
  });

  return User;
};

export default UserSchema;
