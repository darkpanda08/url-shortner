if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const mongoose = require('mongoose')

// Mongoose options
const options = {
    dbName: 'url-short',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    poolSize: parseInt(process.env.MONGO_POOL_SIZE) || 5
}

// Connect to MongoDB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, options)

        console.log(`MongoDB Connected...💾: ${conn.connection.host}`)
    } catch (err) {
        console.error(`Error Connecting to MongoDB...⛔: ${err.message}`)
        process.exit(1)
    }
}

module.exports = connectDB