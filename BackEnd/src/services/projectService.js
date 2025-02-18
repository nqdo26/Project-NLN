const Project = require('../models/project');
const ProjectStep = require('../models/projectStep');
const Statistics = require('../models/statistics');

const createProjectService = async (name, totalSteps, completedSteps, steps, statisticsId) => {
    try {
        const project = await Project.create({ name, totalSteps, completedSteps, steps });
        const statistics = await Statistics.findById(statisticsId);

        statistics.projects.push(project._id);
        statistics.totalProjects += 1;
        statistics.save();

        return project;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const deleteProjectService = async (projectId) => {
    try {
        const project = await Project.findByIdAndDelete(projectId);

        // Delete associated project steps
        if (project.steps) {
            for (const stepId of project.steps) {
                await ProjectStep.findByIdAndDelete(stepId);
            }
        }

        const statistics = await Statistics.findOne({ projects: projectId });
        if (statistics) {
            statistics.projects.pull(projectId);
            statistics.totalProjects -= 1;
            await statistics.save();
        }

        return project;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getProjectInfoService = async (projectId) => {
    try {
        const project = await Project.findById(projectId);
        return project;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const getProjectsInfoByIdsService = async (projectsIds) => {
    try {
        let result = await Project.find({ _id: { $in: projectsIds } });
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const updateProjectCompletionService = async (projectId) => {
    try {
        const statistics = await Statistics.findOne({ projects: projectId });

        if (!statistics) return null;
        const projectsIds = statistics.projects;
        const projects = await Project.find({ _id: { $in: projectsIds } });
        if (!projects) return null;

        let completedCount = 0;
        console.log(projects);

        projects.forEach((project) => {
            if (project.completedSteps === project.totalSteps && project.totalSteps !== 0) {
                completedCount++;
            }
        });

        statistics.completedProjects = completedCount;

        await statistics.save();

        return statistics;
    } catch (error) {
        console.error(error);
        return null;
    }
};

module.exports = {
    createProjectService,
    deleteProjectService,
    getProjectInfoService,
    getProjectsInfoByIdsService,
    updateProjectCompletionService,
};
