import { Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './PostEncouragement.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function PostEncouragement() {

    const navigate = useNavigate();

    return (
        <div>
            <h2 className={cx('title')}>Inspire Others: Share Your Knowledge</h2>
            <div className={cx('encouragement-container')}>
                <div className={cx('content')}>
                    <p>
                        <strong>Share your knowledge</strong> with the community and help others learn better!
                    </p>
                    <Button 
                        icon={<UploadOutlined />} 
                        type="primary" 
                        className={cx('post-btn')}
                        onClick={() => navigate('/new-doc')}
                    >
                        Post Now
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default PostEncouragement;
