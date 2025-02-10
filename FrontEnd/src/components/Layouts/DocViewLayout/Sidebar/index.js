import classNames from 'classnames/bind';
import { Button, Card, Layout, Menu, Avatar, Flex, Divider, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
    AppstoreOutlined,
    SettingOutlined,
    LogoutOutlined,
    BookOutlined,
    PlusOutlined,
    DownloadOutlined,
    SaveOutlined,
    WarningOutlined,
} from '@ant-design/icons';

import styles from './Sidebar.module.scss';

function Sidebar() {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();
    const { Sider } = Layout;
    const { Meta } = Card;
    const { Title } = Typography;

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
        {
            key: 'logout',
            label: 'Đăng xuất',
            icon: <LogoutOutlined />,
        },
    ];

    const docMenuItems = [
        {
            key: 'download',
            label: 'Tải về',
            icon: <DownloadOutlined />,
            path: '/library',
        },
        {
            key: 'save',
            label: 'Lưu vào thư viện',
            icon: <SaveOutlined />,
            path: '/uploaded',
        },

        {
            key: 'report',
            label: 'Báo cáo',
            icon: <WarningOutlined />,
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
                <Flex vertical className="description" style={{}}>
                    {/* <Title level={3}>Tên tài liệu dwa dwa dwa dwa ad dwa adaw</Title>
                    <div style={{ Mineight: '100px', overflowY: 'auto', overflowX: 'hidden' }}>
                        <p>
                            Mô tả tài liệu mô tả he heh he he dưa da dưa đưa wd wd ada d awd wadwa d adw adwa dưa dưa da
                            đưa a dưa đưa ư dwa da dwa da dwad a wad wad wad wad wadwa dw ada wdwa d wa wad wad wada
                        </p>
                    </div> */}
                    <Card
                        style={{
                            borderRadius: '0',
                        }}
                        actions={[
                            <Button style={{ backgroundColor: 'green', color: 'white' }} onClick={handleNewDoc}>
                                <DownloadOutlined />
                            </Button>,
                            <Button style={{ backgroundColor: 'blue', color: 'white' }} onClick={handleNewDoc}>
                                <SaveOutlined />
                            </Button>,
                            <Button style={{ backgroundColor: 'red', color: 'white' }} onClick={handleNewDoc}>
                                <WarningOutlined />
                            </Button>,
                        ]}
                    >
                        <Meta
                            title="Tên tài liệu dwa dwa dwa dwa ad dwa adaw"
                            description="Mô tả tài liệu mô tả he heh he he dưa da dưa đưa wd wd ada d awd wadwa d adw adwa dưa dưa da
                            đưa a dưa đưa ư dwa da dwa da dwad a wad wad wad wad wadwa dw ada wdwa d wa wad wad wada"
                        />
                    </Card>
                    <Card
                        style={{
                            borderRadius: '0',
                        }}
                    >
                        <Meta
                            avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                            title="Tên người tải lên"
                            description={'Tải lên 01/01/2001'}
                        />
                    </Card>
                </Flex>

                <div>
                    <Card
                        style={{
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
            </Flex>
        </Sider>
    );
}

export default Sidebar;
