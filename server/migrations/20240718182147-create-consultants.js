'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Consultants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      specialization: {
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.TEXT
      },
      experience: {
        type: Sequelize.INTEGER
      },
      portfolio: {
        type: Sequelize.JSON
      },
      rate: {
        type: Sequelize.FLOAT
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Consultants');
  }
};
