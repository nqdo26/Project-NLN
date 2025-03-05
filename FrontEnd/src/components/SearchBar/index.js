import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './SearchBar.module.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function SearchBar() {
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchValue.trim()) {
            navigate(`/search?title=${encodeURIComponent(searchValue)}`);
        }
    };

    return (
        <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onPressEnter={handleSearch}
            placeholder="Tìm kiếm tài liệu..."
            prefix={
                <SearchOutlined
                    className={cx('search-icon')}
                    onClick={handleSearch}
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
