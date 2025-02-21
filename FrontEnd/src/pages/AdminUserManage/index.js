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
            console.log(res);
            if (!res?.message) {
                setDataSources(res);
            } else {
                notification.error({
                    message: 'Unauthorized',
                    description: res.message,
                })
            }
        };

        fetchUser();
    }, []);

    const handleDeleteUser = async (userId) => {
        const res = await deleteUserApi(userId);
        if (res.message === 'User deleted successfully') {
            notification.success({ message: 'Success', description: res.message });
            setDataSources((prevData) => prevData.filter(item => item._id !== userId));
        } else {
            notification.error({ message: 'Error', description: res.message });
        }
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Admin',
            dataIndex: 'isAdmin',
            render: (value) => value ? 'Yes' : 'No',
        },
        {
            title: 'Statistics',
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
            title: 'Action',
            render: (record) => (
                <div style={{ display: 'flex', gap: '10px' }}>
                <Button 
                    type="primary" 
                    icon={<EyeOutlined />} 
                >
    
                </Button>
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
            <Table dataSource={dataSource} columns={columns} bordered rowKey={"_id"}></Table>
        </div>
    );
}

export default AdminUserManage;
