import { List, Skeleton, Avatar, Flex, Button, Badge, Popconfirm } from 'antd';
import { useNavigate } from 'react-router-dom';

import CardDocument from '../CardDocument';

function Notification({ item }) {
    const navigate = useNavigate();

    const handleOnClick = (path) => {
        navigate('/doc/' + path);
    };
    return (
        <List.Item>
            <Flex
                vertical
                justify="space-between"
                style={{ width: '100%', height: '100%', padding: '50px 0px 50px 0px' }}
            >
                <List.Item.Meta
                    avatar={<Avatar />}
                    title={
                        <Button style={{ fontWeight: 'bold', marginLeft: '-20px' }} type="text">
                            {item?.reporterId?.fullName} đã báo cáo về tài liệu
                        </Button>
                    }
                    description={item.reportAt}
                />
                <Flex style={{ padding: '10px' }}>{item?.description}</Flex>
                <Flex gap={10} style={{ padding: '10px' }}>
                    <Button onClick={() => handleOnClick(item.documentId._id)}>Truy cập tài liệu</Button>

                    <Popconfirm
                        placement="topLeft"
                        title={'Xóa tài liệu'}
                        description={'Bạn có chắc chắn muốn xóa tài liệu này không?'}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Button danger>Xóa tài liệu</Button>
                    </Popconfirm>
                    <Button>Đánh dấu đã đọc</Button>
                    <Button>Xóa thông báo</Button>
                </Flex>
            </Flex>
            <Badge.Ribbon color={item.status ? 'blue' : 'red'} text={item.status ? 'Đã đọc' : 'Chưa đọc'}>
                <CardDocument action="Like" document={item.documentId} />
            </Badge.Ribbon>
        </List.Item>
    );
}

export default Notification;
