import React from 'react';
import { Col, Row, Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Meta } from 'antd/es/list/Item';

function Profile() {
    return (
        <Row>
            <Col span={6}>
                <Card
                    style={{
                        width: 300,
                    }}
                    cover={
                        <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
                    }
                    actions={[
                        <SettingOutlined key="setting" />,
                        <EditOutlined key="edit" />,
                        <EllipsisOutlined key="ellipsis" />,
                    ]}
                >
                    <Meta
                        avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                        title="Card title"
                        description="This is the description"
                    />
                </Card>
            </Col>
        </Row>
    );
}

export default Profile;
