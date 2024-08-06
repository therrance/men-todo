const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'task-manager';
let db;

const connectToDB = async () => {
    if (!db) {
        try {
            const client = new MongoClient(url);
            await client.connect();
            db = client.db(dbName);
        } catch (error) {
            console.error('Failed to connect to the database', error);
            throw error;
        }
    }
    return db;
};

module.exports = connectToDB;