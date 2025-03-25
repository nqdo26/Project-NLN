import classNames from 'classnames/bind';
import { Flex, Button, Form, Input, Checkbox, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import { Typography } from 'antd';
import { loginApi } from '~/utils/api';
import { useContext } from 'react';
import { AuthContext } from '~/components/Context/auth.context';
const { Title } = Typography;

function Login() {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate('/' + path);
    };
    const onFinish = async (values) => {
        const { email, password } = values;
        const res = await loginApi(email, password);
        console.log(res);
        if (res && res.EC === 0) {
            localStorage.setItem('access_token', res.access_token);
            message.success('Đăng nhập thành công');
            setAuth({
                isAuthenticated: true,
                user: {
                    id: res?.user?.id ?? '',
                    email: res?.user?.email ?? '',
                    fullName: res?.user?.fullName ?? '',
                    avatar: res?.user?.avatar ?? '',
                    isAdmin: res?.user?.isAdmin ?? false,
                },
            });

            navigate('/');
        } else {
            message.error('Email/Password không đúng!');
        }
    };

    const { setAuth } = useContext(AuthContext);

    return (
        <Flex className={cx('wrapper')} justify="start" align="center" vertical>
            <div className={cx('logo')} justify="center" align="center">
                <a onClick={() => handleNavigate('')}>
                    <img style={{ width: 90, height: 90 }} src="logo.png" />{' '}
                </a>
                <Title level={3}>Đăng Nhập Vào Documan</Title>
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
                <Title level={5}>Email</Title>
                <Form.Item
                    style={{
                        width: '100%',
                    }}
                    name="email"
                    rules={[
                        {
                            message: 'Không đúng định dang Email!',
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
                            message: 'Vui lòng nhập vào mật khẩu!',
                        },
                    ]}
                >
                    <Input.Password
                        style={{
                            width: '280px',
                        }}
                    />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked" label={null}>
                    <Checkbox>Ghi nhớ</Checkbox>
                </Form.Item>
                <Form.Item align="center">
                    <Button htmlType="submit" className={cx('subbtn')}>
                        Đăng Nhập
                    </Button>
                </Form.Item>

                <p
                    style={{
                        fontSize: 12,
                        width: '100%',
                    }}
                >
                    Lần Đầu Vào Documan ?<a onClick={() => handleNavigate('signup')}> Đăng Ký Tài Khoản</a>
                </p>
            </Form>
        </Flex>
    );
}

export default Login;
