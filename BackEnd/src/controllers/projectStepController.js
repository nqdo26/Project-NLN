const {
    createProjectStepService,
    deleteProjectStepService,
    getProjectStepInfoService,
    getProjectStepsInfoByIdsService,
    updateProjectStepService,
} = require('../services/projectStepService');

const createProjectStep = async (req, res) => {
    const { name, projectId, status } = req.body;
    const projectStep = await createProjectStepService(name, status, projectId);
    return res.status(200).json(projectStep);
};

const deleteProjectStep = async (req, res) => {
    const { projectStepId } = req.body;
    const success = await deleteProjectStepService(projectStepId);
    return res.status(200).json({ success });
};

const getProjectStepInfo = async (req, res) => {
    const { projectStepId } = req.body;
    const projectStep = await getProjectStepInfoService(projectStepId);
    return res.status(200).json(projectStep);
};

const getProjectStepsInfoByIds = async (req, res) => {
    const { owner, projectStepsIds } = req.body;
    const projectSteps = await getProjectStepsInfoByIdsService(owner, projectStepsIds);
    return res.status(200).json(projectSteps);
};

const updateProjectStep = async (req, res) => {
    const { projectStepId, status, name } = req.body;
    const projectSteps = await updateProjectStepService(projectStepId, status, name);
    return res.status(200).json(projectSteps);
};

module.exports = {
    createProjectStep,
    deleteProjectStep,
    getProjectStepInfo,
    getProjectStepsInfoByIds,
    updateProjectStep,
};
