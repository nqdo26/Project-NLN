import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { Layout } from 'antd';

function Sidebar() {
    const cx = classNames.bind(styles);
    const { Sider } = Layout;

    return (
        <Sider style={{ position: 'fixed' }} width="20%" className={cx('wrapper')}>
            <div className={cx('content')}>
                <h2>Sidebar</h2>
            </div>
        </Sider>
    );
}

export default Sidebar;
