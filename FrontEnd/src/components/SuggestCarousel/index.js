import classNames from 'classnames/bind';
import { Carousel, notification } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import CustomArrow from '../CustomArrow';
import styles from './SuggestCarousel.module.scss';
import CardDocument from '../CardDocument';
import { getDocumentsApi } from '~/utils/api';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function SuggestCarousel({ title }) {
    const [documents, setDocuments] = useState([]);

    useEffect (() => {
        const fetchDocuments = async () => {
            try {
                const res = await getDocumentsApi();
                if (res) {
                    setDocuments(res);
                } else {
                    notification.error({ message: 'Lỗi', description: 'Dữ liệu không hợp lệ' });
                }
            } catch (error) {
                console.error('Fetch error:', error);
                notification.error({ message: 'Lỗi', description: 'Không thể lấy danh sách tài liệu' });
            }
        };
    
        fetchDocuments();
    }, []);

    return (
        <div 
        style={{
            minWidth: '1500px',
            overflow: 'hidden',
        }}
        className={styles.carouselContainer}>
            <h2 className={styles.title}>{title}</h2>

            <div className={cx('carousel')}>
                <Carousel
                    slidesToShow={8}
                    slidesToScroll={4}
                    arrows
                    prevArrow={<CustomArrow icon={<LeftOutlined style={{ marginLeft: '-4px' }} />} />}
                    nextArrow={<CustomArrow icon={<RightOutlined style={{ marginRight: '7px' }} />} />}
                >
                    {documents.map((doc) => (
                        <div key={doc._id} className={cx('carouselItem')}>
                            <CardDocument document={doc} action="Like" />
                        </div>
                ))}

                </Carousel>
            </div>
        </div>
    );
}

export default SuggestCarousel;
