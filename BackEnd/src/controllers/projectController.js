const {
    createProjectService,
    deleteProjectService,
    getProjectInfoService,
    getProjectsInfoByIdsService,
} = require('../services/projectService');

const createProject = async (req, res) => {
    const { name, totalSteps, completedSteps, steps, statisticsId } = req.body;
    const project = await createProjectService(name, totalSteps, completedSteps, steps, statisticsId);
    return res.status(200).json(project);
};

const deleteProject = async (req, res) => {
    const { projectId } = req.body;
    const success = await deleteProjectService(projectId);
    return res.status(200).json({ success });
};

const getProjectInfo = async (req, res) => {
    const { projectId } = req.body;
    const project = await getProjectInfoService(projectId);
    return res.status(200).json(project);
};

const getProjectsInfoByIds = async (req, res) => {
    const { projectsIds } = req.body;
    const projects = await getProjectsInfoByIdsService(projectsIds);
    return res.status(200).json(projects);
};

module.exports = {
    createProject,
    deleteProject,
    getProjectInfo,
    getProjectsInfoByIds,
};
