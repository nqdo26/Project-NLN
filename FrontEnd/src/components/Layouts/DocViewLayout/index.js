import classNames from 'classnames/bind';
import Header from '~/components/Layouts/components/Header';
import styles from './DocViewLayout.module.scss';
import Sidebar from './Sidebar';
import { Layout } from 'antd';

function DocViewLayout({ children }) {
    const { Footer, Content } = Layout;

    const cx = classNames.bind(styles);
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header className={cx('header')} />
            <Layout hasSider>
                <Sidebar className={cx('sidebar')} />
                <Content className={cx('content')}>{children}</Content>
            </Layout>
        </Layout>
    );
}

export default DocViewLayout;
