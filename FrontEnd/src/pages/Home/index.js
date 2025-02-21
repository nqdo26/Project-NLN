import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import SearchBar from '~/components/SearchBar';
import SubjectCarousel from '~/components/SubjectCarousel';
import PostEncouragement from '~/components/PostEncouragement';
import SuggestCarousel from '~/components/SuggestCarousel';
import { List } from 'antd';
import CardDocument from '~/components/CardDocument';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <SearchBar />
            <SubjectCarousel/>
            <PostEncouragement />
            <SuggestCarousel title="Top subjects for you" />
            <div>
                <h2 className={cx('title')}>Continue reading</h2>
                <List
                    grid={{
                        gutter: 0,
                        xs: 1,
                        sm: 1,
                        md: 2,
                        lg: 3,
                        xl: 3,
                        xxl: 8,
                    }}
                    dataSource={Array.from({ length: 5 }, (_, index) => index)}
                    renderItem={() => (
                        <List.Item>
                            <CardDocument />
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
}

export default Home;
