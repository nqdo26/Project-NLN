import React, { useRef, useState, useEffect } from 'react';
import { notification } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import CardDocument from '../CardDocument';
import styles from './DocumentCarousel.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import { getDocumentsApi } from '~/utils/api';

const cx = classNames.bind(styles);

function DocumentCarousel() {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const containerRef = useRef(null);
    const [slidesPerView, setSlidesPerView] = useState(8);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

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
                setSlidesPerView(3);
            }
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

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
        <div className={cx('wrapper')}>
                <h2 className={cx('title')}>Suggested documents for you</h2>
                <div className={cx('carousel-container')} ref={containerRef}>
                    <button
                        ref={prevRef}
                        className={cx('arrow', 'prev-arrow', { disabled: isBeginning })}
                        disabled={isBeginning}
                    >
                        <LeftOutlined />
                    </button>
        
                    <Swiper
                        style={{ padding: '2px 0px' }}
                        modules={[Navigation]}
                        spaceBetween={15}
                        slidesPerView={slidesPerView}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        onSlideChange={(swiper) => {
                            setIsBeginning(swiper.isBeginning);
                            setIsEnd(swiper.isEnd);
                        }}
                    >
                        {documents.map((doc) => (
                            <SwiperSlide key={doc._id}>
                                <CardDocument document={doc} action="Like"/>
                            </SwiperSlide>
                        ))}
                    </Swiper>
        
                    <button
                        ref={nextRef}
                        className={cx('arrow', 'next-arrow', { disabled: isEnd })}
                        disabled={isEnd}
                    >
                        <RightOutlined />
                    </button>
                </div>
        </div>
    );
}

export default DocumentCarousel;
