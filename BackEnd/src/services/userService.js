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

const getAccountInfoService = async (name) => {
    try {
        const user = await User.findOne({ name });
        if (!user) {
            return {
                EC: 1,
                EM: 'User not found',
            };
        }

        return {
            EC: 0,
            EM: 'Get info successfully',
            info: {
                name: user.name,
                email: user.email,
                description: user.description,
                avatarPath: user.avatar,
                note: user.note,
            },
        };
    } catch (error) {
        console.log(error);
        return {
            EC: 1,
            EM: 'An error occurred',
        };
    }
};

const updateUserService = async (name, description, avatar) => {
    try {
        const user = await User.findOne({ name });
        if (!user) {
            return {
                EC: 1,
                EM: 'User not found',
            };
        }

        ///delete old avatar file
        if (user.avatar) {
            const oldAvatarPath = path.join(user.avatar);

            // Delete the old avatar file
            fs.unlink(oldAvatarPath, (err) => {
                if (err) {
                    console.error(`Failed to delete old avatar: ${err.message}`);
                } else {
                    console.log('Old avatar deleted successfully');
                }
            });
        }
        if (avatar && avatar.path) {
            user.avatar = avatar.path;
        } else {
            return {
                EC: 1,
                EM: 'Invalid avatar',
            };
        }
        ///
        user.description = description;

        await user.save();
        return {
            EC: 0,
            EM: 'User updated successfully',
            user: {
                name: user.name,
                email: user.email,
                description: user.description,
                avatar: user.avatar,
            },
        };
    } catch (error) {
        console.log(error);
        return {
            EC: 1,
            EM: 'An error occurred',
        };
    }
};

const addCourseToUserService = async (courseId, owner) => {
    try {
        const user = await User.findOne({ name: owner });
        if (!user) {
            return {
                EC: 1,
                EM: 'User not found',
            };
        }
        user.courses.push(courseId);
        await user.save();

        return {
            EC: 0,
            EM: 'Add course to user successfully',
            info: {
                name: user.name,
                courses: user.courses,
            },
        };
    } catch (error) {
        console.log(error);
        return {
            EC: 1,
            EM: 'An error occurred',
        };
    }
};

const addTermToUserService = async (termId, owner) => {
    try {
        const user = await User.findOne({ name: owner });
        if (!user) {
            return {
                EC: 1,
                EM: 'User not found',
            };
        }
        user.terms.push(termId);
        await user.save();

        return {
            EC: 0,
            EM: 'Add term to user successfully',
            info: {
                name: user.name,
                terms: user.terms,
            },
        };
    } catch (error) {
        console.log(error);
        return {
            EC: 1,
            EM: 'An error occurred',
        };
    }
};

const deleteCourseFromUserService = async (courseId, owner) => {
    try {
        const user = await User.findOne({ name: owner });
        if (!user) {
            return {
                EC: 1,
                EM: 'User not found',
            };
        }

        const courseIndex = user.courses.indexOf(courseId);
        if (courseIndex > -1) {
            user.courses.splice(courseIndex, 1);
            await user.save();
        } else {
            console.log('Course not found in user');
            return null;
        }

        return {
            EC: 0,
            EM: 'Delete course from user successfully',
            info: {
                name: user.name,
                terms: user.terms,
            },
        };
    } catch (error) {
        console.log(error);
        return {
            EC: 1,
            EM: 'An error occurred',
        };
    }
};

const deleteTermFromUserService = async (termId, owner) => {
    try {
        const user = await User.findOne({ name: owner });
        if (!user) {
            return {
                EC: 1,
                EM: 'User not found',
            };
        }

        const termIndex = user.terms.indexOf(termId);
        if (termIndex > -1) {
            user.terms.splice(termIndex, 1);
            await user.save();
        } else {
            console.log('Term not found in user');
            return null;
        }

        return {
            EC: 0,
            EM: 'Delete term from user successfully',
            info: {
                name: user.name,
                terms: user.terms,
            },
        };
    } catch (error) {
        console.log(error);
        return {
            EC: 1,
            EM: 'An error occurred',
        };
    }
};

const updateUserNoteService = async (owner, newNote) => {
    try {
        const user = await User.findOne({ name: owner });
        if (!user) return null;
        user.note = newNote;
        await user.save();
        return {
            EC: 0,
            EM: 'Update user note successfully',
            note: user.note,
        };
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createUserService,
    loginService,
    updateUserService,
    getAccountInfoService,
    addCourseToUserService,
    addTermToUserService,
    deleteCourseFromUserService,
    deleteTermFromUserService,
    updateUserNoteService,
};
