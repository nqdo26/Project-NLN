import React from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import SearchBar from '~/components/SearchBar';
import SubjectCarousel from '~/components/SubjectCarousel';
import PostEncouragement from '~/components/PostEncouragement';
import DocumentCarousel from '~/components/DocumentCarousel';

const cx = classNames.bind(styles);

function Home() {
    
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')} >
            <SearchBar 
                 searchPath={'/search'}
            />
                <SubjectCarousel />
                <PostEncouragement />
                <DocumentCarousel />
            </div>
        </div>
    );
}

export default Home;
