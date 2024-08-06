const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'task-manager';
let db;

const connectToDB = async () => {
    if (!db) {
        const client = new MongoClient(url, { useUnifiedTopology: true });
        await client.connect();
        db = client.db(dbName);
    }
    return db;
};

module.exports = connectToDB;