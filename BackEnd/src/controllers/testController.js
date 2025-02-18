const {
    createTestService,
    deleteTestService,
    getTestInfoService,
    getTestsInfoByIdsService,
    updateTestScoreService,
    updateTestInfoService,
} = require('../services/testService');

const createTest = async (req, res) => {
    const { name, gradeWeight, maxScore, score, statisticsId, date } = req.body;
    const newScore = score;
    const test = await createTestService(name, gradeWeight, maxScore, statisticsId, date);
    if (score !== -1) {
        const testId = test._id;
        const rs = await updateTestScoreService(testId, newScore);
    }

    return res.status(200).json(test);
};

const deleteTest = async (req, res) => {
    const { testId } = req.body;
    const success = await deleteTestService(testId);
    return res.status(200).json({ success });
};

const getTestInfo = async (req, res) => {
    const { testId } = req.body;
    const test = await getTestInfoService(testId);
    return res.status(200).json(test);
};

const getTestsInfoByIds = async (req, res) => {
    const { owner, testsIds } = req.body;
    const tests = await getTestsInfoByIdsService(owner, testsIds);
    return res.status(200).json(tests);
};

const updateTestScore = async (req, res) => {
    const { testId, newScore } = req.body;
    const tests = await updateTestScoreService(testId, newScore);
    return res.status(200).json(tests);
};

const updateTestInfo = async (req, res) => {
    const { testId, name, gradeWeight, maxScore, score, date } = req.body;
    const tests = await updateTestInfoService(testId, name, gradeWeight, maxScore, score, date);
    return res.status(200).json(tests);
};

module.exports = {
    createTest,
    deleteTest,
    getTestInfo,
    getTestsInfoByIds,
    updateTestScore,
    updateTestInfo,
};
