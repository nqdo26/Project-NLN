import classNames from 'classnames/bind';
import Header from '~/components/Layouts/components/Header';
import styles from './AdminLayout.module.scss';
import Sidebar from './Sidebar';
import { Layout, message } from 'antd';
import CustomFooter from '../components/Footer/CustomFooter';
import { useContext, useEffect } from 'react';
import { AuthContext } from '~/components/Context/auth.context';
import { useNavigate } from 'react-router-dom';

function AdminLayout({ children }) {
    const { Content } = Layout;
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const cx = classNames.bind(styles);

    useEffect(() => {
        // nếu chưa set auth thì không kiểm tra
        if (auth?.user?.email === '') return;
        // nếu đã set auth thì kiểm tra xem có phải là admin không
        if (!auth.isAuthenticated || !auth.user.isAdmin) {
            navigate('/');
            message.error('Bạn không có quyền truy cập vào trang này');
        }
    }, [auth, navigate]);
    return (
        <Layout>
            <Header className={cx('header')} />
            <Layout hasSider>
                <Sidebar className={cx('sidebar')} />
                <Content className={cx('content')}>
                    {children}
                    <CustomFooter />
                </Content>
            </Layout>
        </Layout>
    );
}

export default AdminLayout;
