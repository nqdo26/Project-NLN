const Test = require('../models/test');
const Statistics = require('../models/statistics');

const createTestService = async (name, gradeWeight, maxScore, statisticsId, date) => {
    try {
        {
            const score = -1;
            const test = await Test.create({ name, gradeWeight, maxScore, score, date: new Date(date) });
            const statistics = await Statistics.findById(statisticsId);
            statistics.tests.push(test._id);
            statistics.save();

            return test;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};

const deleteTestService = async (testId) => {
    try {
        // Find and delete the test
        const test = await Test.findByIdAndDelete(testId);
        if (!test) return null;

        // Find the statistics document that contains the test ID
        const statistics = await Statistics.findOne({ tests: testId });
        if (statistics) {
            // Remove the test ID from the tests array
            statistics.tests = statistics.tests.filter((tId) => tId.toString() !== testId.toString());
            if (test.score !== -1) {
                statistics.completedGradeWeight -= test.gradeWeight;
                statistics.completedScore -= (test.score / test.maxScore) * test.gradeWeight;
            }
            await statistics.save();
        }

        return test;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getTestInfoService = async (testId) => {
    try {
        const test = await Test.findById(testId);
        return test;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const getTestsInfoByIdsService = async (owner, testsIds) => {
    try {
        let result = await Test.find({ _id: { $in: testsIds } });
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const updateTestScoreService = async (testId, newScore) => {
    try {
        const test = await Test.findById(testId);
        const statistics = await Statistics.findOne({ tests: testId });

        if (!test || !statistics) return null;

        const oldScore = test.score;
        const oldCompletedScore = statistics.completedScore;
        test.score = newScore;
        await test.save();

        if (oldScore === -1) {
            statistics.completedGradeWeight = statistics.completedGradeWeight + test.gradeWeight;
            statistics.completedScore = oldCompletedScore + (newScore / test.maxScore) * test.gradeWeight;
            await statistics.save();
        } else {
            statistics.completedScore =
                oldCompletedScore -
                (oldScore / test.maxScore) * test.gradeWeight +
                (newScore / test.maxScore) * test.gradeWeight;

            await statistics.save();
        }

        return test;
    } catch (error) {
        console.error(error);
        return null;
    }
};

// const updateTestInfoService = async (testId, name, gradeWeight, maxScore, score) => {
//     try {
//         const test = await Test.findById(testId);

//         // Cap nhat statistics cu
//         if (test.score !== -1) {
//             const statistics = await Statistics.findOne({ tests: testId });
//             statistics.completedGradeWeight = statistics.completedGradeWeight - (test.gradeWeight - gradeWeight);
//             statistics.completedScore =
//                 statistics.completedScore -
//                 (test.score / test.maxScore) * test.gradeWeight +
//                 (score / maxScore) * gradeWeight;
//             await statistics.save();
//         } else {
//             const statistics = await Statistics.findOne({ tests: testId });
//             statistics.completedGradeWeight += gradeWeight;
//             statistics.completedScore += (score / maxScore) * test.gradeWeight;
//             await statistics.save();
//         }

//         // Cap nhat test moi
//         test.name = name;
//         test.gradeWeight = gradeWeight;
//         test.maxScore = maxScore;
//         test.score = score;
//         await test.save();

//         // Cap nhat statistics moi

//         return test;
//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// };

const updateTestInfoService = async (testId, name, gradeWeight, maxScore, score, date) => {
    try {
        const test = await Test.findById(testId);

        // Cap nhat statistics cu
        if (test.score !== -1) {
            const statistics = await Statistics.findOne({ tests: testId });
            statistics.completedGradeWeight = statistics.completedGradeWeight - (test.gradeWeight - gradeWeight);
            statistics.completedScore =
                statistics.completedScore -
                (test.score / test.maxScore) * test.gradeWeight +
                (score / maxScore) * gradeWeight;
            await statistics.save();
        } else {
            const statistics = await Statistics.findOne({ tests: testId });
            statistics.completedGradeWeight += gradeWeight;
            statistics.completedScore += (score / maxScore) * test.gradeWeight;
            await statistics.save();
        }

        // Cap nhat test moi
        test.name = name;
        test.gradeWeight = gradeWeight;
        test.maxScore = maxScore;
        test.score = score;
        test.date = new Date(date);
        await test.save();

        // Cap nhat statistics moi

        return test;
    } catch (error) {
        console.error(error);
        return null;
    }
};

module.exports = {
    createTestService,
    deleteTestService,
    getTestInfoService,
    getTestsInfoByIdsService,
    updateTestScoreService,
    updateTestInfoService,
};
