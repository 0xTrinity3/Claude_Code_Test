const { sequelize } = require('../config/database');
const Yacht = require('./Yacht');

// Initialize all models
const models = {
  Yacht
};

// Sync database
const syncDatabase = async (force = false) => {
  try {
    await sequelize.sync({ force });
    console.log('✅ Database synced successfully.');
  } catch (error) {
    console.error('❌ Error syncing database:', error);
    throw error;
  }
};

module.exports = {
  sequelize,
  models,
  syncDatabase,
  Yacht
};
