import { config } from 'dotenv';
config();

import { MongoClient, ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';

const mongoDbUsername = encodeURIComponent(process.env.USER_NAME);
const mongoDbPassword = encodeURIComponent(process.env.USER_PASSWORD);
const uriMain = process.env.URI;
const uriMongooseMain = process.env.URI_MONGOOSE;

const uri = `mongodb+srv://${mongoDbUsername}:${mongoDbPassword}${uriMain}`;
const uriMongoose = `mongodb+srv://${mongoDbUsername}:${mongoDbPassword}${uriMongooseMain}`;

// MongoDB client
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  tls: true,
  tlsAllowInvalidCertificates: false,
});

/**@deprecated */
// const [lessons, users] = client.db(process.env.DB_NAME).collections(); // Deprecated with mongoose

export default client;
export { uriMongoose };
