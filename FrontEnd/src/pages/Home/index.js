
import DocumentCarousel from "~/components/DocumentCarousel";
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import SearchBar from "~/components/SearchBar";

const cx = classNames.bind(styles);

function Home() {
    const titleDocumentCarousel = 'Top documents for you';
    return (
        <div className={cx('wrapper')}>
            <SearchBar/>
            <DocumentCarousel title={titleDocumentCarousel}/>
        </div>
    )
}

export default Home;
