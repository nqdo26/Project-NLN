import { List, Card, Divider, Tag, Avatar } from 'antd';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import styles from './AdminDocManage.module.scss';
import CardDocumentLarge from '~/components/CardDocumentLarge';
import { useEffect, useState } from 'react';
import { getDocumentsApi, getLevelsApi } from '~/utils/api';

function AdminDocManage() {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();
    const { Meta } = Card;
    const [docList, setDocList] = useState([]);
    const [levelList, setLevelList] = useState([]);

    const handleOnClick = (path) => {
        navigate('/' + path);
    };

    useEffect(() => {
        fetch();
    }, []);

    const fetch = async () => {
        const docs = await getDocumentsApi();
        const levels = await getLevelsApi();
        setDocList(docs);
        setLevelList(levels);
    };

    return (
        <div className={cx('wrapper')}>
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 1,
                    md: 2,
                    lg: 3,
                    xl: 3,
                    xxl: 4,
                }}
                dataSource={docList}
                renderItem={(item) => (
                    <List.Item>
                        <CardDocumentLarge item={item} />
                    </List.Item>
                )}
            />
        </div>
    );
}

export default AdminDocManage;
