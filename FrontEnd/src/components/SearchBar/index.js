import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './SearchBar.module.scss';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function SearchBar({ onSearch, searchPath }) {
    const navigate = useNavigate();
    const location = useLocation(); 
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const title = params.get('title');
        if (title) {
            setSearchValue(title);
        }
    }, [location.search]); 

    const handleSearch = () => {
        if (!searchValue.trim() || !searchPath) return;
        navigate(`${searchPath}?title=${encodeURIComponent(searchValue)}`);
        onSearch(searchValue);
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
                    style={{
                        color: searchValue.trim() ? '#1890ff' : '#ccc',
                        cursor: searchValue.trim() ? 'pointer' : 'not-allowed',
                    }}
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
