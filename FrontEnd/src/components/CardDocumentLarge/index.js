import React from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Card, Button, Typography, Badge, Flex, Tag, Divider, Avatar } from 'antd';
import { LikeOutlined, SaveOutlined } from '@ant-design/icons';
import styles from './CardDocumentLarge.module.scss';

const { Title, Text } = Typography;

const cx = classNames.bind(styles);

function CardDocumentLarge({
    document = {
        title: 'Null',
        description: 'Document description',
        createAt: 'Null',
        type: 'type',
        statistics: { likes: 0, dislikes: 0 },
    },
    action = 'Save',
    isSaved = false,
}) {
    const navigate = useNavigate();

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.slice(0, maxLength - 3) + '...' : text;
    };

    const handleOnClick = () => {
        navigate('/doc/hehe');
    };

    const handleAction = () => {
        navigate('/');
    };

    return (
        <Card
            hoverable
            onClick={() => handleOnClick()}
            title={document.title}
            extra={
                <Tag style={{ marginRight: '-5px' }} color={document.color}>
                    {document.type}
                </Tag>
            }
            cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
        >
            <Card.Meta description={document.description} />
            <Divider></Divider>
            <Card.Meta
                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                title="KongTrua"
                description={'Ngày đăng ' + document.createAt}
            />
        </Card>
    );
}

export default CardDocumentLarge;
