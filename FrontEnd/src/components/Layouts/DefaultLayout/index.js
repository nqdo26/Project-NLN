import classNames from 'classnames/bind';
import Header from '~/components/Layouts/components/Header';
import styles from './DefaultLayout.module.scss';
import Sidebar from './Sidebar';
import { Layout } from 'antd';
import CustomFooter from '../components/Footer/CustomFooter';
import { useContext } from 'react';
import { AuthContext } from '~/components/Context/auth.context';

function DefaultLayout({ children }) {
    const { Content } = Layout;
    const { auth } = useContext(AuthContext);

    const cx = classNames.bind(styles);
    return (
        <Layout>
            <Header className={cx('header')} />
            <Layout hasSider>
                {auth.isAuthenticated ? <Sidebar className={cx('sidebar')} /> : <></>}

                <Content className={cx('content')}>
                        {children}
                </Content>
            </Layout>
            <div className={cx('footer')}><CustomFooter/></div>
        </Layout>
    );
}

export default DefaultLayout;
