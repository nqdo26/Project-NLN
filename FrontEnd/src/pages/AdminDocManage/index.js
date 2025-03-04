import { List, Card, Divider, Tag, Avatar } from 'antd';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import styles from './AdminDocManage.module.scss';
import CardDocumentLarge from '~/components/CardDocumentLarge';

function AdminDocManage() {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();
    const { Meta } = Card;

    const data = [
        {
            title: 'Title 1 teen tai lieu hehe 123 ',
            type: 'pdf',
            color: 'red',
            path: 'doc/hehe',
        },
        {
            title: 'Title 2 teen tai lieu hehe 123 ',
            type: 'docx',
            color: 'blue',
            path: 'doc/hehe',
        },
        {
            title: 'Title 3 teen tai lieu hehe 123 ',
            type: 'doc',
            color: 'blue',
            path: 'doc/hehe',
        },
        {
            title: 'Title 4 teen tai lieu hehe 123 ',
            type: 'xlsx',
            color: 'green',
            path: 'doc/hehe',
        },
        {
            title: 'Title 5 teen tai lieu hehe 123 ',
            type: 'xls',
            color: 'green',
            path: 'doc/hehe',
        },
        {
            title: 'Title 6 teen tai lieu hehe 123 ',
            type: 'pptx',
            color: 'orange',
            path: 'doc/hehe',
        },
        {
            title: 'Title 7 teen tai lieu hehe 123 ',
            type: 'ppt',
            color: 'orange',
            path: 'doc/hehe',
        },
    ];

    const handleOnClick = (path) => {
        navigate('/' + path);
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
                dataSource={data}
                renderItem={(item) => (
                    <List.Item>
                        <CardDocumentLarge />
                    </List.Item>
                )}
            />
        </div>
    );
}

export default AdminDocManage;
