import { Card, Typography } from 'antd';
import { FolderOpenOutlined } from '@ant-design/icons';
import { FaStickyNote } from 'react-icons/fa';
import classNames from 'classnames/bind';
import styles from './CardSubject.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
const { Text } = Typography;

function CardSubject({ title, categoryId, total }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/category/${categoryId}`);
    };

    return (
        <Card
            styles={{
                body: {
                    display: 'flex',
                    cursor: 'pointer',
                },
            }}
            onClick={handleClick}
            className={cx('document-card')}
        >
            <div className={cx('doc-icon')}>
                <FaStickyNote size={24} color="#0099ff" />
            </div>
            <div className={cx('doc-content')}>
                <Text strong className={cx('doc-title')}>
                    {title}
                </Text>
                <div className={cx('doc-info')}>
                    <FolderOpenOutlined className={cx('doc-icon-small')} />
                    <Text type="secondary">{total + ' tài liệu'}</Text>
                </div>
            </div>
        </Card>
    );
}

export default CardSubject;
