import { Flex, Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './Signup.module.scss';
import { Typography } from 'antd';
import classNames from 'classnames/bind';

import { createUserApi } from '~/utils/api';
const { Title } = Typography;

function Signup() {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate('/' + path);
    };
    const onFinish = async (values) => {
        console.log(values);
        const { fullName, email, password } = values;
        const res = await createUserApi(fullName, email, password);
        navigate('/login');
    };

    return (
        <Flex className={cx('wrapper')} justify="center" align="center" vertical>
            <div justify="center" align="center">
                <a onClick={() => handleNavigate('')}>
                    <img style={{ width: 90, height: 90 }} src="logo.png" />
                </a>
                <Title level={3}>Đăng Ký Vào Documan</Title>
            </div>
            <Form
                className={cx('coverForm')}
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                autoComplete="off"
                onFinish={onFinish}
            >
                <Title level={5}>Họ và Tên</Title>
                <Form.Item
                    style={{
                        width: '100%',
                    }}
                    name="fullName"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập Họ và Tên!',
                        },
                    ]}
                >
                    <Input
                        style={{
                            width: '280px',
                        }}
                    />
                </Form.Item>
                <Title level={5}>Email</Title>
                <Form.Item
                    style={{
                        width: '100%',
                    }}
                    name="email"
                    rules={[
                        {
                            message: 'Không đúng định dạng Email!',
                            type: 'email',
                        },
                        {
                            required: true,
                            message: 'Vui lòng nhập Email của bạn!',
                        },
                    ]}
                >
                    <Input
                        style={{
                            width: '280px',
                        }}
                    />
                </Form.Item>
                <Title level={5}>Mật Khẩu</Title>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu!',
                        },
                    ]}
                >
                    <Input.Password
                        style={{
                            width: '280px',
                        }}
                    />
                </Form.Item>

                <Form.Item align="center">
                    <Button htmlType="submit" className={cx('subbtn')}>
                        Đăng Ký
                    </Button>
                </Form.Item>

                <p
                    style={{
                        fontSize: 12,
                        width: '100%',
                    }}
                >
                    Đã Có Tài Khoản?<a onClick={() => handleNavigate('login')}> Đăng Nhập</a>
                </p>
            </Form>
        </Flex>
    );
}
export default Signup;
