import classNames from 'classnames/bind';

import SearchBar from '~/components/SearchBar';
import styles from './Library.module.scss';
import { List, Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import CustomArrow from '~/components/CustomArrow';

import CardDocument from '~/components/CardDocument';
const cx = classNames.bind(styles);

function Library() {
    const documents = Array.from({ length: 8 }, (_, index) => ({
        id: index + 1,
    }));

    return (
        <div className={cx('wrapper')}>
            <SearchBar />
            <div className={cx('list-library-documents')}>
                <h2
                    style={{
                        marginTop: '16px',
                    }}
                    className={cx('title')}
                >
                    Danh sách tài liệu đã lưu
                </h2>
                <List
                    grid={{
                        gutter: 5,
                        xs: 1,
                        sm: 1,
                        md: 2,
                        lg: 3,
                        xl: 3,
                        xxl: 7,
                    }}
                    dataSource={Array.from({ length: 10 }, (_, index) => index)}
                    renderItem={() => (
                        <List.Item>
                            <CardDocument isSaved={true} action="Save" />
                        </List.Item>
                    )}
                />
            </div>
            <div className={cx('carousel')}>
                <h2 className={cx('title')}>Có thể phù hợp với bạn</h2>
                <Carousel
                    slidesToShow={7}
                    slidesToScroll={4}
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
                        <div key={doc.id} className={cx('items')}>
                            <CardDocument action="Like" />
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
}

export default Library;
