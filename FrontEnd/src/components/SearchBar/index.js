import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './SearchBar.module.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function SearchBar() {
    const [isPressed, setIsPressed] = useState(false);
    const navigate = useNavigate();

    const handleMouseDown = () => {
        setIsPressed(true);
    };

    const handleMouseUp = () => {
        setIsPressed(false);
        navigate('/search');
    };

    return (
        <Input
            placeholder="Tìm kiếm tài liệu..."
            prefix={
                <SearchOutlined
                    className={cx('search-icon', { 'search-icon-active': isPressed })}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                />
            }
            style={{
                width: '100%',
                borderRadius: 100000,
                padding: '15px 20px',
                paddingLeft: 55,
            }}
        />
    );
}

export default SearchBar;