import classNames from 'classnames/bind';
import { Carousel, notification } from 'antd';
import styles from './SubjectCarousel.module.scss';
import CardSubject from '../CardSubject';
import { useEffect, useState } from 'react';
import { getCategoriesApi } from '~/utils/api';

const cx = classNames.bind(styles);

function SubjectCarousel() {
    const [dataSource, setDataSources] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getCategoriesApi();
                if (res && Array.isArray(res.data)) {
                    setDataSources(res.data);
                } else {
                    notification.error({ message: 'Error', description: 'Invalid data format' });
                }
            } catch (error) {
                notification.error({ message: 'Error', description: 'Failed to fetch categories' });
            }
        }
        fetchCategories();
    }, []);

    return (
        <div style={{
            overflow: 'hidden',
        }} className={styles.carouselContainer}>
            <div className={cx('carousel')}>
                {dataSource.length === 0 ? (
                    <p>Chưa có danh mục</p>
                ) : (
                    <Carousel 
                        autoplay
                        autoplaySpeed={3000}
                        speed={1300}
                        slidesToShow={Math.min(dataSource.length, 4)}
                        slidesToScroll={Math.min(dataSource.length, 4)}
                        dots={false}
                        arrows={false}
                        responsive={[
                            { breakpoint: 1900, settings: { slidesToShow: 4, slidesToScroll: 4 } },
                            { breakpoint: 1800, settings: { slidesToShow: 3, slidesToScroll: 3 } },
                            { breakpoint: 1300, settings: { slidesToShow: 2, slidesToScroll: 2 } },
                            { breakpoint: 1000, settings: { slidesToShow: 1, slidesToScroll: 1 } },
                        ]}
                    >
                        {dataSource.map((item, index) => (
                            <div key={item._id || index} className={cx('carouselItem')}>
                                <CardSubject 
                                    title={item.title}
                                    categoryId={item._id}
                                    total={item.documentCount}
                                />
                            </div>
                        ))}
                    </Carousel>
                )}
            </div>
        </div>
    );
}

export default SubjectCarousel;