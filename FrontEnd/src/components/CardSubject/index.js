import { Card, Typography } from 'antd';
import { FolderOpenOutlined } from '@ant-design/icons';
import { FaStickyNote } from 'react-icons/fa';
import classNames from 'classnames/bind';
import styles from './CardSubject.module.scss';

const cx = classNames.bind(styles);
const { Text } = Typography;

function CardSubject() {
    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.slice(0, maxLength - 3) + '...' : text;
    };
    return (
        <Card
            bodyStyle={{
                display: 'flex',
            }}
            className={cx('document-card')}
        >
            <div className={cx('doc-icon')}>
                <FaStickyNote size={24} color="#0099ff" />
            </div>
            <div className={cx('doc-content')}>
                <Text strong className={cx('doc-title')}>
                    Nhập môn lập trình căn bản
                </Text>
                <div className={cx('doc-info')}>
                    <FolderOpenOutlined className={cx('doc-icon-small')} />
                    <Text type="secondary">{truncateText('Thông tin gì đó', 15)}</Text>
                    <span className={cx('dot-divider')}>•</span>
                    <FaStickyNote className={cx('doc-icon-small')} />
                    <Text type="secondary"> {truncateText('Thông tin gì đó', 12)}</Text>
                </div>
            </div>
        </Card>
    );
}

export default CardSubject;
