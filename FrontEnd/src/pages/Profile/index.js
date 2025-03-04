import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import React, { useState } from 'react';
import {
    Layout,
    Avatar,
    Input,
    Button,
    Modal,
    Upload,
    message,
    Row,
    Col,
    Typography,
    Divider,
    List,
    Table,
    Descriptions,
    Image,
    Form,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './Profile.module.scss';
import { useForm } from 'antd/es/form/Form';

const { Header, Content } = Layout;

function Profile() {
    const cx = classNames.bind(styles);
    const [name, setName] = useState('Nguyễn Văn A');
    const [email, setEmail] = useState('doanb2103541@student.ctu.edu.vn');

    const [avatar, setAvatar] = useState('logo.png');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible1, setIsModalVisible1] = useState(false);
    const [newName, setNewName] = useState(name);
    const [form] = useForm();

    const handleNameChange = () => {
        setName(newName);
        message.success('Tên Đã Được Thay Đổi');
        handleOk1();
        form.resetFields();
    };

    const handleAvatarChange = (file) => {
        setAvatar(URL.createObjectURL(file));
        message.success('Ảnh Đại Diện Đã Được Thay Đổi!');
        handleOk();
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const showModal1 = () => {
        setIsModalVisible1(true);
    };

    const handleOk1 = () => {
        setIsModalVisible1(false);
    };

    const handleCancel1 = () => {
        setIsModalVisible1(false);
    };

    return (
        <Row justify={'center'}>
            <Col span={12} style={{ backgroundColor: '#fff', margin: '16px', borderRadius: '8px' }}>
                <div className="profile-container" style={{ textAlign: 'center', marginTop: '16px' }}>
                    <Typography.Title level={3}>Trang Cá Nhân</Typography.Title>
                    <Divider />
                    <Col span={24}>
                        <Avatar
                            style={{
                                objectFit: 'cover',
                                cursor: 'pointer',
                                backgroundColor: 'Highlight',
                            }}
                            size={128}
                            src={avatar}
                            onClick={showModal}
                        ></Avatar>
                    </Col>

                    <Row justify={'center'}>
                        <Col span={18}>
                            <Descriptions bordered column={1}>
                                <Descriptions.Item label="Tên người dùng">{name}</Descriptions.Item>
                                <Descriptions.Item label="Email">{email}</Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Row>
                    <Col style={{ margin: 16 }}>
                        <Button onClick={showModal1}>Thay Đổi Thông Tin</Button>
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
                        open={isModalVisible1}
                        onOk={handleOk1}
                        onCancel={handleCancel1}
                        footer={<></>}
                    >
                        <Form form={form}>
                            <Form.Item name={'input'}>
                                <Input
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    placeholder="Nhập tên mới"
                                />
                            </Form.Item>
                            <Form.Item style={{ textAlign: 'end' }}>
                                <Button htmlType="submit" onClick={handleNameChange}>
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
