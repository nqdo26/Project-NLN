import React, { useRef, useState, useEffect, useContext } from 'react';
import { notification } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import CardDocument from '../CardDocument';
import styles from './RecentlyReadCarousel.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import { getRecentlyReadApi } from '~/utils/api';
import { AuthContext } from '../Context/auth.context';

const cx = classNames.bind(styles);

function RecentlyReadCarousel() {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const containerRef = useRef(null);
    const [slidesPerView, setSlidesPerView] = useState(8);
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            if (!entries[0]) return;
            const width = entries[0].contentRect.width;
            if (width >= 1600) {
                setSlidesPerView(9);
            } else if (width >= 1400) {
                setSlidesPerView(8);
            } else if (width >= 992) {
                setSlidesPerView(6);
            } else if (width >= 768) {
                setSlidesPerView(3);
            } else {
                setSlidesPerView(2);
            }
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const { auth } = useContext(AuthContext);

    useEffect(() => {
        const fetchRecentlyReadDocuments = async () => {
            if (!auth?.user?.id) return;
            try {
                const res = await getRecentlyReadApi(auth.user.id);
                if (res.data && res.EC === 0) {
                    setDocuments(res.data);
                } else {
                    notification.error({ message: 'Lỗi', description: res.data.EM || 'Không thể lấy danh sách tài liệu đã đọc' });
                }
            } catch (error) {
                console.error('Fetch error:', error);
                notification.error({ message: 'Lỗi', description: 'Không thể lấy danh sách tài liệu đã đọc' });
            }
        };
        fetchRecentlyReadDocuments();
    }, [auth?.user?.id]);

    return (
        <div className={cx('wrapper')}>
            {documents.length > 0 && <h2 className={cx('title')}>Tài liệu bạn đã đọc gần đây</h2>}
            <div className={cx('carousel-container')} ref={containerRef}>
                {documents.length > slidesPerView && (
                    <button ref={prevRef} className={cx('arrow', 'prev-arrow')}>
                        <LeftOutlined />
                    </button>
                )}
                <Swiper
                    style={{ padding: '2px 0px' }}
                    modules={[Navigation]}
                    spaceBetween={15}
                    slidesPerView={slidesPerView}
                    navigation={documents.length > slidesPerView ? {
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    } : false}
                >
                    {documents.map(({ document }) => (
                        <SwiperSlide key={document._id}>
                            <CardDocument document={document} action="Like" />
                        </SwiperSlide>
                    ))}
                </Swiper>
                {documents.length > slidesPerView && (
                    <button ref={nextRef} className={cx('arrow', 'next-arrow')}>
                        <RightOutlined />
                    </button>
                )}
            </div>
        </div>
    );
    
}

export default RecentlyReadCarousel;
