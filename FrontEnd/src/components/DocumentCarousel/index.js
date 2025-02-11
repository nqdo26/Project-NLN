import classNames from 'classnames/bind';
import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import CardDocument from '../CardDocument';
import CustomArrow from '../CustomArrow'; // Import CustomArrow
import styles from './DocumentCarousel.module.scss';

const cx = classNames.bind(styles);

function DocumentCarousel({ title }) {
    const documents = Array.from({ length: 8 }, (_, index) => ({
        id: index + 1,
    }));

    return (
        <div className={styles.carouselContainer}>
            <h2 className={styles.title}>{title}</h2>

            <div className={cx('carousel')}>
                <Carousel
                    slidesToShow={8}
                    slidesToScroll={2}
                    arrows
                    prevArrow={<CustomArrow icon={<LeftOutlined style={{ marginLeft: '-4px' }} />} />} 
                    nextArrow={<CustomArrow icon={<RightOutlined style={{ marginRight: '7px' }} />} />} 
                    responsive={[
                        { breakpoint: 1024, settings: { slidesToShow: 3 } },
                        { breakpoint: 768, settings: { slidesToShow: 2 } },
                        { breakpoint: 480, settings: { slidesToShow: 1 } },
                    ]}
                >
                    {documents.map((doc) => (
                        <div key={doc.id} className={cx('carouselItem')}>
                            <CardDocument />
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
}

export default DocumentCarousel;