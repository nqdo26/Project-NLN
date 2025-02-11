import { Divider, Flex, Typography, Input, Button, theme, Steps, message } from 'antd';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { EditOutlined, ReadOutlined } from '@ant-design/icons';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import '@cyntler/react-doc-viewer/dist/index.css';

import styles from './Doc.module.scss';

function Doc() {
    const cx = classNames.bind(styles);

    const docs = [
        { uri: require('../../docs/12345.pdf') }, // Local File
    ];

    const config = {
        header: {
            disableHeader: true,
            disableFileName: true,
            retainURLParams: false,
        },
        csvDelimiter: ',', // "," as default,
        pdfZoom: {
            defaultZoom: 0.6, // 1 as default,
            zoomJump: 0.1, // 0.1 as default,
        },
        pdfVerticalScrollByDefault: true, // false as default
    };

    return (
        <div className={cx('wrapper')}>
            <DocViewer
                style={{ backgroundColor: '#ccc', marginBottom: '-25px' }}
                documents={docs}
                pluginRenderers={DocViewerRenderers}
                config={config}
            />
        </div>
    );
}

export default Doc;
