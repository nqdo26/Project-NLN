import { Flex, message, Spin } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import '@cyntler/react-doc-viewer/dist/index.css';

import styles from './Doc.module.scss';
import { useParams } from 'react-router-dom';
import { getDocumentApi } from '~/utils/api';

function Doc() {
    const cx = classNames.bind(styles);

    const docId = useParams().docId;
    const [uri, setUri] = useState('');

    const docs = [
        // {
        //     uri: 'https://abuahgjtduokqedyeuzp.supabase.co/storage/v1/object/public/documents//1741081674722',
        // },

        { uri: uri },
        // { uri: require('../../docs/12345.pdf') },
    ];

    const config = {
        header: {
            disableHeader: true,
            disableFileName: true,
            retainURLParams: false,
        },
        csvDelimiter: ',', // "," as default,
        pdfZoom: {
            defaultZoom: 0.4, // 1 as default,
            zoomJump: 0.1, // 0.1 as default,
        },
        pdfVerticalScrollByDefault: true, // false as default
    };

    const fetchDoc = async () => {
        try {
            const response = await getDocumentApi(docId);
            setUri(response.link);
        } catch (error) {
            console.log(error);
            message.error('Error');
        }
    };

    useEffect(() => {
        console.log("🔥 useEffect chạy!");
        fetchDoc();
    }, []);
    return (
        <div className={cx('wrapper')}>
            {uri === '' ? (
                <Flex justify="center" align="center" style={{ height: '80vh', width: '100%' }}>
                    <Spin />
                </Flex>
            ) : (
                <DocViewer
                    style={{ width: '100%', height: '100%' }}
                    documents={docs}
                    pluginRenderers={DocViewerRenderers}
                    config={config}
                />
            )}
        </div>
    );
}

export default Doc;
