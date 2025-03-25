import React, { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import CardDocument from '../CardDocument';
import styles from './TestCarousel.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';

const cx = classNames.bind(styles);

const documents = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    title: `Document ${i + 1}`,
    createAt: new Date().toISOString(),
    type: 'PDF',
    statistics: { likes: Math.floor(Math.random() * 100), dislikes: Math.floor(Math.random() * 50) },
}));

function TestCarousel() {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const swiperRef = useRef(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.navigation.update();
        }
    }, []);

    return (
        <div className={cx('carousel-container')}>
            <button
                ref={prevRef}
                className={cx('arrow', 'prev-arrow', { disabled: isBeginning })}
                disabled={isBeginning}
            >
                <LeftOutlined />
            </button>

            <Swiper
                modules={[Navigation]}
                spaceBetween={15}
                slidesPerView={8} // Mặc định hiển thị 8 card
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                onSlideChange={(swiper) => {
                    setIsBeginning(swiper.isBeginning);
                    setIsEnd(swiper.isEnd);
                }}
                breakpoints={{
                    1550: { slidesPerView: 8, spaceBetween: 15 }, 
                    1400: { slidesPerView: 6, spaceBetween: 15 },
                    992: { slidesPerView: 5, spaceBetween: 15 },
                    768: { slidesPerView: 3, spaceBetween: 15 },
                    480: { slidesPerView: 2, spaceBetween: 10 },
                    0: { slidesPerView: 1, spaceBetween: 10 },
                }}
            >
                {documents.map((doc) => (
                    <SwiperSlide key={doc.id}>
                        <CardDocument document={doc} action="Save" isSaved={false} />
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
    );
}

export default TestCarousel;
