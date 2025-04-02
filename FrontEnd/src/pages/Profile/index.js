import React, { useContext, useEffect, useState } from 'react';
import {
    Col,
    Row,
    Button,
    Avatar,
    Upload,
    Modal,
    Form,
    Input,
    message,
    Typography,
    Divider,
    Descriptions,
    notification,
} from 'antd';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { useForm } from 'antd/es/form/Form';
import { UploadOutlined } from '@ant-design/icons';
import { updateNameApi } from '~/utils/api';
import { AuthContext } from '~/components/Context/auth.context';

function Profile() {
    const cx = classNames.bind(styles);
    const { auth, setAuth } = useContext(AuthContext);

    const [avatar, setAvatar] = useState(auth?.user?.avatar);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalUpdateName, setIsModalUpdateName] = useState(false);
    const [form] = useForm();

    const handleUpdateName = async () => {
        try {
            if (auth?.user?.id) {
                const values = await form.validateFields();
                const res = await updateNameApi(auth?.user?.id, values.title);
                if (res) {
                    notification.success({
                        message: 'Thành công',
                        description: 'Cập nhật tên thành công',
                    });
                    setAuth((prevAuth) => ({
                        ...prevAuth,
                        user: {
                            ...prevAuth.user,
                            fullName: values.title,
                        },
                    }));
                    setIsModalUpdateName(false);
                    form.resetFields();
                } else {
                    notification.warning({
                        message: 'Thất bại',
                        description: res.EM || 'Tên đã tồn tại hoặc có lỗi xảy ra',
                    });
                }
            }
        } catch (error) {
            notification.error({
                message: 'Lỗi',
                description: 'Có lỗi xảy ra khi cập nhật tên',
            });
            console.error('Error in handleUpdateName:', error);
        }
    };

    const handleAvatarChange = (file) => {
        setAvatar(URL.createObjectURL(file));
        message.success('Ảnh Đại Diện Đã Được Thay Đổi!');
        handleOk();
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const showModalName = () => {
        setIsModalUpdateName(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleOkName = () => {
        setIsModalUpdateName(false);
    };

    const handleCancelName = () => {
        setIsModalUpdateName(false);
    };

    return (
        <Row justify={'center'} style={{ backgroundColor: '#f6f7fb' }}>
            <Col span={12} style={{ backgroundColor: '#ffff', margin: '16px', borderRadius: '8px' }}>
                <div className="profile-container" style={{ textAlign: 'center', marginTop: '16px' }}>
                    <Typography.Title level={3}>Trang Cá Nhân</Typography.Title>
                    <Divider />
                    <Col span={24} style={{ marginBottom: 16 }}>
                        <Avatar
                            style={{
                                objectFit: 'cover',
                                cursor: 'pointer',
                                backgroundColor: 'Highlight',
                            }}
                            size={128}
                            src={auth?.user?.avatar}
                            onClick={showModal}
                        ></Avatar>
                    </Col>

                    <Row justify={'center'}>
                        <Col span={18}>
                            <Descriptions bordered column={1}>
                                <Descriptions.Item label="Tên người dùng">{auth?.user?.fullName}</Descriptions.Item>
                                <Descriptions.Item label="Email">{auth?.user?.email}</Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Row>
                    <Col style={{ margin: 16 }}>
                        <Button onClick={showModalName}>Thay Đổi Thông Tin</Button>
                    </Col>

                    <Modal title="Chọn Ảnh" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <Upload
                            name="avatar"
                            listType="picture"
                            className="avatar-uploader"
                            showUploadList={false}
                            beforeUpload={handleAvatarChange}
                        >
                            <Button icon={<UploadOutlined />}>Chọn Ảnh</Button>
                        </Upload>
                    </Modal>

                    <Modal
                        title="Thay Đổi Thông Tin Người Dùng"
                        open={isModalUpdateName}
                        onOk={handleOkName}
                        onCancel={handleCancelName}
                        footer={<></>}
                    >
                        <Form form={form}>
                            <Form.Item name={'title'}>
                                <Input placeholder="Nhập tên mới" />
                            </Form.Item>
                            <Form.Item style={{ textAlign: 'end' }}>
                                <Button htmlType="submit" onClick={handleUpdateName}>
                                    Cập Nhật
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </Col>
        </Row>
    );
}

export default Profile;
