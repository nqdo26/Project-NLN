import { Card, Typography, Space, Badge } from 'antd';
import { CalendarOutlined, LikeOutlined, EyeOutlined, TrophyOutlined, ReadOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './CardSearch.module.scss';
import { useNavigate } from 'react-router-dom';
import { getColorByFileType } from '~/utils/typeToColorCode';


const { Title, Text } = Typography;

const cx = classNames.bind(styles);

function CardSearch({_id, title, level, badge, categories, createAt, totalVotes , views, likePercentage }) {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/doc/${_id}`);
    };

    const getBackgroundColor = (percentage) => {
        const greenIntensity = Math.floor((percentage / 100) * 200) + 55;
        return `rgb(${255 - greenIntensity}, ${greenIntensity}, ${100})`; 
    };

    return (
        <Card
            onClick={handleCardClick}
            className={cx('card-container')}
            styles={{
                body: {
                    display: 'flex',
                    width: '100%',
                    padding: '10px',
                }
            }}
        >
            
            <div className={cx('image-container')}>
                <Badge 
                    className={cx('badge')} 
                    count={badge} 
                    style={{ backgroundColor: getColorByFileType(badge) }} 
                />
                <img alt="Document" className={styles.image} />
            </div>

            <div className={cx('content')} style={{ flex: 1 }}>
                <Space>
                    <Title level={5} >
                        <span className={cx('title')} >{title}</span>
                    </Title>
                </Space>

                <Space size="middle">
                    <Text>
                    <ReadOutlined /> <span className={cx('author')} >{categories}</span>
                    </Text>
                    <Text>
                    <TrophyOutlined /> <span className={cx('author')} >{level}</span>
                    </Text>
                </Space>

                <Space size="middle" className={styles.footer}>
                    <Text>
                        <EyeOutlined /> <span className={cx('description')}>{views}</span>
                    </Text>

                    <Text>
                        <CalendarOutlined /> <span className={cx('description')}>{createAt}</span>
                    </Text>
                </Space>
            </div>

            <div>
                <Text 
                    style={{ 
                        color: getBackgroundColor(likePercentage), 
                        fontSize: '15px',
                        fontWeight: 'bold',
                    }}>
                    <LikeOutlined style={{ marginRight: '4px' }} />
                    {likePercentage}% 
                    <Text className={cx('totalVotes')}>{totalVotes}</Text>
                </Text>
            </div>
        </Card>
    );
};

export default CardSearch;
