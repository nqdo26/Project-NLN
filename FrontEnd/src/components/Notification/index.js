import { List, Skeleton, Avatar, Flex, Button, Badge, Popconfirm, message } from 'antd';
import { useNavigate } from 'react-router-dom';

import CardDocument from '../CardDocument';
import { deleteDocumentApi, deleteReportApi, updateReportApi } from '~/utils/api';

function Notification({ item, setInitLoading }) {
    const navigate = useNavigate();

    const handleOnClick = (path) => {
        navigate('/doc/' + path);
    };

    const handleUpdateStatus = async (id, status) => {
        const res = await updateReportApi(id, !status);
        setInitLoading(true);
        console.log(res);
        if (res.EC === 1) {
            message.success('Cập nhật trạng thái thành công');
        } else {
            message.error('Cập nhật trạng thái thất bại');
        }
    };

    const handleDeleteReport = async (id) => {
        const res = await deleteReportApi(id);
        setInitLoading(true);
        console.log(res);
        if (res.EC === 0) {
            message.success('Xóa báo cáo thành công');
        } else {
            message.error('Xóa báo cáo thất bại');
        }
    };

    const handleDeleteDocument = async (id) => {
        const res = await deleteDocumentApi(id);
        setInitLoading(true);
        console.log(res);
        if (res.EC === 0) {
            message.success('Xóa tài liệu thành công');
        } else {
            message.error('Xóa tài liệu thất bại');
        }
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
                    description={item?.reportAt}
                />
                <Flex style={{ padding: '10px' }}>{item?.description}</Flex>
                <Flex gap={10} style={{ padding: '10px' }}>
                    <Button onClick={() => handleOnClick(item?.documentId?._id)}>Truy cập tài liệu</Button>

                    <Popconfirm
                        placement="topLeft"
                        title={'Xóa tài liệu'}
                        description={'Bạn có chắc chắn muốn xóa tài liệu này không?'}
                        okText="Xóa"
                        cancelText="Hủy"
                        onConfirm={() => handleDeleteDocument(item?.documentId._id)}
                    >
                        <Button danger>Xóa tài liệu</Button>
                    </Popconfirm>
                    <Button onClick={() => handleUpdateStatus(item?._id, item?.status)}>
                        {item?.status ? 'Đánh dấu chưa đọc' : 'Đánh dấu đã đọc'}
                    </Button>
                    <Popconfirm
                        placement="topLeft"
                        title={'Xóa tài liệu'}
                        description={'Bạn có chắc chắn muốn xóa tài liệu này không?'}
                        okText="Xóa"
                        cancelText="Hủy"
                        onConfirm={() => handleDeleteReport(item?._id)}
                    >
                        <Button>Xóa thông báo</Button>
                    </Popconfirm>
                </Flex>
            </Flex>
            <Badge.Ribbon color={item?.status ? 'blue' : 'red'} text={item?.status ? 'Đã đọc' : 'Chưa đọc'}>
                <CardDocument action="Like" document={item?.documentId} />
            </Badge.Ribbon>
        </List.Item>
    );
}

export default Notification;
