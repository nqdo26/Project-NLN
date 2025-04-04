import classNames from 'classnames/bind';
import { Card, Layout, Menu, Avatar, Flex } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    AppstoreOutlined,
    LogoutOutlined,
    BookOutlined,
    UserOutlined,
    BellOutlined,
    HomeOutlined,
    ApartmentOutlined,
} from '@ant-design/icons';

import styles from './Sidebar.module.scss';
import { useContext } from 'react';
import { AuthContext } from '~/components/Context/auth.context';

function Sidebar() {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();
    const location = useLocation();
    const { Sider } = Layout;
    const { Meta } = Card;

    const { auth, setAuth } = useContext(AuthContext);

    const menuItems = [
        {
            key: 'home',
            label: 'Trang chủ quản trị',
            icon: <HomeOutlined />,
            path: '/admin',
        },
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
        {
            key: 'levelmanage',
            label: 'Quản lý cấp bậc',
            icon: <ApartmentOutlined />,
            path: '/admin/level-manage',
        },
        {
            key: 'categorymanage',
            label: 'Quản lý danh mục',
            icon: <AppstoreOutlined />,
            path: '/admin/category-manage',
        },
    ];

    const handleOnclick = (e) => {
        const item = menuItems.find((item) => item.key === e.key);
        if (item) {
            navigate(item.path);
        }
    };

    const selectedKey = menuItems.find((item) => item.path === location.pathname)?.key;

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
                            avatar={<Avatar src={auth?.user?.avatar} />}
                            title="Admin"
                            description={auth?.user?.fullName}
                        />
                    </Card>
                    <Menu mode="inline" items={menuItems} onClick={handleOnclick} selectedKeys={[selectedKey]} />
                </div>

                <Menu
                    mode="inline"
                    items={[
                        {
                            onClick: () => {
                                localStorage.clear('access_token');
                                setAuth({
                                    isAuthenticated: false,
                                    user: { id: '', email: '', fullName: '', avatar: '', isAdmin: false },
                                });

                                navigate('/');
                            },
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
