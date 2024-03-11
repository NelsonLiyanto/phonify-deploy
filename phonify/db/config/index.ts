import { MongoClient } from "mongodb";

const connectionString = process.env.MONGODB_URL;
if (!connectionString) {
  throw new Error("MONGODB CONNECTION STRING ERROR");
}

let client: MongoClient;

export const getMongoClient = async () => {
  if (!client) {
    client = await MongoClient.connect(connectionString);
    await client.connect();
  }
  return client;
};
