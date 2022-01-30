const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const UsersService = require('../../service/users');

passport.use(
    new BasicStrategy(async function (email, password, cb) {

        const userService = new UsersService();

        try {
            const user = await userService.getUser({ email });

            if (!user) {
                return cb(boom, boom.unauthorized(), false);
            }

            const validate = await bcrypt.compare(password, user.password)

            console.log({ validate, password, user });
            if (!validate) {
                return cb(boom.unauthorized(), false);
            }

            delete user.password;

            return cb(null, user);

        } catch (error) {
            console.log({ error });
            return cb(error);
        }

    })
);
