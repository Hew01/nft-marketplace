import { MongoClient, Db } from 'mongodb';

let dbConnection: Db | undefined;
let uri = 'mongodb+srv://20521599:2GanMDaNtY7jhxhu@imagecluster.dcojmjr.mongodb.net/?retryWrites=true&w=majority'; // Your MongoDB Atlas URI here

interface ConnectCallback {
  (error?: Error): void;
}

const database = {
  // Establish the connection to the database
  connectToDb: async (cb: ConnectCallback) => {
    try {
      const client = await MongoClient.connect(uri);
      dbConnection = client.db();
      cb();
    } catch (err) {
      console.error(err);
      cb(err);
    }
  },

  // Return the database connection to add, read, delete, update data
  getDb: () => dbConnection,
};

export default database;
