const Report = require('../models/report');

const createReportService = async (documentId, reporterId, description) => {
    try {
        const report = await Report.create({
            documentId,
            reporterId,
            description,
            reportAt: new Date(),
            status: false, // Default status is false (unresolved)
        });
        return {
            EC: 1,
            EM: 'Tạo báo cáo thành công',
            data: report,
        };
    } catch (error) {
        console.error(error);
        return {
            EC: 2,
            EM: 'Đã xảy ra lỗi khi tạo báo cáo',
        };
    }
};

const getReportsService = async () => {
    try {
        const reports = await Report.find()
            .populate('documentId') // Populate document title
            .populate('reporterId', 'fullName email'); // Populate reporter details
        return {
            EC: 1,
            EM: 'Lấy danh sách báo cáo thành công',
            data: reports,
        };
    } catch (error) {
        console.error(error);
        return {
            EC: 2,
            EM: 'Đã xảy ra lỗi khi lấy danh sách báo cáo',
        };
    }
};

const updateReportStatusService = async (id, status) => {
    try {
        const report = await Report.findByIdAndUpdate(id, { status }, { new: true });
        if (!report) {
            return {
                EC: 0,
                EM: 'Báo cáo không tồn tại',
            };
        }
        return {
            EC: 1,
            EM: 'Cập nhật trạng thái báo cáo thành công',
            data: report,
        };
    } catch (error) {
        console.error(error);
        return {
            EC: 2,
            EM: 'Đã xảy ra lỗi khi cập nhật trạng thái báo cáo',
        };
    }
};

const deleteReportService = async (id) => {
    try {
        const report = await Report.findByIdAndDelete(id);
        if (!report) {
            return {
                EC: 0,
                EM: 'Báo cáo không tồn tại',
            };
        }
        return {
            EC: 1,
            EM: 'Xóa báo cáo thành công',
        };
    } catch (error) {
        console.error(error);
        return {
            EC: 2,
            EM: 'Đã xảy ra lỗi khi xóa báo cáo',
        };
    }
};

module.exports = {
    createReportService,
    getReportsService,
    updateReportStatusService,
    deleteReportService,
};
