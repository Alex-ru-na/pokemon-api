const { MongoClient, ObjectId } = require("mongodb");
const config = require("../config/index");

class MongoLib {
    constructor() {
        this.client = new MongoClient(config.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        this.dbName = config.mongoDb;
    }

    async connect() {
        if (!MongoLib.connection) {
            MongoLib.connection = new Promise((resolve, reject) => {
                this.client.connect(err => {
                    if (err) {
                        reject(err);
                    }
                    console.log('connected successfully to mongo');
                    resolve(this.client.db(this.dbName));
                });
            });
        }
        return MongoLib.connection;
    }

    async find(collection, query, fields, sort, limit = 0) {
        const db = await this.connect();
        return db
            .collection(collection)
            .find(query)
            .project(fields)
            .sort(sort)
            .limit(limit)
            .toArray();
    }

    async findOne(collection, id) {
        const db = await this.connect();
        return db.collection(collection).findOne({ _id: ObjectId(id) });
    }

    async insertOne(collection, data) {
        const db = await this.connect();
        return db.collection(collection).insertOne(data);
    }

    async insertMany(collection, dataArray) {
        const db = await this.connect();
        return db.collection(collection).insertMany(dataArray);
    }

    async updateOne(collection, query, data) {
        const db = await this.connect();
        return db
            .collection(collection)
            .updateOne(query, { $set: data }, { upsert: true });
    }

    async updateMany(collection, query, data) {
        const db = await this.connect();
        return db.collection(collection).updateMany(query, { $set: data });
    }

    async deleteOne(collection, id) {
        const db = await this.connect();
        return db.collection(collection).deleteOne({ _id: ObjectId(id) });
    }

    async deleteMany(collection, query) {
        const db = await this.connect();
        return db.collection(collection).deleteMany(query);
    }

    async aggregate(collection, aggregateStruct) {
        const db = await this.connect();
        return db.collection(collection).aggregate(aggregateStruct).toArray();
    }
}

module.exports = MongoLib;
