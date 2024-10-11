import mongoose from "mongoose";

type ConnectObject = {
    isConnected?: number;
}

const connection: ConnectObject = {};

async function dbConnect(): Promise<void> {
    if (connection.isConnected){
        console.log("Using existing connection");
        return;
    }
    
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '', {})
        connection.isConnected = db.connections[0].readyState
        console.log("DB connected successfully");
    }
    catch (error) {
        process.exit(1); // gracefully exit the application if there is an error
        console.log("DB connection failed", error);
    }
}

export default dbConnect;