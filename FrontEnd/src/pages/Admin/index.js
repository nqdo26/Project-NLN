import classNames from 'classnames/bind';

import styles from './Admin.module.scss';
import { Flex } from 'antd';

function Admin() {
    const cx = classNames.bind(styles);

    return (
        <div className={cx('wrapper')}>
            <Flex vertical gap={16} justify="center" align="center" style={{ width: '100%', height: '100%' }}>
                <h1>Xin chào quản trị viên!</h1>
                Truy cập các danh mục để quản lý hệ thống...
            </Flex>
        </div>
    );
}

export default Admin;
