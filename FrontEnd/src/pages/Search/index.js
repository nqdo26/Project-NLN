import React, { useState } from 'react';
import classNames from 'classnames/bind';

import FilterTabs from '~/components/FilterTab';
import SearchBar from '~/components/SearchBar';
import styles from './Search.module.scss';
import CardSearch from '~/components/CardSearch';
import CardSubjectSearch from '~/components/CardSubjectSearch';

const cx = classNames.bind(styles);

function Search() {
    const [activeTab, setActiveTab] = useState('all');

    const handleTabChange = (key) => {
        setActiveTab(key);
    };

    return (
        <div className={cx('wrapper')}>
            <SearchBar />
            <FilterTabs onChange={handleTabChange} />
            <div className={cx('content')}>
                {activeTab === 'all' && (
                    <>
                        <CardSearch />
                        <CardSearch />
                        <CardSearch />
                        <CardSearch />
                        <CardSearch />
                    </>
                )}
                {activeTab === 'courses' && (
                    <>
                        <CardSubjectSearch />
                        <CardSubjectSearch />
                        <CardSubjectSearch />
                        <CardSubjectSearch />
                        <CardSubjectSearch />
                    </>
                )}
            </div>
        </div>
    );
}

export default Search;
