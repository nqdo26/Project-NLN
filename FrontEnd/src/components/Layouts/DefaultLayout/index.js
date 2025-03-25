import classNames from 'classnames/bind';
import Header from '~/components/Layouts/components/Header';
import styles from './DefaultLayout.module.scss';
import Sidebar from './Sidebar';
import { Layout } from 'antd';
import CustomFooter from '../components/Footer/CustomFooter';
import { useContext } from 'react';
import { AuthContext } from '~/components/Context/auth.context';

    const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const { Content } = Layout;
    const { auth } = useContext(AuthContext);
    const cx = classNames.bind(styles);
    console.log(auth);
    return (
        <Layout
            style={{
                backgroundColor: 'white',
            }}>
            <Header className={cx('header')} />
            <Layout style={{
                backgroundColor: 'white',
            }} hasSider>
                {auth.isAuthenticated ? <Sidebar className={cx('sidebar')} /> : <></>}

                <Content
                    style={{
                        marginLeft: !auth.isAuthenticated ? '0' : '',
                        width: !auth.isAuthenticated ? '100%' : '',
                        maxWidth: !auth.isAuthenticated ? '100%' : '',
                    }}
                    className={cx('content')}
                >
                    {children}
                </Content>
            </Layout>
            <div className={cx('footer')}>
                <CustomFooter />
            </div>
        </Layout>
    );
}

export default DefaultLayout;
