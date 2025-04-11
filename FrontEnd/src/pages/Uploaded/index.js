import { List, notification } from 'antd';
import CardDocument from '~/components/CardDocument';
import SearchBar from '~/components/SearchBar';
import styles from './Uploaded.module.scss';
import classNames from 'classnames/bind';
import { getUserDocumentApi, searchUploadedByTitleApi } from '~/utils/api';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '~/components/Context/auth.context';

const cx = classNames.bind(styles);

function Uploaded() {
    const { auth } = useContext(AuthContext);
    const userId = auth?.user?.id;
    const [myDoc, setMyDoc] = useState([]);
    const [searchedDocuments, setSearchedDocuments] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const fetchDoc = async () => {
        try {
            if (!userId) return;
            const response = await getUserDocumentApi(userId);
            if (response) {
                setMyDoc(response);
            }
        } catch (error) {
            console.error('Lỗi khi lấy tài liệu:', error);
        }
    };

    useEffect(() => {
        fetchDoc();
    }, [userId]);

    const handleDelete = (docId) => {
        setMyDoc((prevDocs) => prevDocs.filter((doc) => doc._id !== docId));
        fetchDoc();
    };

    const handleSearch = async (title) => {
        try {
            const res = await searchUploadedByTitleApi(userId, title);
            if (res?.EC === 0) {
                setSearchedDocuments(res.data.document);
            } else {
                setSearchedDocuments([]);
            }
            setIsSearching(true);
        } catch (error) {
            console.error('Lỗi tìm kiếm:', error);
            notification.error({ message: 'Lỗi', description: 'Lỗi tìm kiếm dữ liệu' });
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <SearchBar onSearch={handleSearch} searchPath={'/uploaded'} />

                {isSearching && (
                    <div style={{ backgroundColor: '#ffff', borderRadius: '20px', padding: 20, marginTop: 20 }}>
                        <h2 style={{ marginBottom: 20, color: '#2f3e4e' }} className={cx('title')}>
                            Kết Quả Tìm Kiếm
                        </h2>
                        {searchedDocuments.length > 0 ? (
                            <List
                                grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }}
                                style={{ backgroundColor: '#f0ebfe', borderRadius: '20px', padding: 20 }}
                                dataSource={searchedDocuments}
                                renderItem={(document) => (
                                    <List.Item>
                                        <CardDocument document={document} onDelete={handleDelete} myDoc={true} />
                                    </List.Item>
                                )}
                            />
                        ) : (
                            <p style={{ textAlign: 'center', color: '#999' }}>Không tìm thấy tài liệu nào.</p>
                        )}
                    </div>
                )}

                <div style={{ backgroundColor: '#ffff', borderRadius: '20px', padding: 20, marginTop: 20 }}>
                    <h2 style={{ marginBottom: 20, color: '#2f3e4e' }} className={cx('title')}>
                        Bài Đăng Của Tôi
                    </h2>
                    <List
                        grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }}
                        style={{ backgroundColor: '#ecfcda', borderRadius: '20px', padding: 20 }}
                        dataSource={myDoc}
                        renderItem={(document) => (
                            <List.Item>
                                <CardDocument document={document} onDelete={handleDelete} myDoc={true} />
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

export default Uploaded;
