const { syncDatabase, Yacht } = require('./models');
const yachtsData = require('./data/yachtsData');

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seed...');

    // Sync database (force: true will drop existing tables)
    await syncDatabase(true);

    // Insert yacht data
    console.log(`📊 Inserting ${yachtsData.length} yachts...`);

    for (const yachtData of yachtsData) {
      await Yacht.create(yachtData);
      console.log(`✅ Created yacht: ${yachtData.name}`);
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`🎉 Database seeded successfully!`);
    console.log(`📈 Total yachts: ${yachtsData.length}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
