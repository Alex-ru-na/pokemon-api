const express = require('express');
const UserService = require('../service/users');
const passport = require('passport');
//import jwt_decode from "jwt-decode";
const jwt_decode = require('jwt-decode');

const {
    userIdSchema,
    createUserSchema
} = require('../utils/schemas/users');

const validationHandler = require('../utils/middleware/validationHandler');


//JWT strategy
require('../utils/auth/jwt');

function UserApi(app) {
    const router = express.Router();
    app.use('/users', router);

    const userService = new UserService();

    router.get('/', passport.authenticate('jwt', { session: false }), async function (req, res, next) {
        let token = req.headers.authorization.split(' ')[1]
        let decoded = jwt_decode(token);
        let email = decoded.email


        try {
            const users = await userService.getUsers({ email });
            res.status(200).json({
                users
            });

        } catch (err) {
            console.log(err);
            res.status(404).json({
                error: 'Not found'
            });
        }
    });


    router.post('/create', validationHandler(createUserSchema), async function (req, res, next) {
        try {
            const { body: user } = req;

            const createdUserId = await userService.createUser({ user });

            res.status(201).json({
                data: createdUserId,
                message: 'user created'
            });
        } catch (err) {
            next(err);
        }
    });


}

module.exports = UserApi;
