import { Button, Popconfirm, notification, Table, Modal, Input, Form } from 'antd';
import classNames from 'classnames/bind';
import { DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import { useEffect, useState } from 'react';

import styles from './AdminLevelManage.module.scss';
import { deleteLevelApi, getLevelsApi, createLevelApi } from '~/utils/api';


function AdminLevelManage() {
    const cx = classNames.bind(styles);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataSource, setDataSources] = useState([]);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchLevel = async () => {
            try {
                const res = await getLevelsApi();
                console.log(res);

                if (res && Array.isArray(res.data)) {
                    setDataSources(res.data); 
                } else {
                    setDataSources([]); 
                    notification.error({
                        message: 'Error',
                        description: 'Invalid data format',
                    });
                }
            } catch (error) {
                console.error('Fetch error:', error);
                setDataSources([]);
                notification.error({
                    message: 'Error',
                    description: 'Failed to fetch categories',
                });
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
                notification.error({ message: 'Error', description: res.EM});
            }
        } catch (error) {
            notification.error({ message: 'Error', description: "Đã xảy ra lỗi trong quá trình thêm cấp bậc"});
        }
    };

    const handleDeleteLevel = async (id) => {
       try {
            const res = await deleteLevelApi(id);
            notification.success({
                message: 'Thành công',
                description: res.EM,
            })

            setDataSources((prevData) => prevData.filter(level => level._id !== id));
       } catch(error) {
            notification.error ({
                message: 'Thất bại',
                description: error.response?.data?.EM || 'Có lỗi xảy ra khi xóa người dùng!',
            })
       }
    };

    const columns = [
        {       
            title: 'STT',
            key: 'index',
            render: (_, __, index) => index + 1, 
        },
        {
            title: 'Id',
            dataIndex: '_id',
        },
        {
            title: 'Tên cấp bậc',
            dataIndex: 'title',
        },
        {
            title: 'Tùy chọn',
            render: (record) => (
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Button 
                        style={{ backgroundColor: "green" }}
                        type="primary" 
                        icon={<EditOutlined />} 
                    />
                    <Popconfirm
                        title="Are you sure to delete this category?"
                        onConfirm={() => handleDeleteLevel(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger icon={<DeleteOutlined />} />
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
                    onClick = {() => setIsModalOpen(true)}
                > 
                    Thêm mới
                </Button>
            </div>
            <Table dataSource={dataSource || []} columns={columns} bordered rowKey="_id" />
            <Modal title= "Thêm cấp bậc mới" open={isModalOpen} onOk={handleAddLevel} onCancel = {() => setIsModalOpen(false)}  >
                <Form form={form} layout="vertical">
                    <Form.Item lable="Tên danh mục" name="title" rules={[{ require: true, message: "Vui lòng nhập tên danh mục mới"}]}>
                        <Input placeholder="Nhập tên danh mục mới" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default AdminLevelManage;
