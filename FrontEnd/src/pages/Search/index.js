import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import FilterTabs from '~/components/FilterTab';
import SearchBar from '~/components/SearchBar';
import styles from './Search.module.scss';
import CardSearch from '~/components/CardSearch';
import CardSubjectSearch from '~/components/CardSubjectSearch';
import { getCategoriesApi, getDocumentsApi } from '~/utils/api';
import { notification } from 'antd';

const cx = classNames.bind(styles);

function Search() {
    const [activeTab, setActiveTab] = useState('all');

    const [documents, setDocuments] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const res = await getDocumentsApi();
                if (res) {
                    setDocuments(res);
                    console.log('>>>Res', res)
                } else {
                    notification.error({ message: 'Lỗi', description: 'Dữ liệu không hợp lệ' });
                }
            } catch (error) {
                console.error('Fetch error:', error);
                notification.error({ message: 'Lỗi', description: 'Không thể lấy danh sách tài liệu' });
            }
        };
    
        fetchDocuments();
    }, []);

    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getCategoriesApi();
                if (res && Array.isArray(res.data)) {
                    setCategories(res.data);
                } else {
                    notification.error({ message: 'Error', description: 'Invalid data format' });
                }
            } catch (error) {
                notification.error({ message: 'Error', description: 'Failed to fetch categories' });
            }
        };

        fetchCategories();
    }, []);

  

    const handleTabChange = (key) => {
        setActiveTab(key);
    };

    return (
        <div className={cx('wrapper')}>
            <SearchBar />
            <FilterTabs onChange={handleTabChange} />
            <div className={cx('content')}>
                {activeTab === 'documents' && (
                    <>
                    {documents.map((doc) => (
                        <div key={doc._id}>
                           <CardSearch 
                            _id={doc._id}
                            title={doc.title} 
                            badge={doc.type}
                            level={doc.level && doc.level.title ? doc.level.title : 'Lỗi rồi'}
                            categories={doc.categories?.map(cat => cat.title).join(' | ') || 'Không có danh mục'} 
                            views={doc.statistics.views}
                            createAt={new Date(doc.createAt).toLocaleDateString('vi-VN')}
                            likePercentage={(doc.statistics.likes / (doc.statistics.likes + doc.statistics.dislikes)) * 100}
                            
                        />
                        </div>
                    ))}
                    </>
                )}
                {activeTab === 'categories' && (
                    <>
                        {categories.map((cat) => (
                            <div key={cat._id}>
                                <CardSubjectSearch
                                    title = {cat.title}
                                    total = '10'
                                />
                            </div>
                        ))}
                    </>     
                )}    
            </div>
        </div>
    );
}

export default Search;
