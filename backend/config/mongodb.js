import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });

        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'shopix'
        });
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
    }
};

export default connectDB;