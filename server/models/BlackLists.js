import { Model, DataTypes, Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false, 
  });

class Blacklists extends Model {}

Blacklists.init({
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users', // Name should match the table name in the database
      key: 'id',
    },
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Blacklist',
  timestamps: true, // Automatically adds `createdAt` and `updatedAt`
});



export default Blacklists;
