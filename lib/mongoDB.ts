import mongoose from "mongoose";

const connection: { isConnected?: number } = {};
const baseURL = process.env.MONGODB_URI;

const connectMongoDB = async () => {
	if (connection.isConnected) {
		return;
	}

	try {
		const db = await mongoose.connect(baseURL!);
		connection.isConnected = db.connections[0].readyState;
		console.log("Connected to MongoDB.");
	} catch (error) {
		console.log(error);
	}
};

export default connectMongoDB;
