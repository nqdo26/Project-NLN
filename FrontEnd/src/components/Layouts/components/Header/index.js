import classNames from 'classnames/bind';
import NavMenu from '~/components/NavMenu';
import { Layout, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';

import styles from './Header.module.scss';

function Header() {
    const cx = classNames.bind(styles);
    const { Header } = Layout;
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate('/' + path);
    };

    return (
        <Header className={cx('wrapper')}>
            <Flex justify="space-between" className={cx('inner')}>
                <div className={cx('logo')} onClick={() => handleNavigate('')}>
                    <img src="logo.png" alt="Studocu Logo" />
                </div>

                <div className={cx('menu')}>
                    <NavMenu />
                </div>

                <div className={cx('button')}>
                    <button onClick={() => handleNavigate('login')}>Sign in</button>
                </div>
            </Flex>
        </Header>
    );
}

export default Header;
