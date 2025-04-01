import classNames from 'classnames/bind';

import styles from './Admin.module.scss';
import { Card, Flex } from 'antd';
import { useEffect, useState } from 'react';
import { getSystemStatisticsApi } from '~/utils/api';

function Admin() {
    const cx = classNames.bind(styles);
    const [statistics, setStatistics] = useState({});

    const fetch = async () => {
        const res = await getSystemStatisticsApi();
        console.log(res);
        if (res.EC === 0) {
            setStatistics(res.data);
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <Flex vertical gap={16} justify="center" align="center" style={{ width: '100%', height: '100%' }}>
                <h1>Xin chào quản trị viên!</h1>
                Truy cập các danh mục để quản lý hệ thống...
                {statistics && (
                    <Flex gap={16} justify="center" align="center" style={{ width: '100%' }}>
                        <Card>
                            Tổng số người dùng
                            <Flex align="center" justify="center">
                                <h1>{statistics?.totalUsers}</h1>
                            </Flex>
                        </Card>
                        <Card>
                            Tổng số tài liệu
                            <Flex align="center" justify="center">
                                <h1>{statistics?.totalDocuments}</h1>
                            </Flex>
                        </Card>
                        <Card>
                            Tổng số báo cáo
                            <Flex align="center" justify="center">
                                <h1>{statistics?.totalReports}</h1>
                            </Flex>
                        </Card>
                        <Card>
                            Tổng số quản trị viên
                            <Flex align="center" justify="center">
                                <h1>{statistics?.totalAdmins}</h1>
                            </Flex>
                        </Card>
                    </Flex>
                )}
            </Flex>
        </div>
    );
}

export default Admin;
