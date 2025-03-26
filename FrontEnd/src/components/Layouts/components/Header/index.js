import classNames from 'classnames/bind';
import NavMenu from '~/components/NavMenu';
import { Layout, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';

import styles from './Header.module.scss';
import { useContext } from 'react';
import { AuthContext } from '~/components/Context/auth.context';

function Header() {
    const cx = classNames.bind(styles);
    const { Header } = Layout;
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);
    const handleNavigate = (path) => {
        navigate('/' + path);
    };

    return (
        <Header className={cx('wrapper')}>
            <Flex justify="space-between" className={cx('inner')}>
                <div className={cx('logo')} onClick={() => handleNavigate('')}>
                    <img src="/logo.png" alt="documan" />
                </div>

                <div className={cx('menu')}>
                    <NavMenu />
                </div>
                {!auth.isAuthenticated && (
                    <div className={cx('button')}>
                        <button onClick={() => handleNavigate('login')}>Đăng Nhập</button>
                        <button onClick={() => handleNavigate('signup')}>Đăng Ký</button>
                    </div>
                )}
            </Flex>
        </Header>
    );
}

export default Header;
