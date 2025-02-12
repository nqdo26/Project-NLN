import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import SearchBar from '~/components/SearchBar';
import DocumentCarousel from '~/components/DocumentCarousel';
import SubjectCarousel from '~/components/SubjectCarousel';
import PostEncouragement from '~/components/PostEncouragement';
import SuggestCarousel from '~/components/SuggestCarousel';

const cx = classNames.bind(styles);

function Home() {

    return (
        <div className={cx('wrapper')}>
            <SearchBar />
            <SubjectCarousel title="Top subjects for you" />
            <PostEncouragement />
            <SuggestCarousel title="Top subjects for you" />
            <DocumentCarousel title="Continue reading" />
        </div>
    );
}

export default Home;
