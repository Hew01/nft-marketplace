// db.js
const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    await mongoose.connect('mongodb+srv://20521599:2GanMDaNtY7jhxhu@imagecluster.dcojmjr.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  }
};

module.exports = { connectToDatabase };
