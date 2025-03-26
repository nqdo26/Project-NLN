import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { List, notification } from 'antd';
import styles from './Home.module.scss';
import SearchBar from '~/components/SearchBar';
import SubjectCarousel from '~/components/SubjectCarousel';
import PostEncouragement from '~/components/PostEncouragement';
import CardDocument from '~/components/CardDocument';
import { getDocumentsApi } from '~/utils/api';
import DocumentCarousel from '~/components/DocumentCarousel';

const cx = classNames.bind(styles);

function Home() {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const res = await getDocumentsApi();
                if (res) {
                    setDocuments(res);
                } else {
                    notification.error({ message: 'Lỗi', description: 'Dữ liệu không hợp lệ' });
                }
            } catch (error) {
                console.error('Fetch error:', error);
                notification.error({ message: 'Lỗi', description: 'Không thể lấy danh sách tài liệu' });
            }
        };
    
        fetchDocuments();
    }, []);
    

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')} >
            <SearchBar 
                 searchPath={'/search'}
            />
                <SubjectCarousel />
                <PostEncouragement />
                <DocumentCarousel />
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 3,
                        lg: 4,
                        xl: 5,
                        xxl: 8,
                    }}
                    dataSource={documents}
                    renderItem={(document) => (
                        <List.Item>
                            <CardDocument document={document} />
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
}

export default Home;
