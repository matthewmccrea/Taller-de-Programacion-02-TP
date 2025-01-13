import "dotenv/config";
import { MongoClient } from "mongodb";
import gridfsStream from "gridfs-stream";

// TODO sacar de harcode
const uri = process.env.MONGODB;

const client = new MongoClient(uri);

let instance = null;
let gfs = null;

export default async function getConnection() {
  if (instance == null) {
    try {
      instance = await client.connect();
      const db = instance.db();
      gfs = gridfsStream(db, MongoClient);

      gfs.collection('fs'); 
    } catch (error) {
      console.log(error.message);
    }
  }
  return instance;
}
