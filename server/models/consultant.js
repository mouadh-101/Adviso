import { Model, DataTypes } from 'sequelize';

class Consultant extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }
}

const ConsultantSchema = (sequelize) => {
  Consultant.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    specialization: { type: DataTypes.STRING },
    bio: { type: DataTypes.TEXT },
    experience: { type: DataTypes.INTEGER },
    portfolio: { type: DataTypes.JSON },
    rate: { type: DataTypes.FLOAT },
  }, {
    sequelize,
    modelName: 'Consultant',
  });

  return Consultant;
};

export default ConsultantSchema;
