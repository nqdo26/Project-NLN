import { Divider, Flex, Typography, Input, Button, theme, Steps, message } from 'antd';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { EditOutlined, ReadOutlined } from '@ant-design/icons';

import styles from './AdminNotification.module.scss';

function AdminNotification() {
    const cx = classNames.bind(styles);

    return <div className={cx('wrapper')}>admin noti</div>;
}

export default AdminNotification;
