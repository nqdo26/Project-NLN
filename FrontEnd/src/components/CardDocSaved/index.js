import classNames from 'classnames/bind';
import { Card, Typography, Badge, Button } from 'antd';
import { LikeOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './CardDocSaved.module.scss';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const cx = classNames.bind(styles);

function CardDocSaved() {
    const navigate = useNavigate();

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.slice(0, maxLength - 3) + '...' : text;
    };

    const handleCardClick = () => {
        navigate('/doc/hehe');
    };

    const handleDeleteClick = () => {
        console.log('Delete button clicked');
    };

    const likePercentage = 80;
    const totalVotes = 15;

    const getBackgroundColor = (percentage) => {
        const greenIntensity = Math.floor((percentage / 100) * 200) + 55;
        return `rgb(${255 - greenIntensity}, ${greenIntensity}, ${100})`;
    };

    return (
        <Card
            className={cx('card')}
            onClick={handleCardClick}
            hoverable
            style={{
                width: 180,
                borderRadius: 15,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
            cover={
                <div style={{ position: 'relative', textAlign: 'center', padding: 8 }}>
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
                    <Badge count={34} className={cx('badge')} style={{ backgroundColor: '#c2c2c2', color: 'white' }} />
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={handleDeleteClick}
                        className={cx('delete-button')}
                    />
                </div>
            }
            bodyStyle={{
                padding: '0 8px 8px 8px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
            }}
        >
            <div style={{ flex: 1, overflow: 'hidden' }}>
                <Title
                    level={5}
                    style={{
                        margin: 0,
                        fontSize: 14,
                        height: 65,
                        color: '#1677ff',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {truncateText(
                        'Kỹ thuật lập trình C Kỹ thuật lập trình C Kỹ thuật lập  trình C  Kỹ thuật lập trình CKỹ thuật lập trình C',
                        72,
                    )}
                </Title>

                <Text
                    style={{
                        fontSize: 12,
                        color: '#888',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    Nhập môn về kỹ thuật
                </Text>
            </div>
            <div
                style={{
                    marginTop: 8,
                    borderRadius: 15,
                    fontSize: 14,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: getBackgroundColor(likePercentage),
                    color: 'white',
                    padding: '6px 12px',
                }}
            >
                <LikeOutlined style={{ marginRight: 5 }} />
                {likePercentage}% ({totalVotes})
            </div>
        </Card>
    );
}

export default CardDocSaved;
