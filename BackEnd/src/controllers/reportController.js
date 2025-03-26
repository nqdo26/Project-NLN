const Report = require('../models/report');
const {
    createReportService,
    getReportsService,
    updateReportStatusService,
    deleteReportService,
} = require('../services/reportService');

const createReport = async (req, res) => {
    const { documentId, reporterId, description } = req.body;
    const data = await createReportService(documentId, reporterId, description);
    return res.status(200).json(data);
};

const getReports = async (req, res) => {
    const data = await getReportsService();
    return res.status(200).json(data);
};

const updateReportStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const data = await updateReportStatusService(id, status);
    return res.status(200).json(data);
};

const deleteReport = async (req, res) => {
    const { id } = req.params;
    const data = await deleteReportService(id);
    return res.status(200).json(data);
};

module.exports = {
    createReport,
    getReports,
    updateReportStatus,
    deleteReport,
};
