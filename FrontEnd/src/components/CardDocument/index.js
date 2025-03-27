
import React from 'react';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Card, Button, Typography, Badge, Flex, Modal, message } from 'antd';
import { LikeOutlined, SaveOutlined, CloseCircleOutlined } from '@ant-design/icons';
import styles from './CardDocument.module.scss';
import { deleteDocumentApi } from '~/utils/api';
const { Title } = Typography;
import { getColorByFileType } from '~/utils/typeToColorCode';
import { addRecentlyReadApi } from '~/utils/api';
import { AuthContext } from '../Context/auth.context';

const { Title } = Typography;

const cx = classNames.bind(styles);

function CardDocument({
    document = { title: 'Null', createAt: 'Null', type: 'type', statistics: { likes: 0, dislikes: 0 } },
    action = 'Save',
    isSaved = false,
    onSave = () => {},
    onUnSave = () => {},
    myDoc = false,
    onDelete = () => {},
}) {

    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    const truncateText = (text, maxLength) => {
        return text?.length > maxLength ? text?.slice(0, maxLength - 3) + '...' : text;
    };

    const handleCardClick = async () => {
        const userId = auth?.user?.id; 
        const documentId = document?._id;
    
        if (userId && documentId) {
            try {
                await addRecentlyReadApi(userId, documentId);
            } catch (error) {
                console.error('Lỗi khi thêm vào danh sách đã đọc:', error);
                notification.error({
                    message: 'Lỗi',
                    description: 'Không thể cập nhật danh sách đọc. Vui lòng thử lại!',
                });
            }
        }
    
        navigate(`/doc/${documentId}`);
    };
    

    const handleDelete = (e) => {
        e.stopPropagation();
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: 'Bạn có chắc muốn xóa tài liệu này không?',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await deleteDocumentApi(document._id);
                    onDelete(document._id);
                    message.success('Xóa tài liệu thành công');
                } catch (error) {
                    message.error('Lỗi khi xóa tài liệu');
                }
            },
        });
    };

    return (
        <Card
            className={cx('card')}
            hoverable
            onClick={handleCardClick}
            style={{
                minWidth: '180px',
                maxWidth: '180px',
                borderRadius: '15px',
                position: 'relative',
            }
            style={{ minWidth: '180px', maxWidth: '180px', borderRadius: '15px' }}
            cover={
                <div style={{ padding: '12px 12px 0 12px' }}>
                    <img
                        alt="document"
                        src={require('../../assets/imgs/test-image.jpg')}
                        style={{
                            width: '100%',
                            height: 130,
                            borderRadius: 10,
                            objectFit: 'cover',
                        }}
                    />
                </div>
            }
        >
            {myDoc && (
                <Button
                    type="text"
                    shape="circle"
                    icon={<CloseCircleOutlined style={{ fontSize: 18, color: 'black' }} />}
                    onClick={handleDelete}
                    className={cx('delete-btn')}
                    style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        background: 'rgba(255, 255, 255, 0.7)',
                        border: 'none',
                        opacity: 0.5,
                        transition: 'opacity 0.2s ease-in-out',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.5)}
                />
            )}

            <div style={{ margin: '-15px -5px 0px -5px', height: '80px' }}>
                <Title level={5}>{truncateText(document?.title, 45)}</Title>
            </div>
            <Flex justify="space-between" align="center" style={{ margin: '0 -5px 0 -5px' }}>

                <Card.Meta description={new Date(document.createAt).toLocaleDateString('vi-VN')} />
                <Badge 
                    count={document.type} 
                    style={{ backgroundColor: getColorByFileType(document.type) }} 
                />
            </Flex>

            <div style={{ margin: '15px -10px -12px -10px' }}>
                <Button
                    disabled={action !== 'Save'}
                    style={{
                        borderRadius: '15px',
                        backgroundColor:
                            action === 'Save' && !isSaved
                                ? '#fff'
                                : action === 'Save' && isSaved
                                ? '#569CFF'
                                : '#28D764',
                        color: action === 'Save' && !isSaved ? 'black' : '#fff',
                        cursor: 'pointer',
                    }}
                    className={cx('button', { 'save-button': action === 'Save' })}
                    icon={action === 'Save' ? <SaveOutlined /> : <LikeOutlined />}
                    block
                    onClick={(e) => {
                        e.stopPropagation();
                        isSaved ? onUnSave(document._id) : onSave(document._id);
                    }}
                >
                    {action === 'Save'
                        ? isSaved
                            ? 'Saved'
                            : 'Save'
                        : Math.round(

                            

                              (document?.statistics.likes /
                                  (document?.statistics.likes + document?.statistics.dislikes !== 0
                                      ? document?.statistics.likes + document?.statistics.dislikes
                                      : 1)) *

                                  100,
                          ) +
                          '% (' +
                          document?.statistics.likes +
                          ')'}
                </Button>
            </div>
        </Card>
    );
}

export default CardDocument;
