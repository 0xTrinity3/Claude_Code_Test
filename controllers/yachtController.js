const { Yacht } = require('../models');
const { Op } = require('sequelize');

// Get all yachts with optional filtering
exports.getAllYachts = async (req, res) => {
  try {
    const {
      type,
      minPrice,
      maxPrice,
      minLength,
      maxLength,
      minYear,
      maxYear,
      builder,
      location,
      featured,
      search,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
      limit = 100,
      offset = 0
    } = req.query;

    // Build where clause
    const where = {};

    if (type) where.type = type;
    if (builder) where.builder = builder;
    if (location) where.location = { [Op.like]: `%${location}%` };
    if (featured !== undefined) where.featured = featured === 'true';

    // Price range
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price[Op.gte] = minPrice;
      if (maxPrice) where.price[Op.lte] = maxPrice;
    }

    // Length range
    if (minLength || maxLength) {
      where.length = {};
      if (minLength) where.length[Op.gte] = minLength;
      if (maxLength) where.length[Op.lte] = maxLength;
    }

    // Year range
    if (minYear || maxYear) {
      where.year = {};
      if (minYear) where.year[Op.gte] = minYear;
      if (maxYear) where.year[Op.lte] = maxYear;
    }

    // Search across multiple fields
    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { builder: { [Op.like]: `%${search}%` } },
        { location: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ];
    }

    // Execute query
    const { count, rows } = await Yacht.findAndCountAll({
      where,
      order: [[sortBy, sortOrder]],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: Math.floor(offset / limit) + 1,
      yachts: rows
    });
  } catch (error) {
    console.error('Error fetching yachts:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching yachts',
      error: error.message
    });
  }
};

// Get single yacht by ID
exports.getYachtById = async (req, res) => {
  try {
    const { id } = req.params;
    const yacht = await Yacht.findByPk(id);

    if (!yacht) {
      return res.status(404).json({
        success: false,
        message: 'Yacht not found'
      });
    }

    res.json({
      success: true,
      yacht
    });
  } catch (error) {
    console.error('Error fetching yacht:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching yacht',
      error: error.message
    });
  }
};

// Get featured yachts
exports.getFeaturedYachts = async (req, res) => {
  try {
    const { limit = 6 } = req.query;

    const yachts = await Yacht.findAll({
      where: { featured: true },
      limit: parseInt(limit),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      count: yachts.length,
      yachts
    });
  } catch (error) {
    console.error('Error fetching featured yachts:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching featured yachts',
      error: error.message
    });
  }
};

// Create new yacht
exports.createYacht = async (req, res) => {
  try {
    const yacht = await Yacht.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Yacht created successfully',
      yacht
    });
  } catch (error) {
    console.error('Error creating yacht:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating yacht',
      error: error.message
    });
  }
};

// Update yacht
exports.updateYacht = async (req, res) => {
  try {
    const { id } = req.params;
    const yacht = await Yacht.findByPk(id);

    if (!yacht) {
      return res.status(404).json({
        success: false,
        message: 'Yacht not found'
      });
    }

    await yacht.update(req.body);

    res.json({
      success: true,
      message: 'Yacht updated successfully',
      yacht
    });
  } catch (error) {
    console.error('Error updating yacht:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating yacht',
      error: error.message
    });
  }
};

// Delete yacht
exports.deleteYacht = async (req, res) => {
  try {
    const { id } = req.params;
    const yacht = await Yacht.findByPk(id);

    if (!yacht) {
      return res.status(404).json({
        success: false,
        message: 'Yacht not found'
      });
    }

    await yacht.destroy();

    res.json({
      success: true,
      message: 'Yacht deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting yacht:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting yacht',
      error: error.message
    });
  }
};

// Get statistics
exports.getStats = async (req, res) => {
  try {
    const totalYachts = await Yacht.count();
    const featuredYachts = await Yacht.count({ where: { featured: true } });

    const avgPrice = await Yacht.findAll({
      attributes: [
        [sequelize.fn('AVG', sequelize.col('price')), 'avgPrice'],
        [sequelize.fn('MIN', sequelize.col('price')), 'minPrice'],
        [sequelize.fn('MAX', sequelize.col('price')), 'maxPrice']
      ],
      raw: true
    });

    const typeDistribution = await Yacht.findAll({
      attributes: [
        'type',
        [sequelize.fn('COUNT', sequelize.col('type')), 'count']
      ],
      group: ['type'],
      raw: true
    });

    res.json({
      success: true,
      stats: {
        totalYachts,
        featuredYachts,
        pricing: avgPrice[0],
        typeDistribution
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
};
