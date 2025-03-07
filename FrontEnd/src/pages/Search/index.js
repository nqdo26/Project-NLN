import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import { notification } from 'antd';

import FilterTabs from '~/components/FilterTab';
import SearchBar from '~/components/SearchBar';
import CardSearch from '~/components/CardSearch';
import CardSubjectSearch from '~/components/CardSubjectSearch';
import { getCategoriesApi, getDocumentsApi, searchApi } from '~/utils/api';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    const [activeTab, setActiveTab] = useState('all');
    const [allDocuments, setAllDocuments] = useState([]);
    const [allCategories, setAllCategories] = useState([]); 
    const [searchedDocuments, setSearchedDocuments] = useState(null); 
    const [searchedCategories, setSearchedCategories] = useState(null);
    const [isSearching, setIsSearching] = useState(false); 
    const location = useLocation();

    const fetchAllData = async () => {
        try {
            const [docsRes, catsRes] = await Promise.all([getDocumentsApi(), getCategoriesApi()]);

            if (docsRes) setAllDocuments(docsRes);
            if (catsRes?.data && Array.isArray(catsRes.data)) setAllCategories(catsRes.data);
        } catch (error) {
            notification.error({ message: 'Lỗi', description: 'Không thể lấy dữ liệu' });
        }
    };

    const handleSearch = async (title) => {
        try {
            const res = await searchApi(title);
            if (res?.EC === 0) {
                setSearchedDocuments(res.data.documents);
                setSearchedCategories(res.data.categories);
                setIsSearching(true);

            } else {
                setSearchedDocuments([]);
                setSearchedCategories([]);
                setIsSearching(true);
            }
        } catch (error) {
            notification.error({ message: 'Lỗi', description: 'Lỗi tìm kiếm dữ liệu' });
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const title = params.get('title');

        if (title) {
            handleSearch(title);
        } else {
            setIsSearching(false); 
            fetchAllData();
        }
    }, [location.search]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <SearchBar onSearch={handleSearch} />
                <FilterTabs onChange={setActiveTab} activeTab={activeTab} />
                <div className={cx('content')}>
                    {activeTab === 'all' ? (
                        (isSearching ? searchedDocuments : allDocuments).length > 0 ? (
                            (isSearching ? searchedDocuments : allDocuments).map((doc) => (
                                <CardSearch
                                    key={doc._id}
                                    _id={doc._id}
                                    title={doc.title}
                                    badge={doc.type}
                                    level={doc.level?.title || 'Không có cấp độ'}
                                    categories={doc.categories?.map((cat) => cat.title).join(' | ') || 'Không có danh mục'}
                                    views={doc.statistics.views}
                                    createAt={new Date(doc.createAt).toLocaleDateString('vi-VN')}
                                    likePercentage={(doc.statistics.likes / (doc.statistics.likes + doc.statistics.dislikes)) * 100 || 0}
                                />
                            ))
                        ) : (
                            <p>Không có tài liệu phù hợp.</p>
                        )
                    ) : ( 
                        (isSearching ? searchedCategories : allCategories).length > 0 ? (
                            (isSearching ? searchedCategories : allCategories).map((cat) => (
                                <CardSubjectSearch key={cat._id} title={cat.title} total="10" />
                            ))
                        ) : (
                            <p>Không có danh mục phù hợp.</p>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default Search;
