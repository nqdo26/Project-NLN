import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Select, Space, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';

import styles from './TagDrawer.module.scss';

function TagDrawer({ onChange }) {
    const cx = classNames.bind(styles);
    const options = [];
    for (let i = 10; i < 36; i++) {
        const value = i.toString(36) + i;
        options.push({
            label: `Chủ đề ${value}`,
            value,
        });
    }
    const sharedProps = {
        mode: 'multiple',
        style: {
            width: '100%',
        },
        options,
        placeholder: 'Chọn chủ đề',
        maxTagCount: 'responsive',
    };

    const [value, setValue] = useState([]);
    const selectProps = {
        value,
        onChange: setValue,
    };

    return (
        <Space
            direction="vertical"
            style={{
                width: '100%',
            }}
        >
            <Select
                onChange={(value) => {
                    setValue(value); // Cập nhật state cục bộ
                    onChange(value); // Gửi giá trị lên component cha
                }}
                {...sharedProps}
                {...selectProps}
                maxTagPlaceholder={(omittedValues) => (
                    <Tooltip
                        styles={{
                            root: {
                                pointerEvents: 'none',
                            },
                        }}
                        title={omittedValues.map(({ label }) => label).join(', ')}
                    >
                        <span>Nhiều hơn...</span>
                    </Tooltip>
                )}
            />
        </Space>
    );
}

export default TagDrawer;
