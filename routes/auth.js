const express = require('express');
const passport = require('passport');


const jwt = require('jsonwebtoken');
const config = require('../config');

require('../utils/auth/basic');

function authApi(app) {
    const router = express.Router();
    app.use('/auth', router);

    router.post('/login', async function (req, res, next) {

        passport.authenticate('basic', function (error, user) {
            try {

                if (!user) {
                    //next(boom.unauthorized());
                    throw new Error("user not found");
                }

                if (error) {
                    next(error);
                    //next(boom.unauthorized());
                }

                req.login(user, { session: false }, async function (error) {
                    if (error) {
                        next(error);
                    }

                    const { _id: id, name, email } = user;
                    const payload = {
                        sub: id,
                        name,
                        email
                    }

                    const token = jwt.sign(payload, config.authJwtSecret, {
                        expiresIn: '15m'
                    });

                    return res.status(200).json({ token, user: { id, name, email } })
                })
            }
            catch (error) {
                next(error);
            }
        })(req, res, next);
    })
}

module.exports = authApi;