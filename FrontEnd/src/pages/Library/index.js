import classNames from 'classnames/bind';

import SearchBar from '~/components/SearchBar';
import styles from './Library.module.scss';
import { List, notification } from 'antd';
import CardDocument from '~/components/CardDocument';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '~/components/Context/auth.context';
import { getSavedDocumentApi, getUserDocumentApi, saveApi } from '~/utils/api';
import { HeartOutlined } from '@ant-design/icons';
const cx = classNames.bind(styles);

function Library() {
    const { auth, setAuth } = useContext(AuthContext);
    const [myDoc, setMyDoc] = useState();
    useEffect(() => {
        if (auth?.user?.id) {
            const fetchDoc = async () => {
                try {
                    const response = await getSavedDocumentApi(auth?.user?.id);
                    console.log('check>>>', response);
                    if (response) {
                        setMyDoc(response);
                    }
                } catch (error) {
                    console.error('error', error);
                }
            };
            fetchDoc();
        }
    }, [auth]);

    const handleUnSave = async (id) => {
        try {
            const res = await saveApi(id, auth?.user?.email);
            console.log('Check res', res);

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

    console.log('check>>>', auth?.user?.id);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <SearchBar />
                <div style={{ backgroundColor: '#ffff', borderRadius: '20px', padding: 20 }}>
                    <h2
                        style={{
                            marginBottom: 20,
                            color: '#2f3e4e',
                        }}
                        className={cx('title')}
                    >
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
