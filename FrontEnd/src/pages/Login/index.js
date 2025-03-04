import classNames from 'classnames/bind';
import { Layout, Flex, Button, Form, Input, Checkbox } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import { Typography } from 'antd';
const { Title } = Typography;

function Login() {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate('/' + path);
    };
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
                onFinish={(value) => {
                    console.log(value);
                }}
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
