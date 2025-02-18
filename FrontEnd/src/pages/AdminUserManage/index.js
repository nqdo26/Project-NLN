import { List, Card, Divider, Flex, Button, Avatar, Tooltip, Popconfirm, Badge } from 'antd';
import classNames from 'classnames/bind';
import { DeleteOutlined } from '@ant-design/icons';

import styles from './AdminUserManage.module.scss';

function AdminUserManage() {
    const cx = classNames.bind(styles);
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
                        <Card
                            hoverable
                            actions={[
                                <Tooltip title={'Xóa người dùng'}>
                                    <Popconfirm
                                        placement="bottom"
                                        title="Xóa người dùng"
                                        description="Bạn có chắc xóa tài khoản người dùng này không?"
                                        okText="Xóa"
                                        cancelText="Hủy"
                                    >
                                        <Button style={{ backgroundColor: 'red', color: 'white' }}>
                                            <DeleteOutlined />
                                        </Button>
                                    </Popconfirm>
                                </Tooltip>,
                            ]}
                        >
                            <Meta
                                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                                title="KongTrua"
                                description="thung260803@gmail.com"
                            />
                            <Divider></Divider>
                            <Flex gap={2} wrap justify="space-between" align="center">
                                <p>Tài liệu đã đăng</p>
                                <Badge count={11} showZero color="#faad14" />
                            </Flex>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
}

export default AdminUserManage;
