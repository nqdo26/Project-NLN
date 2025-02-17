import { Card, Typography, Space } from 'antd';
import { FileTextOutlined, CalendarOutlined, LikeOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './CardSearch.module.scss';

const { Title, Text } = Typography;

const cx = classNames.bind(styles);

function CardSearch() {

    const getBackgroundColor = (percentage) => {
        const greenIntensity = Math.floor((percentage / 100) * 200) + 55;
        return `rgb(${255 - greenIntensity}, ${greenIntensity}, ${100})`; 
    };

    const likePercentage = 10; 

    return (
        <Card
            className={styles.card}
            bodyStyle={{
                display: 'flex',
                width: '100%',
                padding: '10px',
    
              
            }}
        >
            <div className={styles['image-container']}>
                <img src="https://via.placeholder.com/80" alt="Document" className={styles.image} />
            </div>

            <div className={cx('content')} style={{ flex: 1 }}>
                <Space>
                    <Title level={5} >
                        <span className={cx('title')} >2025 Maths ATP Grade 12 Final</span>
                    </Title>
                </Space>

                <Space size="middle">
                    <Text>
                    <span className={cx('author')} >2025 Maths ATP Grade 12 Final</span>
                    </Text>
                    <Text>
                    <span className={cx('author')} >2025 Maths ATP Grade 12 Final</span>
                    </Text>
                </Space>

                <Space size="middle" className={styles.footer}>
                    <Text>
                        <FileTextOutlined /> <span className={cx('description')}>4 pages</span>
                    </Text>
                    <Text>
                        <CalendarOutlined /> <span className={cx('description')}>8/2019</span>
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
                    <Text className={cx('totalVotes')}>(155)</Text>
                </Text>
            </div>
        </Card>
    );
};

export default CardSearch;
