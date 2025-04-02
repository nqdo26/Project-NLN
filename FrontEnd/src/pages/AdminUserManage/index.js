import { Button, Popconfirm, notification, Table } from 'antd';
import classNames from 'classnames/bind';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

import styles from './AdminUserManage.module.scss';
import { getUsersApi } from '~/utils/api';
import { deleteUserApi } from '~/utils/api';

function AdminUserManage() {
    const cx = classNames.bind(styles);

    const [dataSource, setDataSources] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await getUsersApi();
            if (!res?.message) {
                setDataSources(res);
            } else {
                notification.error({
                    message: 'Unauthorized',
                    description: res.message,
                });
            }
        };

        fetchUser();
    }, []);

    const handleDeleteUser = async (id) => {
        try {
            const res = await deleteUserApi(id);
            notification.success({
                message: 'Thành công',
                description: res.EM,
            });

            setDataSources((prevData) => prevData.filter((user) => user._id !== id));
        } catch (error) {
            notification.error({
                message: 'Thất bại',
                description: error.response?.data?.EM || 'Có lỗi xảy ra khi xóa người dùng!',
            });
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
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Họ tên',
            dataIndex: 'fullName',
        },
        {
            title: 'Tài khoản admin',
            dataIndex: 'isAdmin',
            render: (value) => (value ? 'Yes' : 'No'),
        },
        {
            title: 'Thống kê',
            dataIndex: 'statistics',
            render: (value) => (
                <div>
                    <p>Total uploaded: {value.uploaded}</p>
                    <p>Liked: {value.liked.length}</p>
                    <p>Disliked: {value.disliked.length}</p>
                </div>
            ),
        },
        {
            title: 'Tùy chọn',
            render: (record) => (
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Button type="primary" icon={<EyeOutlined />}></Button>
                    <Popconfirm
                        title="Are you sure to delete this user?"
                        onConfirm={() => handleDeleteUser(record._id)}
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
            <Table dataSource={dataSource} columns={columns} bordered rowKey={'_id'}></Table>
        </div>
    );
}

export default AdminUserManage;
