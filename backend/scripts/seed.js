const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MenuItem = require('../models/MenuItem');
const User = require('../models/User');

dotenv.config({
  path: '../.env'
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/yummy-restaurant');
    console.log('MongoDB Connected for seeding');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

const seedMenuItems = [
  {
    name: 'Classic Burger',
    description: 'Juicy beef patty with fresh vegetables and special sauce',
    price: 12.99,
    category: 'Lunch',
    image: 'https://via.placeholder.com/300x200?text=Classic+Burger',
    available: true
  },
  {
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with Caesar dressing and parmesan',
    price: 9.99,
    category: 'Lunch',
    image: 'https://via.placeholder.com/300x200?text=Caesar+Salad',
    available: true
  },
  {
    name: 'Pasta Carbonara',
    description: 'Creamy pasta with bacon and parmesan cheese',
    price: 14.99,
    category: 'Dinner',
    image: 'https://via.placeholder.com/300x200?text=Pasta+Carbonara',
    available: true
  },
  {
    name: 'Pancakes Stack',
    description: 'Fluffy pancakes with maple syrup and butter',
    price: 8.99,
    category: 'Breakfast',
    image: 'https://via.placeholder.com/300x200?text=Pancakes',
    available: true
  },
  {
    name: 'Chocolate Cake',
    description: 'Rich chocolate cake with vanilla frosting',
    price: 6.99,
    category: 'Desserts',
    image: 'https://via.placeholder.com/300x200?text=Chocolate+Cake',
    available: true
  },
  {
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice',
    price: 3.99,
    category: 'Drinks',
    image: 'https://via.placeholder.com/300x200?text=Orange+Juice',
    available: true
  },
  {
    name: 'Grilled Salmon',
    description: 'Fresh salmon with lemon and herbs',
    price: 18.99,
    category: 'Dinner',
    image: 'https://via.placeholder.com/300x200?text=Grilled+Salmon',
    available: true
  },
  {
    name: 'Eggs Benedict',
    description: 'Poached eggs on English muffin with hollandaise sauce',
    price: 11.99,
    category: 'Breakfast',
    image: 'https://via.placeholder.com/300x200?text=Eggs+Benedict',
    available: true
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing menu items
    await MenuItem.deleteMany({});
    console.log('Cleared existing menu items');

    // Insert seed menu items
    const menuItems = await MenuItem.insertMany(seedMenuItems);
    console.log(`Inserted ${menuItems.length} menu items`);

    // Create admin user if it doesn't exist
    const adminExists = await User.findOne({ email: 'admin@yummy.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@yummy.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('Created admin user: admin@yummy.com / admin123');
    } else {
      console.log('Admin user already exists');
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
