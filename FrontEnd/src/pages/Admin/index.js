
import classNames from 'classnames/bind';


import styles from './Admin.module.scss';

function Admin() {
    const cx = classNames.bind(styles);

    return <div className={cx('wrapper')}>hehe</div>;
}

export default Admin;