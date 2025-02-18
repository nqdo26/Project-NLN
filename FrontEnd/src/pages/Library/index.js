import classNames from 'classnames/bind';

import SearchBar from '~/components/SearchBar';
import styles from './Library.module.scss';
import SavedCarousel from '~/components/SavedCarousel';
const cx = classNames.bind(styles);

function Library() {

    return (
        <div className={cx('wrapper')}>
            <SearchBar />
            <SavedCarousel title="Your Saved Documents" />
        </div>
    );
}

export default Library;
