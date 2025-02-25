import { Divider, Flex, Typography, Input, Button, Select, Steps, message, Tooltip, Space, Badge } from 'antd';
import CustomDragger from '~/components/CustomDragger';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { ReadOutlined } from '@ant-design/icons';

import styles from './NewDoc.module.scss';
import TagDrawer from '~/components/TagDrawer';
import { getColorByFileType } from '~/utils/typeToColorCode';

function NewDoc() {
    const cx = classNames.bind(styles);
    const { Title } = Typography;
    const { TextArea } = Input;

    const [current, setCurrent] = useState(0);
    const [submitDoc, setSubmitDoc] = useState({
        author: '',
        title: '',
        description: '',
        createAt: '',
        link: '',
        type: '',
        categories: [],
        level: '',
        statistics: {
            views: 0,
            save: 0,
            downloads: 0,
            likes: 0,
            dislikes: 0,
        },
    });

    const handleUploadSuccess = (uniqueName, type) => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        setSubmitDoc((prev) => ({
            ...prev,
            createAt: `${dd}/${mm}/${yyyy}`,
            type: type,
            link: process.env.REACT_APP_SUPABASE_DOCUMENTS_BUCKET + uniqueName,
        }));
    };

    const handleSumbit = () => {
        message.success('Đăng tải thành công!');
    };

    const removeLink = () => {
        setSubmitDoc((prev) => ({ ...prev, link: '', type: '' }));
    };

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

    const steps = [
        {
            title: 'Khởi tạo tài liệu',
            content: (
                <Flex justify="center" className={cx('input-wrapper')}>
                    <Flex vertical style={{ width: '100%', maxWidth: '700px' }} className={cx('input-inner')}>
                        <Title level={3}>Tên</Title>
                        <Input
                            spellCheck="false"
                            onChange={(e) => setSubmitDoc({ ...submitDoc, title: e.target.value })}
                            value={submitDoc.title}
                            size="large"
                            placeholder="Tên tài liệu nên ngắn gọn dễ hiểu"
                            style={{ marginBottom: '20px' }}
                        />
                        <Title level={3}>Mô tả</Title>
                        <TextArea
                            spellCheck="false"
                            placeholder="Mô tả chi tiết về tài liệu"
                            autoSize={{
                                minRows: 2,
                                maxRows: 6,
                            }}
                            style={{ marginBottom: '20px' }}
                            value={submitDoc.description}
                            onChange={(e) => setSubmitDoc({ ...submitDoc, description: e.target.value })}
                        />
                        <Title level={3}>Cấp bậc</Title>
                        <Select
                            style={{
                                width: '100%',
                                marginBottom: '20px',
                            }}
                            onChange={(value) => setSubmitDoc({ ...submitDoc, level: value })}
                            value={submitDoc.level}
                            options={[
                                {
                                    value: 'saudaihoc',
                                    label: 'Sau đại học',
                                },
                                {
                                    value: 'daihoc',
                                    label: 'Đại học',
                                },
                                {
                                    value: 'thpt',
                                    label: 'Trung học phổ thông',
                                },
                                {
                                    value: 'thcs',
                                    label: 'Trung học cơ sở',
                                },
                                {
                                    value: 'tieuhoc',
                                    label: 'Tiểu học',
                                },
                                {
                                    value: 'khac',
                                    label: 'Khác',
                                },
                            ]}
                        />
                        <Title level={3}>Chủ đề</Title>
                        <Space
                            direction="vertical"
                            style={{
                                width: '100%',
                            }}
                        >
                            <Select
                                {...sharedProps}
                                onChange={(value) => {
                                    setSubmitDoc({ ...submitDoc, categories: value });
                                }}
                                value={submitDoc.categories}
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
                    </Flex>
                </Flex>
            ),
        },
        {
            title: 'Đăng tải tài liệu',
            content: (
                <Flex wrap className={cx('upload')} justify="center">
                    <CustomDragger onUploadSuccess={handleUploadSuccess} removeLink={removeLink}></CustomDragger>
                </Flex>
            ),
        },
    ];

    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));

    console.log(submitDoc);

    return (
        <Flex wrap vertical className={cx('wrapper')}>
            <Flex justify="space-between" align="center" className={cx('header-wrapper')}>
                <Flex gap={10} align="start">
                    <div>
                        <Title level={2}>{submitDoc.title === '' ? 'Tạo tài liệu mới' : submitDoc.title}</Title>
                    </div>

                    <Badge color={getColorByFileType(submitDoc.type)} count={submitDoc.type} />
                </Flex>
                <div>
                    {current > 0 && (
                        <Button
                            disabled={submitDoc.link !== ''}
                            style={{
                                margin: '0 8px',
                            }}
                            onClick={() => prev()}
                        >
                            Trở về
                        </Button>
                    )}
                    {current < steps.length - 1 && (
                        <Button
                            disabled={
                                submitDoc.title === '' ||
                                submitDoc.description === '' ||
                                submitDoc.level === '' ||
                                submitDoc.categories.length === 0
                            }
                            type="primary"
                            onClick={() => next()}
                        >
                            Tiếp tục
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button disabled={submitDoc.link === ''} type="primary" onClick={handleSumbit}>
                            Hoàn thành
                        </Button>
                    )}
                </div>
            </Flex>

            <Steps current={current} items={items} />
            <Divider></Divider>
            <div>{steps[current].content}</div>
        </Flex>
    );
}

export default NewDoc;
