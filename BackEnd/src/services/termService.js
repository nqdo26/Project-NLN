require('dotenv').config();
const Term = require('../models/term');
const Course = require('../models/course');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const { addCourseService, removeCourseService, removeTermService } = require('./sharedService');
const { addTermToUserService, deleteTermFromUserService } = require('./userService');

const createTermService = async (owner, emoji, color, cover, name, description, startDate, endDate) => {
    try {
        const term = await Term.findOne({ name });
        if (term) {
            console.log('Duplicate course name');
            return {
                EC: 0,
                EM: 'Duplicate course name',
            };
        }
        let coverPath = '';
        if (cover) {
            coverPath = cover.path;
        }

        // save course
        let result = await Term.create({
            owner: owner,
            emoji: emoji,
            color: color,
            cover: coverPath,
            name: name,
            description: description,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            note: '',
        });

        const termId = result._id;
        await addTermToUserService(termId, owner);
        return { result };
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getTermsInfoService = async (owner) => {
    try {
        let result = await Term.find({ owner: owner });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getTermInfoService = async (termId) => {
    try {
        let result = await Term.findById(termId);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const deleteTermService = async (owner, termId) => {
    try {
        let result = await Term.findByIdAndDelete(termId);
        if (result.cover) {
            const coverPath = path.join(result.cover);

            // Delete the old avatar file
            fs.unlink(coverPath, (err) => {
                if (err) {
                    console.error(`Failed to delete cover: ${err.message}`);
                } else {
                    console.log('Cover deleted successfully');
                }
            });
        }
        if (result.courses && Array.isArray(result.courses)) {
            for (const courseId of result.courses) {
                const startDate = result.startDate;
                const endDate = result.endDate;
                await removeTermService(courseId, startDate, endDate);
            }
        }

        await deleteTermFromUserService(termId, owner);

        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const updateTermService = async (owner, emoji, color, cover, name, description, startDate, endDate, termId) => {
    try {
        const term = await Term.findById(termId);
        if (!term) {
            return {
                EC: 0,
                EM: 'Term not found',
            };
        }

        if (cover && term.cover) {
            const oldCoverPath = path.join(term.cover);
            fs.unlink(oldCoverPath, (err) => {
                if (err) {
                    console.error(`Failed to delete old cover: ${err.message}`);
                } else {
                    console.log('Old cover deleted successfully');
                }
            });
        }

        const updatedTerm = await Term.findByIdAndUpdate(
            termId,
            {
                owner: owner,
                emoji: emoji,
                color: color,
                cover: cover ? cover.path : term.cover,
                name: name,
                description: description,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
            },
            { new: true },
        );

        return { result: updatedTerm };
    } catch (error) {
        console.log(error);
        return null;
    }
};

const updateTermNoteService = async (termId, newNote) => {
    try {
        const term = await Term.findById(termId);
        if (!term) {
            return {
                EC: 0,
                EM: 'Term not found',
            };
        }
        term.note = newNote;
        await term.save();

        return term.note;
    } catch (error) {
        console.log(error);
        return null;
    }
};

module.exports = {
    createTermService,
    getTermsInfoService,
    getTermInfoService,
    addCourseService,
    removeCourseService,
    deleteTermService,
    updateTermService,
    updateTermNoteService,
};
