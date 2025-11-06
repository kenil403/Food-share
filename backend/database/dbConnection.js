import mongoose from "mongoose";

const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("✅ Connected to Database");
    })
    .catch((err)=>{
      console.error(`❌ Error connecting to database: ${err.message}`);
      console.error(`   Make sure MongoDB is running and MONGO_URL is correct in .env`);
      console.error(`   Current MONGO_URL: ${process.env.MONGO_URL || 'NOT SET'}`);
    });
}
export default dbConnection;