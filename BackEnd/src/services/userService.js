require('dotenv').config();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const saltRounds = 10;

const createUserService = async (name, email, password, description) => {
    try {
        const user = await User.findOne({ name });
        if (user) {
            console.log('Duplicate username');
            return {
                EC: 0,
                EM: 'Duplicate username',
            };
        }

        // hash user password
        const hashPassword = await bcrypt.hash(password, saltRounds);
        // save user
        let result = await User.create({
            name: name,
            email: email,
            password: hashPassword,
            description: description,
            note: '',
        });
        return { result };
    } catch (error) {
        console.log(error);
        return null;
    }
};

const loginService = async (name, password) => {
    try {
        //fecth user by email
        const user = await User.findOne({ name: name });
        if (user) {
            //compare password
            const isMatchPassword = await bcrypt.compare(password, user.password);
            if (!isMatchPassword) {
                return {
                    EC: 2,
                    EM: 'Email/Password invalid',
                };
            } else {
                const payload = {
                    email: user.email,
                    name: user.name,
                };
                const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRE,
                });
                //create an access token
                return {
                    EC: 0,
                    access_token,
                    user: {
                        email: user.email,
                        name: user.name,
                    },
                };
            }
        } else {
            return {
                EC: 1,
                EM: 'Email/Password invalid',
            };
        }

        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

module.exports = {
    createUserService,
    loginService,
};
