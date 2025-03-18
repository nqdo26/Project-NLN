import classNames from 'classnames/bind';

import SearchBar from '~/components/SearchBar';
import styles from './Library.module.scss';
import { List} from 'antd';
import CardDocument from '~/components/CardDocument';
const cx = classNames.bind(styles);

function Library() {


    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
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
                            gutter: 10,
                            xs: 1,
                            sm: 1,
                            md: 1,
                            lg: 2,
                            xl: 4,
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
                    <h2 className={cx('title')}>Tài liệu đã đọc</h2>
                    <List
                        grid={{
                            gutter: 10,
                            xs: 1,
                            sm: 1,
                            md: 1,
                            lg: 2,
                            xl: 4,
                            xxl: 7,
                        }}
                        dataSource={Array.from({ length: 5 }, (_, index) => index)}
                        renderItem={() => (
                            <List.Item>
                                <CardDocument isSaved={true} action="documents" />
                            </List.Item>
                        )}
                    />
                </div>
            </div>
    );
}

export default Library;
