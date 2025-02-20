import classNames from 'classnames/bind';
import { Layout, Flex, Button, Form, Input, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import { eventWrapper } from '@testing-library/user-event/dist/utils';
import { BankTwoTone, UserOutlined } from '@ant-design/icons';
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
                <UserOutlined />
                <Title level={3}>Sign in to Documan</Title>
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
            >
                <Title level={5}>Username</Title>
                <Form.Item
                    style={{
                        width: '100%',
                    }}
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input
                        style={{
                            width: 250,
                        }}
                    />
                </Form.Item>
                <Title level={5}>Password</Title>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password
                        style={{
                            width: 250,
                        }}
                    />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked" label={null}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Form.Item align="center">
                    <button className={cx('subbtn')}>Sign in</button>
                </Form.Item>

                <p
                    style={{
                        fontSize: 12,
                        width: '100%',
                    }}
                >
                    New to Documan ?<a onClick={() => handleNavigate('signup')}> Create an Account</a>
                </p>
            </Form>
        </Flex>
    );
}

export default Login;
