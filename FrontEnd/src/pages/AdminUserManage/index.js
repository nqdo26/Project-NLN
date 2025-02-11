import { Divider, Flex, Typography, Input, Button, theme, Steps, message } from 'antd';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { EditOutlined, ReadOutlined } from '@ant-design/icons';

import styles from './AdminUserManage.module.scss';

function AdminUserManage() {
    const cx = classNames.bind(styles);

    return <div className={cx('wrapper')}>usermanage</div>;
}

export default AdminUserManage;
