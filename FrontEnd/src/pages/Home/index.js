import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import SearchBar from '~/components/SearchBar';
import SubjectCarousel from '~/components/SubjectCarousel';
import PostEncouragement from '~/components/PostEncouragement';
import DocumentCarousel from '~/components/DocumentCarousel';
import RecentlyReadCarousel from '~/components/RecentlyReadCarousel';
import { AuthContext } from '~/components/Context/auth.context';

const cx = classNames.bind(styles);

function Home() {
    const { auth } = useContext(AuthContext);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <SearchBar searchPath={'/search'} />
                <SubjectCarousel />
                <PostEncouragement />
                <DocumentCarousel />
                {auth?.user?.id && <RecentlyReadCarousel />} 
            </div>
        </div>
    );
}

export default Home;
