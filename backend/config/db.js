const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // We will use a local mongodb connection if MONGO_URI is not provided in .env
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
