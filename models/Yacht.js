const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Yacht = sequelize.define('Yacht', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  builder: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('motor', 'sailing', 'catamaran', 'expedition'),
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1900,
      max: 2100
    }
  },
  length: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment: 'Length in feet'
  },
  beam: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment: 'Beam in feet'
  },
  draft: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment: 'Draft in feet'
  },
  guests: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cabins: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  crew: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  speed: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment: 'Maximum speed in knots'
  },
  price: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  features: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: []
  },
  images: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  status: {
    type: DataTypes.ENUM('available', 'sold', 'pending', 'charter'),
    defaultValue: 'available'
  }
}, {
  tableName: 'yachts',
  indexes: [
    {
      fields: ['type']
    },
    {
      fields: ['price']
    },
    {
      fields: ['featured']
    },
    {
      fields: ['builder']
    }
  ]
});

module.exports = Yacht;
