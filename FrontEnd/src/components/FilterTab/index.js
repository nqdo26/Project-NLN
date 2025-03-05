import { Tabs } from 'antd';
import classNames from 'classnames/bind';
import styles from './FilterTab.module.scss';

const cx = classNames.bind(styles);

const items = [
    { key: 'documents', label: 'Tài liệu' },
    { key: 'categories', label: 'Danh mục' },
];

const FilterTabs = ({ onChange }) => {
    return (
        <Tabs
            className={cx('tabs')}
            defaultActiveKey="documents"
            items={items.map(item => ({
                ...item,
                label: (
                    <span className={cx('tab-label', { 'tab-label-active': item.key === 'documents' })}>
                        {item.label}
                    </span>
                ),
            }))}
            onChange={onChange}
        />
    );
};

export default FilterTabs;