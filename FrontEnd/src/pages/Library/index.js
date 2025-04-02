import classNames from 'classnames/bind';
import SearchBar from '~/components/SearchBar';
import styles from './Library.module.scss';
import { List, notification } from 'antd';
import CardDocument from '~/components/CardDocument';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '~/components/Context/auth.context';
import { getSavedDocumentApi, saveApi, searchApi, searchLibraryByTitleApi } from '~/utils/api';

const cx = classNames.bind(styles);

function Library() {
    const { auth } = useContext(AuthContext);
    const [myDoc, setMyDoc] = useState([]);
    const [searchedDocuments, setSearchedDocuments] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        if (auth?.user?.id) {
            const fetchDoc = async () => {
                try {
                    const response = await getSavedDocumentApi(auth?.user?.id);
                    if (response) {
                        setMyDoc(response);
                    }
                } catch (error) {
                    console.error('Error fetching documents:', error);
                }
            };
            fetchDoc();
        }
    }, [auth]);

    const handleUnSave = async (id) => {
        try {
            const res = await saveApi(id, auth?.user?.email);
            if (res.EC === -1) {
                notification.success({
                    description: res.EM,
                });

                setMyDoc(myDoc.filter((doc) => doc._id !== id));
            } else {
                notification.error({
                    message: 'Error',
                    description: res.EM || 'Failed to unsave document.',
                });
            }
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'An error occurred while unsaving the document.',
            });
        }
    };

    const handleSearch = async (title) => {
        try {
            const res = await searchLibraryByTitleApi(auth.user?.id, title);
            if (res?.EC === 0) {
                setSearchedDocuments(res.data.documents);
            } else {
                setSearchedDocuments([]);
            }
            setIsSearching(true);
        } catch (error) {
            console.error('Error searching documents:', error);
            notification.error({ message: 'Lỗi', description: 'Lỗi tìm kiếm dữ liệu hehe' });
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <SearchBar onSearch={handleSearch} searchPath={'/library'} />

                {/* Kết quả tìm kiếm */}
                {isSearching && (
                    <div style={{ backgroundColor: '#ffff', borderRadius: '20px', padding: 20, marginTop: 20 }}>
                        <h2 style={{ marginBottom: 20, color: '#2f3e4e' }} className={cx('title')}>
                            Kết Quả Tìm Kiếm
                        </h2>
                        {searchedDocuments.length > 0 ? (
                            <List
                                grid={{
                                    gutter: 16,
                                    xs: 1,
                                    sm: 2,
                                    md: 3,
                                    lg: 4,
                                    xl: 5,
                                    xxl: 6,
                                }}
                                style={{ backgroundColor: '#f0ebfe', borderRadius: '20px', padding: 20 }}
                                dataSource={searchedDocuments}
                                renderItem={(document) => (
                                    <List.Item>
                                        <CardDocument
                                            document={document}
                                            action="Save"
                                            isSaved={true}
                                            onSave={() => {}}
                                        />
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
                        Các Tài Liệu Đã Lưu
                    </h2>
                    <List
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 2,
                            md: 3,
                            lg: 4,
                            xl: 5,
                            xxl: 6,
                        }}
                        style={{ backgroundColor: '#ecfcda', borderRadius: '20px', padding: 20 }}
                        dataSource={myDoc}
                        renderItem={(document) => (
                            <List.Item>
                                <CardDocument
                                    document={document}
                                    action="Save"
                                    isSaved={true}
                                    onUnSave={handleUnSave}
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

export default Library;
