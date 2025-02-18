const ProjectStep = require('../models/projectStep');
const Project = require('../models/project');
const Statistics = require('../models/statistics');
const { updateProjectCompletionService } = require('./projectService');

const createProjectStepService = async (name, status, projectId) => {
    try {
        const project = await Project.findById(projectId);
        if (!project) return null;

        const projectStep = await ProjectStep.create({ name, status });

        project.steps.push(projectStep._id);
        project.totalSteps += 1;
        if (status === 'true') project.completedSteps += 1;
        project.save();

        //Update statistic completed projects
        await updateProjectCompletionService(projectId);

        return projectStep;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const deleteProjectStepService = async (projectStepId) => {
    try {
        const projectStep = await ProjectStep.findByIdAndDelete(projectStepId);
        const project = await Project.findOne({ steps: projectStepId });

        if (project) {
            project.steps.pull(projectStepId);
            project.totalSteps -= 1;
            if (projectStep.status === true) {
                project.completedSteps -= 1;
            }
            project.save();
        }
        //Update statistic completed projects
        const projectId = project._id;
        await updateProjectCompletionService(projectId);

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const getProjectStepInfoService = async (projectStepId) => {
    try {
        const projectStep = await ProjectStep.findById(projectStepId);
        return projectStep;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const getProjectStepsInfoByIdsService = async (owner, projectStepsIds) => {
    try {
        let result = await ProjectStep.find({ _id: { $in: projectStepsIds } });
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const updateProjectStepService = async (projectStepId, status, name) => {
    try {
        const project = await Project.findOne({ steps: projectStepId });
        if (!project) return null;

        // Update project completed steps
        const projectStep = await ProjectStep.findById(projectStepId);

        if (projectStep.status.toString() !== status.toString()) {
            if (status === 'true') {
                project.completedSteps += 1;
            } else {
                project.completedSteps -= 1;
            }
            await project.save();

            //Update statistic completed projects
        }
        projectStep.name = name;
        projectStep.status = status;

        await projectStep.save();

        const projectId = project._id;
        await updateProjectCompletionService(projectId);

        return projectStep;
    } catch (error) {
        console.error(error);
        return null;
    }
};

module.exports = {
    createProjectStepService,
    deleteProjectStepService,
    getProjectStepInfoService,
    getProjectStepsInfoByIdsService,
    updateProjectStepService,
};
