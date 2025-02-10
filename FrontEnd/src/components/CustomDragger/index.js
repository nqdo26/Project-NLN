import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';

function CustomDragger() {
    const { Dragger } = Upload;
    const props = {
        name: 'file',
        multiple: true,
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };
    return (
        <Dragger {...props}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Nhấp vào hoặc thả file vào đây để tải lên</p>
            <p className="ant-upload-hint">
                Hỗ trợ tải lên một hoặc nhiều file cùng lúc. Các định dạng tài liệu được hỗ trợ: .pdf, .doc, .docx, .txt
            </p>
        </Dragger>
    );
}

export default CustomDragger;
