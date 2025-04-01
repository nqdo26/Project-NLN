import classNames from 'classnames/bind';
import { Button, Card, Layout, Menu, Avatar, Flex, message, Tooltip, Modal, Input, Divider } from 'antd';
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
    LikeOutlined,
    DislikeOutlined,
    EyeOutlined,
} from '@ant-design/icons';
import { AuthContext } from '~/components/Context/auth.context';
import styles from './Sidebar.module.scss';
import { dislikeApi, likeApi, reportApi, saveApi } from '~/utils/api';
import { useContext, useState } from 'react';

function Sidebar({ doc }) {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();
    const { Sider } = Layout;
    const { Meta } = Card;
    const { auth, setAuth } = useContext(AuthContext);
    const handleNavigate = (path) => {
        navigate('/' + path);
    };
    const [reportDescription, setReportDescription] = useState('');

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
            path: '/uploaded/' + auth.user.id,
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
        console.log('Check ressss', res);
        if (res.EC === 1) {
            message.success('Đã thích bài đăng');
        } else if (res.EC === -1) {
            message.warning(res.EM);
        } else {
            message.error('Đã xảy ra lỗi');
        }
    };

    const handleDisLike = async () => {
        const res = await dislikeApi(doc._id, auth.user.email);
        if (res.EC === 1) {
            message.success(res.EM);
        } else if (res.EC === -1) {
            message.warning(res.EM);
        } else {
            message.error(res.EM);
        }
    };

    const handleSave = async () => {
        const res = await saveApi(doc._id, auth.user.email);
        if (res.EC === 1) {
            message.success(res.EM);
        } else if (res.EC === -1) {
            message.warning(res.EM);
        } else {
            message.error(res.EM);
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        console.log(doc._id, auth.user.email, reportDescription);
        const res = await reportApi(doc._id, auth.user.id, reportDescription);
        if (res.EC === 0 || res.EC === 2) {
            message.warning('Đã xảy ra lỗi');
        } else if (res.EC === 1) {
            message.success('Báo cáo thành công');
        }

        console.log(res);
        setIsModalOpen(false);
        setReportDescription('');
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Sider style={{ position: 'fixed', backgroundColor: '#ccc' }} width="300px" className={cx('wrapper')}>
            <Flex vertical justify="space-between" style={{ height: '100%' }}>
                <Flex vertical className="description" style={{}}>
                    <Card
                        style={{
                            borderRadius: '0',
                        }}
                        actions={
                            auth?.user?.id
                                ? [
                                      <Tooltip title={'Lưu Bài Đăng'}>
                                          <Button
                                              style={{ backgroundColor: 'blue', color: 'white' }}
                                              onClick={handleSave}
                                          >
                                              <SaveOutlined />
                                          </Button>
                                      </Tooltip>,

                                      <Tooltip title={'Yêu Thích Bài Đăng'}>
                                          <Button
                                              style={{ backgroundColor: 'red', color: 'white' }}
                                              onClick={handleLike}
                                          >
                                              <LikeOutlined />
                                          </Button>
                                      </Tooltip>,

                                      <Tooltip title={'Không Yêu Thích Bài Đăng'}>
                                          <Button
                                              style={{ backgroundColor: 'gray', color: 'white' }}
                                              onClick={handleDisLike}
                                          >
                                              <DislikeOutlined />
                                          </Button>
                                      </Tooltip>,

                                      <Tooltip title={'Chia sẻ tài liệu'}>
                                          <Button
                                              style={{ backgroundColor: 'orange', color: 'white' }}
                                              onClick={handleShare}
                                          >
                                              <ShareAltOutlined />
                                          </Button>
                                      </Tooltip>,
                                      <Tooltip title={'Tải về'}>
                                          <Button
                                              style={{ backgroundColor: 'green', color: 'white' }}
                                              onClick={handleDownload}
                                          >
                                              <DownloadOutlined />
                                          </Button>
                                      </Tooltip>,

                                      <Tooltip title={'Báo cáo tài liệu'}>
                                          <Button
                                              style={{ backgroundColor: '#a8071a', color: 'white' }}
                                              onClick={showModal}
                                          >
                                              <WarningOutlined />
                                          </Button>
                                      </Tooltip>,
                                  ]
                                : [
                                      <Tooltip title={'Chia sẻ tài liệu'}>
                                          <Button
                                              style={{ backgroundColor: 'orange', color: 'white' }}
                                              onClick={handleShare}
                                          >
                                              <ShareAltOutlined />
                                          </Button>
                                      </Tooltip>,
                                      <Tooltip title={'Tải về'}>
                                          <Button
                                              style={{ backgroundColor: 'green', color: 'white' }}
                                              onClick={handleDownload}
                                          >
                                              <DownloadOutlined />
                                          </Button>
                                      </Tooltip>,
                                  ]
                        }
                    >
                        <Meta title={doc?.title} description={doc?.description} />
                        <Divider />
                        <Flex gap={16} align="center" justify="center">
                            <Flex gap={4} align="center">
                                <EyeOutlined />
                                {doc?.statistics?.views}
                            </Flex>
                            <Flex gap={4} align="center">
                                <SaveOutlined />
                                {doc?.statistics?.saved}
                            </Flex>
                            <Flex gap={4} align="center">
                                <LikeOutlined />
                                {doc?.statistics?.liked}
                            </Flex>
                            <Flex gap={4} align="center">
                                <DislikeOutlined />
                                {doc?.statistics?.disliked}
                            </Flex>
                            <Flex gap={4} align="center">
                                <DownloadOutlined />
                                {doc?.statistics?.downloaded}
                            </Flex>
                        </Flex>
                    </Card>
                    <Card
                        style={{
                            borderRadius: '0',
                        }}
                    >
                        <Meta
                            title={'Tải lên bởi: ' + doc?.author?.fullName}
                            description={new Date(doc?.createAt).toLocaleDateString('vi-VN')}
                        />
                    </Card>
                </Flex>
                <Modal title="Báo cáo tài liệu" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <p>Nhập nội dung báo cáo</p>
                    <Input
                        value={reportDescription}
                        onChange={(e) => setReportDescription(e.target.value)}
                        style={{ marginTop: '10px' }}
                    ></Input>
                </Modal>
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
                                    id: '',
                                    email: '',
                                    fullName: '',
                                    avatar: '',
                                    isAdmin: false,
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
