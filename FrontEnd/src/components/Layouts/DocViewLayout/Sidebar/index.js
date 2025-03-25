import classNames from 'classnames/bind';
import { Button, Card, Layout, Menu, Avatar, Flex, message, Tooltip } from 'antd';
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
    ShareAltOutlined,
} from '@ant-design/icons';
import { AuthContext } from '~/components/Context/auth.context';
import styles from './Sidebar.module.scss';
import { likeApi } from '~/utils/api';
import { useContext } from 'react';

function Sidebar({ doc }) {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();
    const { Sider } = Layout;
    const { Meta } = Card;
    const { auth, setAuth } = useContext(AuthContext);
    const handleNavigate = (path) => {
        navigate('/' + path);
    };

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

    const handleLike = async () => {
        const res = await likeApi(doc._id, auth.user.email);
        if (res.EC === 1) {
            message.success('Đã lưu vào thư viện');
        } else if (res.EC === 0) {
            message.warning('Tài liệu đã có sẵn trong thư viện');
        } else {
            message.error('Đã xảy ra lỗi');
        }
    };

    const handleShare = () => {
        const url = window.location.href;
        navigator.clipboard
            .writeText(url)
            .then(() => {
                message.success('Đã sao chép đường dẫn vào bộ nhớ tạm');
            })
            .catch(() => {
                message.error('Không thể sao chép đường dẫn');
            });
    };

    const handleDownload = () => {
        window.open(doc.link, '_blank');
    };

    return (
        <Sider style={{ position: 'fixed', backgroundColor: '#ccc' }} width="300px" className={cx('wrapper')}>
            <Flex vertical justify="space-between" style={{ height: '100%' }}>
                <Flex vertical className="description" style={{}}>
                    <Card
                        style={{
                            borderRadius: '0',
                        }}
                        actions={[
                            <Tooltip title={'Tải về'}>
                                <Button style={{ backgroundColor: 'green', color: 'white' }} onClick={handleDownload}>
                                    <DownloadOutlined />
                                </Button>
                            </Tooltip>,
                            <div hidden={!auth.isAuthenticated}>
                                <Tooltip title={'Lưu vào thư viện'}>
                                    <Button style={{ backgroundColor: 'blue', color: 'white' }} onClick={handleLike}>
                                        <SaveOutlined />
                                    </Button>
                                </Tooltip>
                            </div>,
                            <div hidden={!auth.isAuthenticated}>
                                <Tooltip title={'Báo cáo tài liệu'}>
                                    <Button style={{ backgroundColor: 'red', color: 'white' }} onClick={handleNewDoc}>
                                        <WarningOutlined />
                                    </Button>
                                </Tooltip>
                            </div>,
                            <Tooltip title={'Chia sẻ tài liệu'}>
                                <Button style={{ backgroundColor: 'orange', color: 'white' }} onClick={handleShare}>
                                    <ShareAltOutlined />
                                </Button>
                            </Tooltip>,
                        ]}
                    >
                        <Meta title={doc?.title} description={doc?.description} />
                    </Card>
                    <Card
                        style={{
                            borderRadius: '0',
                        }}
                    >
                        <Meta title={'Tải lên bởi: ' + doc?.author?.fullName} description={Date(doc?.createAt)} />
                    </Card>
                </Flex>

                <div hidden={!auth.isAuthenticated}>
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
                            avatar={<Avatar src={auth?.user?.avatar} />}
                            title={auth?.user?.fullName}
                            description={auth?.user?.email}
                        />
                    </Card>
                    <Menu mode="inline" items={menuItems} onClick={handleOnclick} />
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
                                    email: '',
                                    fullName: '',
                                },
                            });

                            handleNavigate('');
                        }}
                    />
                </div>
            </Flex>
        </Sider>
    );
}

export default Sidebar;
