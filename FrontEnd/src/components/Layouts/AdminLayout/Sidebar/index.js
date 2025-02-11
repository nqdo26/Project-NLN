import classNames from 'classnames/bind';
import { Button, Card, Layout, Menu, Avatar, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
    AppstoreOutlined,
    SettingOutlined,
    LogoutOutlined,
    BookOutlined,
    PlusOutlined,
    UserOutlined,
    BellOutlined,
} from '@ant-design/icons';

import styles from './Sidebar.module.scss';

function Sidebar() {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();
    const { Sider } = Layout;
    const { Meta } = Card;

    const menuItems = [
        {
            key: 'notification',
            label: 'Trung tâm thông báo',
            icon: <BellOutlined />,
            path: '/admin/notification',
        },
        {
            key: 'docmanage',
            label: 'Quản lý tài liệu hệ thống',
            icon: <BookOutlined />,
            path: '/admin/doc-manage',
        },
        {
            key: 'usermanage',
            label: 'Quản lý người dùng',
            icon: <UserOutlined />,
            path: '/admin/user-manage',
        },
    ];

    const handleOnclick = (e) => {
        const item = menuItems.find((item) => item.key === e.key);
        if (item) {
            navigate(item.path);
        }
    };

    const handleNewDoc = () => {
        navigate('/new-doc');
    };

    return (
        <Sider style={{ position: 'fixed', backgroundColor: '#ccc' }} width="300px" className={cx('wrapper')}>
            <Flex vertical justify="space-between" style={{ height: '100%' }}>
                <div>
                    <Card
                        style={{
                            width: 300,
                            borderRadius: '0',
                        }}
                    >
                        <Meta
                            avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                            title="Admin"
                            description="This is the description"
                        />
                    </Card>
                    <Menu mode="inline" items={menuItems} onClick={handleOnclick} />
                </div>

                <Menu
                    mode="inline"
                    items={[
                        {
                            key: 'logout',
                            label: 'Đăng xuất',
                            icon: <LogoutOutlined />,
                        },
                    ]}
                />
            </Flex>
        </Sider>
    );
}

export default Sidebar;
