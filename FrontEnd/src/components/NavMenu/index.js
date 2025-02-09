import classNames from 'classnames/bind';
import React from 'react';
import { Layout, Input, Menu, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

import styles from './NavMenu.module.scss';

const cx = classNames.bind(styles);
const menuItems = [
    {
        key: 'home',
        label: 'Trang chủ',
        path: '/',
    },
    {
        key: 'search',
        label: 'Tìm kiếm',
        path: '/search',
    },
];

function NavMenu() {
    const navigate = useNavigate();

    const handleOnclick = (e) => {
        const item = menuItems.find((item) => item.key === e.key);
        if (item) {
            navigate(item.path);
        }
    };

    return <Menu className={cx('wrapper')} mode="horizontal" items={menuItems} onClick={handleOnclick} />;
}

export default NavMenu;
