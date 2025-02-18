require('dotenv').config();
const Tag = require('../models/tag');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { getAccountInfoService } = require('./userService');
const User = require('../models/user');
const { userInfo } = require('os');
const Course = require('../models/course');

const createTagService = async (owner, name, color) => {
    try {
        const user = await User.findOne({ name: owner });
        if (!user) {
            return;
        }
        const tag = await Tag.findOne({ name: name, owner: user._id });
        if (tag) {
            console.log('Duplicate tag name');
            return {
                EC: 0,
                EM: 'Duplicate tag name',
            };
        }

        // save tag
        let result = await Tag.create({
            owner: user._id,
            name: name,
            color: color,
        });
        return { result };
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getTagsInfoService = async (owner) => {
    try {
        const user = await User.findOne({ name: owner });
        if (!userInfo) {
            console.log('Khong tim thay user');
            return {
                EC: 0,
                EM: 'Khong tim thay user',
            };
        }
        let result = await Tag.find({ owner: user._id });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getTagsInfoByIdsService = async (owner, tagsIds) => {
    try {
        let result = await Tag.find({ _id: { $in: tagsIds } });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const deleteTagByIdService = async (tagId) => {
    try {
        // Delete the tag by its ID
        let tagResult = await Tag.findByIdAndDelete(tagId);

        // If the tag is deleted successfully, proceed to update the courses
        if (tagResult) {
            // Update all courses by removing the deleted tagId from their tags array
            let courseResult = await Course.updateMany(
                { tags: tagId }, // Find courses that contain this tagId
                { $pull: { tags: tagId } }, // Remove the tagId from the tags array
            );

            return tagResult; // Return both results
        }

        // If no tag was deleted, return null
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
};

// const updateTagService = async (name, description, avatar) => {
//     try {
//         const user = await User.findOne({ name });
//         if (!user) {
//             return {
//                 EC: 1,
//                 EM: 'User not found',
//             };
//         }

//         ///delete old avatar file
//         if (user.avatar) {
//             const oldAvatarPath = path.join(user.avatar);

//             // Delete the old avatar file
//             fs.unlink(oldAvatarPath, (err) => {
//                 if (err) {
//                     console.error(`Failed to delete old avatar: ${err.message}`);
//                 } else {
//                     console.log('Old avatar deleted successfully');
//                 }
//             });
//         }
//         ///
//         user.description = description;

//         if (avatar && avatar.path) {
//             user.avatar = avatar.path;
//         } else {
//             return {
//                 EC: 1,
//                 EM: 'Invalid avatar',
//             };
//         }

//         await user.save();
//         return {
//             EC: 0,
//             EM: 'User updated successfully',
//             user: {
//                 name: user.name,
//                 email: user.email,
//                 description: user.description,
//                 avatar: user.avatar,
//             },
//         };
//     } catch (error) {
//         console.log(error);
//         return {
//             EC: 1,
//             EM: 'An error occurred',
//         };
//     }
// };

const getCourseStatisticsByTagService = async (owner) => {
    try {
        const user = await User.findOne({ name: owner });
        if (!user) return null;

        // Tìm tất cả các tag của user
        const tags = await Tag.find({ owner: user._id });
        if (tags.length === 0) return [];

        const statistics = [];

        for (const tag of tags) {
            const tagNumber = await Course.countDocuments({ tags: tag._id });
            statistics.push({
                tag: tag,
                tagNumber: tagNumber,
            });
        }

        return statistics;
    } catch (error) {
        console.error('Error fetching course statistics:', error);
        return null;
    }
};

module.exports = {
    createTagService,
    // updateTagService,
    getTagsInfoService,
    getTagsInfoByIdsService,
    deleteTagByIdService,
    getCourseStatisticsByTagService,
};
