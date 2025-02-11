import { Divider, Flex, Typography, Input, Button, Select, Steps, message } from 'antd';
import CustomDragger from '~/components/CustomDragger';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { EditOutlined, ReadOutlined } from '@ant-design/icons';
import CustomSteps from '~/components/CustomSteps';

import styles from './NewDoc.module.scss';
import TagDrawer from '~/components/TagDrawer';

function NewDoc() {
    const cx = classNames.bind(styles);
    const { Title } = Typography;
    const { TextArea } = Input;

    const [current, setCurrent] = useState(0);

    const handleLevelChange = () => {};

    const steps = [
        {
            title: 'Khởi tạo tài liệu',
            content: (
                <Flex justify="center" className={cx('input-wrapper')}>
                    <Flex vertical style={{ width: '100%', maxWidth: '700px' }} className={cx('input-inner')}>
                        <Title level={3}>Tên</Title>
                        <Input
                            size="large"
                            placeholder="Tên tài liệu nên ngắn gọn dễ hiểu"
                            prefix={<ReadOutlined />}
                            style={{ marginBottom: '20px' }}
                        />
                        <Title level={3}>Mô tả</Title>
                        <TextArea
                            placeholder="Mô tả chi tiết về tài liệu"
                            autoSize={{
                                minRows: 2,
                                maxRows: 6,
                            }}
                            style={{ marginBottom: '20px' }}
                        />
                        <Title level={3}>Cấp bậc</Title>
                        <Select
                            defaultValue="daihoc"
                            style={{
                                width: '100%',
                                marginBottom: '20px',
                            }}
                            onChange={handleLevelChange}
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
                        <TagDrawer></TagDrawer>
                    </Flex>
                </Flex>
            ),
        },
        {
            title: 'Đăng tải tài liệu',
            content: (
                <Flex wrap className={cx('upload')} justify="center">
                    <CustomDragger></CustomDragger>
                </Flex>
            ),
        },
        {
            title: 'Xem trước tài liệu',
            content: 'Last-content',
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

    return (
        <Flex wrap vertical className={cx('wrapper')}>
            <Flex justify="space-between" align="center" className={cx('header-wrapper')}>
                <Title level={2}>Tạo tài liệu mới</Title>
                <div>
                    {current > 0 && (
                        <Button
                            style={{
                                margin: '0 8px',
                            }}
                            onClick={() => prev()}
                        >
                            Trở về
                        </Button>
                    )}
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => next()}>
                            Tiếp tục
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Đăng tải thành công!')}>
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
