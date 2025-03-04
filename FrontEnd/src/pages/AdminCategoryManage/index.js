import { Button, Popconfirm, notification, Table, Modal, Input, Form } from 'antd';
import classNames from 'classnames/bind';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

import styles from './AdminCategoryManage.module.scss';
import { getCategoriesApi, deleteCategoryApi, createCategoryApi, updateCategoryApi } from '~/utils/api';

function AdminCategoryManage() {
    const cx = classNames.bind(styles);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [dataSource, setDataSources] = useState([]);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await getCategoriesApi();
            if (res && Array.isArray(res.data)) {
                setDataSources(res.data);
            } else {
                notification.error({ message: 'Error', description: 'Invalid data format' });
            }
        } catch (error) {
            notification.error({ message: 'Error', description: 'Failed to fetch categories' });
        }
    };

    const handleAddCategory = async () => {
        try {
            const values = await form.validateFields();
            const res = await createCategoryApi(values.title);
            if (res.data) {
                notification.success({ message: 'Thành công', description: 'Đã thêm danh mục mới' });
                setDataSources([...dataSource, res.data]);
                setIsModalOpen(false);
                form.resetFields();
            } else {
                notification.error({ message: 'Error', description: res.EM });
            }
        } catch (error) {
            notification.error({ message: 'Error', description: 'Đã xảy ra lỗi trong quá trình thêm danh mục' });
        }
    };

    const handleUpdateCategory = async (id) => {
        try {
            const values = await form.validateFields();
            const res = await updateCategoryApi(editingCategory._id, values.title);

            if (values.title === editingCategory.title) {
                notification.success({ message: 'Thành công', description: 'Không có thay đổi nào, dữ liệu giữ nguyên' });
                setIsModalUpdateOpen(false);
                return;
            }

            if (res && res._id && res.title) {
                notification.success({ message: 'Thành công', description: 'Cập nhật danh mục thành công' });
                setDataSources((prevData) => prevData.map(category => 
                    category._id === editingCategory._id ? { ...category, title: values.title } : category
                ));
                setIsModalUpdateOpen(false);
                form.resetFields();
            } else {
                notification.warning({ message: 'Thất bại', description: 'Tên cấp bậc đã tồn tại' });
            }
        } catch (error) {
            notification.error({ message: 'Lỗi', description: 'Có lỗi xảy ra khi cập nhật cấp bậc' });
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            const res = await deleteCategoryApi(id);
            notification.success({
                message: 'Thành công',
                description: res.EM,
            })

            setDataSources((prevData) => prevData.filter(category => category._id !== id));
       } catch(error) {
            notification.error ({
                message: 'Thất bại',
                description: error.response?.data?.EM || 'Có lỗi xảy ra khi xóa danh mục!',
            })
       }
    };

    const columns = [
        { title: 'STT', key: 'index', render: (_, __, index) => index + 1 },
        { title: 'Id', dataIndex: '_id' },
        { title: 'Tên danh mục', dataIndex: 'title' },
        {
            title: 'Tùy chọn',
            render: (record) => (
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Button 
                        style={{ backgroundColor: "green" }} 
                        type="primary" 
                        icon={<EditOutlined />} 
                        onClick={() => {
                            setEditingCategory(record);
                            form.setFieldsValue({ title: record.title });
                            setIsModalUpdateOpen(true);
                        }}
                    />
                    <Popconfirm 
                        title="Are you sure?" 
                        onConfirm={() => handleDeleteCategory(record._id)} 
                        okText="Yes" 
                        cancelText="No"
                    ><Button type="primary" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
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

            <Modal title="Thêm danh mục mới" open={isModalOpen} onOk={handleAddCategory} onCancel={() => setIsModalOpen(false)}>
                <Form form={form} layout="vertical">
                    <Form.Item label="Tên danh mục" name="title" rules={[{ required: true, message: 'Vui lòng nhập tên danh mục' }]}>
                        <Input placeholder="Nhập tên danh mục" />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal title="Chỉnh sửa danh mục" open={isModalUpdateOpen} onOk={handleUpdateCategory} onCancel={() => setIsModalUpdateOpen(false)}>
                <Form form={form} layout="vertical">
                    <Form.Item label="Tên danh mục mới" name="title" rules={[{ required: true, message: "Vui lòng nhập tên danh mục mới" }]}> 
                        <Input placeholder="Nhập tên danh mục mới" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default AdminCategoryManage;
