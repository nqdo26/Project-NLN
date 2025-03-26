import { List } from 'antd';
import CardDocument from '~/components/CardDocument';
import SearchBar from '~/components/SearchBar';
import styles from './Uploaded.module.scss';
import classNames from 'classnames/bind';
import { getUserDocumentApi } from '~/utils/api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function Uploaded() {
    const { userId } = useParams();
    const [myDoc, setMyDoc] = useState();
    useEffect(() => {
        const fetchDoc = async () => {
            try {
                const response = await getUserDocumentApi(userId);
                console.log('check>>>', userId);
                console.log('check>>>', response);
                if (response) {
                    setMyDoc(response);
                }
            } catch (error) {
                console.error('error', error);
            }
        };
        fetchDoc();
    }, [userId]);
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
                        Bài Đăng Của Tôi
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
                                <CardDocument document={document} />
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

export default Uploaded;
