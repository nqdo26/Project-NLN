import { InboxOutlined } from '@ant-design/icons';
import { Button, Flex, message, Upload } from 'antd';
import { supabase } from '../../utils/supabase'; // Thêm import này
import { useState } from 'react';

function CustomDragger({ onUploadSuccess, removeLink }) {
    const { Dragger } = Upload;
    const [uploadedName, setUploadedName] = useState('');
    const [fileName, setFileName] = useState('');

    const customRequest = async ({ file, onSuccess, onError, onProgress }) => {
        try {
            onProgress({ percent: 1 });
            const type = file.name.split('.').pop();
            const uniqueName = `${Date.now()}`;
            const { data, error } = await supabase.storage.from('documents').upload(uniqueName, file);
            if (error) {
                onError(error);
                message.error(`${file.name} upload failed.`);
                return;
            }

            onProgress({ percent: 100 });
            onSuccess('Ok');
            message.success(`${file.name} uploaded successfully.`);
            setUploadedName(uniqueName);
            setFileName(file.name);
            onUploadSuccess(uniqueName, type);
        } catch (err) {
            onError(err);
            message.error(`${file.name} upload failed.`);
        }
    };

    const handleRemove = async () => {
        const result = await supabase.storage.from('documents').remove(uploadedName);
        setUploadedName('');
        setFileName('');
        removeLink();
    };

    const props = {
        name: 'file',
        multiple: false,
        accept: '.pdf,.doc,.docx,.txt,.ppt,.pptx,.xls,.xlsx',
        customRequest,
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
        onRemove: handleRemove,
    };

    return (
        <div>
            <Dragger showUploadList={false} {...props} disabled={uploadedName !== ''}>
                <div>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Nhấp vào hoặc thả file vào đây để tải lên</p>
                    <p className="ant-upload-hint">
                        Tải lên một file. Các định dạng tài liệu được hỗ trợ: .pdf, .doc, .docx, .txt, .ppt, .pptx,
                        .xls, .xlsx
                    </p>
                </div>
            </Dragger>
            <div hidden={uploadedName === ''}>
                <Flex style={{ width: '100%', padding: '10px' }} justify="space-between" align="center">
                    <p>{fileName}</p>
                    <Button onClick={handleRemove}>Xoa</Button>
                </Flex>
            </div>
        </div>
    );
}

export default CustomDragger;
