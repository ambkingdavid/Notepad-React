import mongoose from 'mongoose';

const mongoClient = async () => {
  try {
    const DBURI = process.env.MONGODB_URI;
    await mongoose.connect(DBURI);
    console.log(`Connected to MongeDb ${mongoose.connection.host}`)
  } catch (err) {
    console.log(`DATABASE connection error: ${err}`);
  }
}

export default mongoClient;
