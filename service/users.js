const MongoLib = require('../lib/mongo');

const bcrypt = require('bcrypt');


class UsersService {

    constructor() {
        this.collection = 'users';
        this.mongoDB = new MongoLib();
    }

    async getUsers({ email }) {

        const query = null;//email && { email: { $ne: email } };
        const users = await this.mongoDB.getAll(this.collection, query);

        for (let user of users) {
            delete user.password;
        }
        return users || [];
    }

    async getUser({ email }) {
        try {
            const [user] = await this.mongoDB.find(this.collection, { email }, { _id: true, name: true, email: true, password: true }, null, 1);
            return user;
        } catch (error) {
            return { error }
        }

    }

    async getUserbyId({ userId }) {
        const user = await this.mongoDB.get(this.collection, userId);
        return user || {};
    }

    async createUser({ user }) {
        const { name, email, password, isAdmin, abilities } = user;
        const hashedPassword = await bcrypt.hash(password, 10);

        const createUserId = await this.mongoDB.create(this.collection, {
            name,
            email,
            password: hashedPassword,
            isAdmin,
            abilities
        });

        return createUserId;
    }
}

module.exports = UsersService;