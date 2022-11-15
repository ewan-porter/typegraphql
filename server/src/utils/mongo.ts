import mongoose from 'mongoose';
import config from 'config';

export async function connectToMongo() {
  console.log('connecting');

  try {
    await mongoose.connect(config.get('dbUri'));
    console.log('Connected to database');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
