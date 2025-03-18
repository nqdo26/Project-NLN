import { Card, Typography, Space } from 'antd';
import { FileOutlined, FolderOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './CardSubjectSearch.module.scss';

const { Title, Text } = Typography;

const cx = classNames.bind(styles);

function CardSubjectSearch({title, total}) {

    return (
        <Card
            className={cx('card-wrapper')}

            bodyStyle={{
                display: 'flex',
                width: '100%',
                padding: '10px',
            }}
        >
            <div className={cx('icon')}>
                <FolderOutlined style={{ fontSize: '35px', color: 'green' }}  />
            </div>

            <div className={cx('content')} style={{ flex: 1 }}>
                <Space>
                    <Title level={5}>
                        <span className={cx('title')}>{title}</span>
                    </Title>
                </Space>

                <Space size="middle">
                    <Text>
                        <FileOutlined style={{ marginRight: '5px' }} />
                        {total + ' tài liệu'}
                    </Text>
                </Space>
            </div>
        </Card>
    );
}

export default CardSubjectSearch;
