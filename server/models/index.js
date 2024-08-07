import { Sequelize } from 'sequelize';
import UserSchema from './user.js';
import ConsultantSchema from './consultant.js'; // Adjust if necessary
import Blacklist from './BlackLists.js';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

const User = UserSchema(sequelize);
const Consultant = ConsultantSchema(sequelize); // Adjust if necessary



const models = {
  User,
  Consultant,
  Blacklist,
};

Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models);
  }
});

export { sequelize };
export default models;
