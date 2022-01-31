const express = require('express');
const passport = require('passport');
const jwt_decode = require('jwt-decode');

// local modules
const { createUserSchema } = require('../utils/schemas/users');
const validationHandler = require('../utils/middleware/validationHandler');
const UserService = require('../service/users');

//JWT strategy
require('../utils/auth/jwt');

function UserApi(app) {
    const router = express.Router();
    app.use('/users', router);

    const userService = new UserService();

    router.get('/', passport.authenticate('jwt', { session: false }), async function (req, res, next) {

        try {
            let token = req.headers.authorization.split(' ')[1]
            let decoded = jwt_decode(token);
            let email = decoded.email

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

            console.log({ user });

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
