import classNames from 'classnames/bind';
import { Button, Card, Layout, Menu, Avatar, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AppstoreOutlined, SettingOutlined, LogoutOutlined, BookOutlined, PlusOutlined } from '@ant-design/icons';

import styles from './Sidebar.module.scss';

function Sidebar() {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();
    const { Sider } = Layout;
    const { Meta } = Card;

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
            path: '/uploaded',
        },

        {
            key: 'profile',
            label: 'Trang cá nhân',
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
                        actions={[
                            <Button onClick={handleNewDoc}>
                                <PlusOutlined /> Tạo tài liệu mới
                            </Button>,
                        ]}
                    >
                        <Meta
                            avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                            title="KongTrua"
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
