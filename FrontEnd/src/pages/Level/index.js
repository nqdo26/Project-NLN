import classNames from 'classnames/bind';
import styles from './Level.module.scss';
import { List } from 'antd';
import CardDocument from '~/components/CardDocument';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDocumentsByCategoryApi, getDocumentsByLevelApi } from '~/utils/api';
const cx = classNames.bind(styles);

function Level() {
    const [data, setData] = useState([]);
    const [title, setTitle] = useState('');
    const { levelId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDocumentsByLevelApi(levelId);
                setData(response.result);
                setTitle(response.data);
            } catch (error) {
                console.error('Failed to fetch category: ', error);
            }
        };

        fetchData();
    }, [levelId]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('list-Category-documents')}>
                    <h2
                        style={{
                            marginTop: '16px',
                            fontSize: '30px',
                        }}
                        className={cx('title')}
                    >
                        Danh mục: {title}
                    </h2>
                    <p
                        style={{
                            marginTop: '16px',
                            fontSize: '18px',
                            fontWeight: '500',
                        }}
                        className={cx('title')}
                    >
                        Số lượng tài liệu: {data.length}
                    </p>
                    <List
                        grid={{
                            gutter: 50,
                            xs: 1,
                            sm: 1,
                            md: 1,
                            lg: 2,
                            xl: 4,
                            xxl: 7,
                        }}
                        dataSource={data}
                        renderItem={(doc) => (
                            <List.Item>
                                <CardDocument document={doc} action="Like" />
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

export default Level;
