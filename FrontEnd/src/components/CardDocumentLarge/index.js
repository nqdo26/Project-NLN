import React from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Card, Button, Typography, Badge, Flex, Tag, Divider, Avatar, Popconfirm } from 'antd';
import { DeleteOutlined, LikeOutlined, SaveOutlined } from '@ant-design/icons';
import styles from './CardDocumentLarge.module.scss';
import { getColorByFileType } from '~/utils/typeToColorCode';

function CardDocumentLarge({ item, action = 'Save', isSaved = false }) {
    const navigate = useNavigate();

    const handleOnClick = (item) => {
        navigate('/doc/' + item._id);
    };

    const handleAction = () => {
        navigate('/');
    };

    return (
        <Card
            hoverable
            onClick={(e) => {
                e.preventDefault();
                handleOnClick(item);
            }}
            title={item.title}
            extra={
                <Flex>
                    <Tag key={'type'} color={getColorByFileType(item.type)}>
                        {item.type}
                    </Tag>
                    <Popconfirm
                        title={'Xóa tài liệu này?'}
                        description={'Bạn có chắc chắn muốn xóa tài liệu này?'}
                        okText="Xóa"
                        cancelText="Hủy"
                        onCancel={(e) => e.stopPropagation()}
                        onConfirm={(e) => {
                            e.stopPropagation();
                            handleAction();
                        }}
                    >
                        <Button
                            key={'delete'}
                            ghost
                            size="small"
                            style={{ color: 'red' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <DeleteOutlined />
                        </Button>
                    </Popconfirm>
                </Flex>
            }
        >
            <div style={{ margin: '0 0 20px 0' }}>
                <Flex justify="space-between">
                    <p>Mô tả</p>
                    <p>{item.level.title}</p>
                </Flex>
                <Card.Meta style={{ padding: '10px 10px 10px 10px' }} description={item.description} />
            </div>
            <Flex wrap gap={4}>
                {item.categories && item.categories.map((category, index) => <Tag key={index}>{category.title}</Tag>)}
            </Flex>
            <Divider></Divider>
            <Card.Meta
                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                title={item.author.fullName}
                description={'Ngày đăng ' + item.createAt}
            />
        </Card>
    );
}

export default CardDocumentLarge;
