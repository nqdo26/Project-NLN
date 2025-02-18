import classNames from 'classnames/bind';
import { Carousel } from 'antd';
import styles from './SubjectCarousel.module.scss';
import CardSubject from '../CardSubject';

const cx = classNames.bind(styles);

function SubjectCarousel() {
    const subject = Array.from({ length: 8 }, (_, index) => ({
        id: index + 1,
    }));

    return (
        <div className={styles.carouselContainer}>
            <div className={cx('carousel')}>
                <Carousel
                    autoplay
                    autoplaySpeed={3000}
                    speed={1300} 
                    slidesToShow={4}
                    slidesToScroll={4}
                    arrows
                   
                >
                    {subject.map((doc) => (
                        <div key={doc.id} className={cx('carouselItem')}>
                            <CardSubject/>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
}

export default SubjectCarousel;