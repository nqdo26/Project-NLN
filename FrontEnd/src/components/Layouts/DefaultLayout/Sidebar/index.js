import classNames from 'classnames/bind';
import { Button, Card, Layout, Menu, Avatar, Flex } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    AppstoreOutlined,
    SettingOutlined,
    LogoutOutlined,
    BookOutlined,
    PlusOutlined,
    CodeOutlined,
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
            key: 'library',
            label: 'Thư viện',
            icon: <BookOutlined />,
            path: '/library',
        },
        {
            key: 'uploaded',
            label: 'Các bài đăng',
            icon: <AppstoreOutlined />,
            path: `/uploaded/${auth?.user?.id}`,
        },

        {
            key: 'profile',
            label: `Trang cá nhân`,
            icon: <SettingOutlined />,
            path: '/profile',
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
                        actions={
                            auth?.user?.isAdmin
                                ? [
                                      <Button onClick={() => navigate('/new-doc')}>
                                          <PlusOutlined /> Tài liệu mới
                                      </Button>,
                                      <Button onClick={() => navigate('/admin')}>
                                          <CodeOutlined /> Quản lý
                                      </Button>,
                                  ]
                                : [
                                      <Button onClick={() => navigate('/new-doc')}>
                                          <PlusOutlined /> Tài liệu mới
                                      </Button>,
                                  ]
                        }
                    >
                        <Meta
                            avatar={<Avatar src={auth?.user?.avatar} />}
                            title={auth?.user?.fullName}
                            description={auth?.user?.email}
                        />
                    </Card>
                    <Menu mode="inline" items={menuItems} onClick={handleOnclick} selectedKeys={[selectedKey]} />
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
                    onClick={() => {
                        localStorage.clear('access_token');
                        setAuth({
                            isAuthenticated: false,
                            user: {
                                id: '',
                                email: '',
                                fullName: '',
                                isAdmin: false,
                                avatar: '',
                            },
                        });

                        navigate('/');
                    }}
                />
            </Flex>
        </Sider>
    );
}

export default Sidebar;
