import { Button, List } from 'antd';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';

import styles from './AdminNotification.module.scss';
import Notification from '~/components/Notification';
import { getReportsApi } from '~/utils/api';

function AdminNotification() {
    const cx = classNames.bind(styles);

    const [initLoading, setInitLoading] = useState(true);
    const [list, setList] = useState([]);
    async function getReports() {
        const res = await getReportsApi();
        setList(res.data);
        setInitLoading(false);
        console.log(res);
    }
    useEffect(() => {
        getReports();
    }, [initLoading]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content-wrapper')}>
                <List
                    className="demo-loadmore-list"
                    loading={initLoading}
                    itemLayout="horizontal"
                    dataSource={list}
                    renderItem={(item) => <Notification item={item} setInitLoading={setInitLoading} />}
                />
            </div>
        </div>
    );
}

export default AdminNotification;
