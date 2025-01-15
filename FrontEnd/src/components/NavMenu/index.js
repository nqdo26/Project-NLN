import classNames from 'classnames/bind';
import React from 'react';
import { Layout, Input, Menu, Button } from 'antd';
import { SearchOutlined, DownOutlined } from '@ant-design/icons';
import styles from './NavMenu.module.scss';

const cx = classNames.bind(styles);

function NavMenu() {
    return (
        <Menu className={cx('menu')} mode="horizontal" style={{ borderBottom: 'none', background: 'transparent' }}>
            <Menu.Item key="university">University</Menu.Item>
            <Menu.SubMenu
                key="highschool"
                title={
                    <span>
                        High School <DownOutlined />
                    </span>
                }
            />
            <Menu.Item key="books">Books</Menu.Item>
        </Menu>
    );
}
    
export default NavMenu;
