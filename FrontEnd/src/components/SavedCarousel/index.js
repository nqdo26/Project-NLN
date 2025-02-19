import classNames from 'classnames/bind';
import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import CustomArrow from '../CustomArrow';
import styles from './SavedCarousel.module.scss';
import CardDocSaved from '../CardDocSaved';

const cx = classNames.bind(styles);

function SavedCarousel({ title }) {
    const documents = Array.from({ length: 8 }, (_, index) => ({
        id: index + 1,
    }));

    return (
        <div className={styles.carouselContainer}>
            <h2 className={styles.title}>{title}</h2>

            <div className={cx('carousel')}>
                <Carousel
                    slidesToShow={6}
                    slidesToScroll={1}
                    arrows
                    prevArrow={<CustomArrow icon={<LeftOutlined style={{ marginLeft: '-4px' }} />} />}
                    nextArrow={<CustomArrow icon={<RightOutlined style={{ marginRight: '7px' }} />} />}
                    responsive={[
                        { breakpoint: 1024, settings: { slidesToShow: 3, centerMode: true } },
                        { breakpoint: 768, settings: { slidesToShow: 2, centerMode: true } },
                        { breakpoint: 480, settings: { slidesToShow: 1, centerMode: true } },
                    ]}
                >
                    {documents.map((doc) => (
                        <div key={doc.id} className={cx('carouselItem')}>
                            <CardDocSaved />
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
}

export default SavedCarousel;
