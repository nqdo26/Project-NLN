import { Button, Popconfirm, notification, Table, Modal, Input, Form } from 'antd';
import classNames from 'classnames/bind';
import { ArrowRightOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

import styles from './AdminLevelManage.module.scss';
import { deleteLevelApi, getLevelsApi, createLevelApi, updateLevelApi } from '~/utils/api';
import { useNavigate } from 'react-router-dom';

function AdminLevelManage() {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [editingLevel, setEditingLevel] = useState(null);
    const [dataSource, setDataSources] = useState([]);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchLevel = async () => {
            try {
                const res = await getLevelsApi();
                if (res && Array.isArray(res.data)) {
                    setDataSources(res.data); 
                } else {
                    setDataSources([]); 
                    notification.error({ message: 'Error', description: 'Invalid data format' });
                }
            } catch (error) {
                console.error('Fetch error:', error);
                setDataSources([]);
                notification.error({ message: 'Error', description: 'Failed to fetch categories' });
            }
        };
        fetchLevel();
    }, []);

    const handleAddLevel = async () => {
        try {
            const values = await form.validateFields();
            const res = await createLevelApi(values.title);
            if (res.data) {
                notification.success({ message: 'Thành công', description: 'Đã thêm cấp bậc mới' });
                setDataSources([...dataSource, res.data]);
                setIsModalOpen(false);
                form.resetFields();
            } else {
                notification.error({ message: 'Error', description: res.EM });
            }
        } catch (error) {
            notification.error({ message: 'Error', description: "Đã xảy ra lỗi trong quá trình thêm cấp bậc" });
        }
    };

    const handleDeleteLevel = async (id) => {
        try {
            const res = await deleteLevelApi(id);
            notification.success({ message: 'Thành công', description: res.EM });
            setDataSources((prevData) => prevData.filter(level => level._id !== id));
        } catch (error) {
            notification.error({ message: 'Thất bại', description: error.response?.data?.EM || 'Có lỗi xảy ra khi xóa người dùng!' });
        }
    };

    const handleUpdateLevel = async () => {
        try {
            const values = await form.validateFields();
            const res = await updateLevelApi(editingLevel._id, values.title);

            if (values.title === editingLevel.title) {
                notification.success({ message: 'Thành công', description: 'Không có thay đổi nào, dữ liệu giữ nguyên' });
                setIsModalUpdateOpen(false);
                return;
            }
    
            if (res && res._id && res.title) {
                notification.success({ message: 'Thành công', description: 'Cập nhật cấp bậc thành công' });
                setDataSources((prevData) => prevData.map(level =>
                    level._id === editingLevel._id ? { ...level, title: values.title } : level
                ));
    
                setIsModalUpdateOpen(false);
                form.resetFields();
            } else {
                notification.warning({ message: 'Thất bại', description: "Tên cấp bậc đã tồn tại" });
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật:", error.response?.data || error);
            notification.error({
                message: 'Lỗi',
                description: error.response?.data?.EM || 'Có lỗi xảy ra khi cập nhật cấp bậc'
            });
        }
    };
    
    

    const columns = [
        { title: 'STT', key: 'index', render: (_, __, index) => index + 1 },
        { title: 'Id', dataIndex: '_id' },
        { title: 'Tên cấp bậc', dataIndex: 'title' },
        {
            title: 'Tùy chọn',
            render: (record) => (
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Button 
                        style={{ backgroundColor: "green" }}
                        type="primary" 
                        icon={<EditOutlined />} 
                        onClick={() => {
                            setEditingLevel(record);
                            form.setFieldsValue({ title: record.title });
                            setIsModalUpdateOpen(true);
                        }}
                    />
                    <Popconfirm
                        title="Are you sure to delete this category?"
                        onConfirm={() => handleDeleteLevel(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                    <Button 
                        style={{ backgroundColor: "#FAAD14", borderColor: "#FAAD14", color: "#000" }} 
                        type="primary" 
                        icon={<ArrowRightOutlined />} 
                        onClick={() => navigate(`/level/${record._id}`)}
                    >
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Button 
                    style={{ backgroundColor: "blue" }}
                    type="primary" 
                    icon={<PlusOutlined />} 
                    onClick={() => setIsModalOpen(true)}
                >
                    Thêm mới
                </Button>
            </div>
            <Table dataSource={dataSource || []} columns={columns} bordered rowKey="_id" />
            <Modal title="Thêm cấp bậc mới" open={isModalOpen} onOk={handleAddLevel} onCancel={() => setIsModalOpen(false)}>
                <Form form={form} layout="vertical">
                    <Form.Item label="Tên cấp bậc mới" name="title" rules={[{ required: true, message: "Vui lòng nhập tên cấp bậc mới" }]}> 
                        <Input placeholder="Nhập tên cấp bậc mới" />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal title="Chỉnh sửa cấp bậc" open={isModalUpdateOpen} onOk={handleUpdateLevel} onCancel={() => setIsModalUpdateOpen(false)}>
                <Form form={form} layout="vertical">
                    <Form.Item label="Tên cấp bậc mới" name="title" rules={[{ required: true, message: "Vui lòng nhập tên cấp bậc mới" }]}> 
                        <Input placeholder="Nhập tên cấp bậc mới" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default AdminLevelManage;
