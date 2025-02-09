import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { Button, Card, Layout, Menu, Avatar, Flex } from 'antd';
import { AppstoreOutlined, SettingOutlined, LogoutOutlined, BookOutlined, PlusOutlined } from '@ant-design/icons';

function Sidebar() {
    const cx = classNames.bind(styles);
    const { Sider } = Layout;
    const { Meta } = Card;

    const items = [
        {
            key: 'library',
            label: 'Thư viện',
            icon: <BookOutlined />,
        },
        {
            key: 'posted',
            label: 'Các bài đăng',
            icon: <AppstoreOutlined />,
        },

        {
            key: 'profile',
            label: 'Trang cá nhân',
            icon: <SettingOutlined />,
        },
    ];

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
                            <Button>
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
                    <Menu mode="inline" items={items} />
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
