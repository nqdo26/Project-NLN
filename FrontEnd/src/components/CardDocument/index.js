import React from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Card, Button, Typography, Badge, Flex } from 'antd';
import { LikeOutlined, SaveOutlined } from '@ant-design/icons';
import styles from './CardDocument.module.scss';

const { Title, Text } = Typography;

const cx = classNames.bind(styles);

function CardDocument({
    document = { title: 'Null', createAt: 'Null', type: 'type', statistics: { likes: 0, dislikes: 0 } },
    action = 'Save',
    isSaved = false,
}) {
    const navigate = useNavigate();

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.slice(0, maxLength - 3) + '...' : text;
    };

    const handleCardClick = () => {
        navigate('/doc/hehe');
    };

    const handleAction = () => {
        navigate('/');
    };

    return (
        <Card
            className={cx('card')}
            hoverable
            onClick={handleCardClick}
            style={{ maxWidth: '180px', borderRadius: '15px' }}
            cover={
                <div style={{ padding: '12px 12px 0 12px' }}>
                    <img
                        alt="document"
                        src={require('../../assets/imgs/test-image.jpg')}
                        style={{
                            width: '100%',
                            height: 130,
                            borderRadius: 10,
                            objectFit: 'cover',
                        }}
                    />
                </div>
            }
        >
            <div style={{ margin: '-15px -5px 0px -5px', height: '80px' }}>
                <Title level={5}>{truncateText(document.title, 50)}</Title>
            </div>
            <Flex justify="space-between" align="center" style={{ margin: '0 -5px 0 -5px' }}>
                <Card.Meta description={document.createAt}></Card.Meta>
                <Badge count={document.type} style={{}} />
            </Flex>
            <div style={{ margin: '15px -10px -12px -10px' }}>
                <Button
                    disabled={action === 'Save' ? false : true}
                    style={{
                        borderRadius: '15px',
                        backgroundColor:
                            action === 'Save' && !isSaved
                                ? '#fff'
                                : action === 'Save' && isSaved
                                ? '#569CFF'
                                : '#28D764',
                        color: action === 'Save' && !isSaved ? 'black' : action === 'Save' && isSaved ? '#fff' : '#fff',
                        cursor: 'pointer',
                    }}
                    className={cx('button')}
                    icon={action === 'Save' ? <SaveOutlined /> : <LikeOutlined />}
                    block
                    onClick={handleAction}
                >
                    {action === 'Save'
                        ? 'Save'
                        : Math.round(
                              (document.statistics.likes /
                                  (document.statistics.likes + document.statistics.dislikes !== 0
                                      ? document.statistics.likes + document.statistics.dislikes
                                      : 1)) *
                                  100,
                          ) +
                          '% (' +
                          document.statistics.likes +
                          ')'}
                </Button>
            </div>
        </Card>
    );
}

export default CardDocument;
