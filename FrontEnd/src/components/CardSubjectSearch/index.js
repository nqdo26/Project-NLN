import { Card, Typography, Space } from 'antd';
import { FolderFilled, BankOutlined, FileOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './CardSubjectSearch.module.scss';

const { Title, Text } = Typography;

const cx = classNames.bind(styles);

function CardSubjectSearch() {

    return (
        <Card
            className={styles.card}
            bodyStyle={{
                display: 'flex',
                width: '100%',
                padding: '10px',
            }}
        >
            <div className={cx('icon')}>
                <FolderFilled style={{ fontSize: '35px', color: 'green' }} />
            </div>

            <div className={cx('content')} style={{ flex: 1 }}>
                <Space>
                    <Title level={5}>
                        <span className={cx('title')}>2025 Maths ATP Grade 12 Final</span>
                    </Title>
                </Space>

                <Space size="middle">
                    <Text>
                        <BankOutlined style={{ marginRight: '5px' }} />
                        <span className={cx('author')}>Đại Học Cần Thơ</span>
                    </Text>
                    <Text>
                        <FileOutlined style={{ marginRight: '5px' }} />
                        20 documents
                    </Text>
                </Space>
            </div>
        </Card>
    );
}

export default CardSubjectSearch;
