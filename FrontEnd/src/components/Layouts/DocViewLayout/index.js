import classNames from 'classnames/bind';
import Header from '~/components/Layouts/components/Header';
import styles from './DocViewLayout.module.scss';
import Sidebar from './Sidebar';
import { Layout } from 'antd';
import { useEffect, useState } from 'react';
import { getDocumentApi } from '~/utils/api';
import { useParams } from 'react-router-dom';

function DocViewLayout({ children }) {
    const { Footer, Content } = Layout;
    const docId = useParams().docId;

    const [doc, setDoc] = useState();

    const fetchDoc = async () => {
        try {
            const response = await getDocumentApi(docId);
            setDoc(response);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchDoc();
    }, []);
    const cx = classNames.bind(styles);
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header className={cx('header')} />
            <Layout hasSider>
                <Sidebar className={cx('sidebar')} doc={doc} />
                <Content className={cx('content')}>{children}</Content>
            </Layout>
        </Layout>
    );
}

export default DocViewLayout;
