import React from 'react';
import { Layout, Row, Col, Typography, Space, Divider } from 'antd';
import classNames from 'classnames/bind';
import {
    FacebookOutlined,
    TwitterOutlined,
    LinkedinOutlined,
    YoutubeOutlined,
    InstagramOutlined,
} from '@ant-design/icons';

import styles from './CustomFooter.module.scss';

const { Footer } = Layout;
const { Text, Title } = Typography;

const CustomFooter = () => {
    const cx = classNames.bind(styles);
    return (
        <Footer className={cx('wrapper')} style={{ width: '100%', backgroundColor: '#ffff', padding: '40px 20px'}}>
            <Row gutter={[16, 16]} justify="space-between">
                <Col xs={24} sm={8}>
                    <Title level={4} style={{ color: '#6c757d' }}>
                        studocu
                    </Title>
                </Col>

                <Col xs={24} sm={5}>
                    <Title level={5} style={{ color: '#000' }}>
                        Company
                    </Title>
                    <Space direction="vertical" style={{ display: 'flex' }}>
                        <Text>About Us</Text>
                        <Text>Studocu Premium</Text>
                        <Text>Ask AI</Text>
                        <Text>Notes AI</Text>
                        <Text>Studocu World University Ranking 2023</Text>
                        <Text>E-Learning Statistics</Text>
                        <Text>Doing Good</Text>
                        <Text>Academic Integrity</Text>
                        <Text>Jobs</Text>
                        <Text>Blog</Text>
                        <Text>Dutch Website</Text>
                    </Space>
                </Col>

                <Col xs={24} sm={8}>
                    <Title level={5} style={{ color: '#000' }}>
                        Contact & Help
                    </Title>
                    <Space direction="vertical" style={{ display: 'flex' }}>
                        <Text>F.A.Q.</Text>
                        <Text>Contact</Text>
                        <Text>Newsroom</Text>
                    </Space>
                
                    <div style={{ marginTop: '95px' }}></div>

                    <Title level={5} style={{ color: '#000' }}>
                        Legal
                    </Title>
                    <Space direction="vertical" style={{ display: 'flex' }}>
                        <Text>Terms</Text>
                        <Text>Privacy Policy</Text>
                        <Text>Cookie Settings</Text>
                        <Text>Cookie Statement</Text>
                    </Space>
                </Col>
            </Row>

            <Divider style={{ margin: '20px 0' }} />

            <Row justify="space-between" align="middle">
                <Col>
                    <Space>
                        <Text>© 2025 Studocu, All rights reserved</Text>
                    </Space>
                </Col>
                <Col>
                    <Space>
                        <Text>English</Text>
                        <Text>|</Text>
                        <Text>United States</Text>
                    </Space>
                </Col>
            </Row>

            <Row justify="center" style={{ marginTop: '20px' }}>
                <Space>
                    <FacebookOutlined style={{ fontSize: '24px', color: '#6c757d' }} />
                    <TwitterOutlined style={{ fontSize: '24px', color: '#6c757d' }} />
                    <LinkedinOutlined style={{ fontSize: '24px', color: '#6c757d' }} />
                    <YoutubeOutlined style={{ fontSize: '24px', color: '#6c757d' }} />
                    <InstagramOutlined style={{ fontSize: '24px', color: '#6c757d' }} />
                </Space>
            </Row>
        </Footer>
    );
};

export default CustomFooter;
