import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { CheckCircleFilled, PlusOutlined } from '@ant-design/icons';
import { Select, Space, Tooltip, List, Skeleton, Avatar, Card, Typography, Flex, Button, Badge } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

import styles from './Notification.module.scss';
import CardDocument from '../CardDocument';

function Notification({ item }) {
    const cx = classNames.bind(styles);
    const { Meta } = Card;
    const { Title } = Typography;
    const navigate = useNavigate();

    const handleOnClick = (path) => {
        navigate('/doc/' + path);
    };
    return (
        <List.Item>
            <Skeleton avatar title={false} loading={item.loading} active>
                <Flex
                    vertical
                    justify="space-between"
                    style={{ width: '100%', height: '100%', padding: '50px 0px 50px 0px' }}
                >
                    <List.Item.Meta
                        avatar={<Avatar src={item.picture.large} />}
                        title={
                            <Button style={{ fontWeight: 'bold', marginLeft: '-20px' }} type="text">
                                {item.name?.last} đã báo cáo về tài liệu
                            </Button>
                        }
                        description="Ngay 1/1/2001"
                    />

                    <Flex gap={10} style={{ padding: '10px' }}>
                        <Button onClick={() => handleOnClick(item.name)}>Truy cập tài liệu</Button>
                        <Button>Truy cập nguời báo cáo</Button>

                        <Button>Đánh dấu đã đọc</Button>
                        <Button>Xóa</Button>
                    </Flex>
                </Flex>
                <Badge.Ribbon text={'Đã đọc'}>
                    {/* <Card
                        style={{
                            width: 300,
                        }}
                        cover={
                            <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                        }
                    >
                        <Meta title="Card title" />
                    </Card> */}
                    <CardDocument action="Like" />
                </Badge.Ribbon>
            </Skeleton>
        </List.Item>
    );
}

export default Notification;
