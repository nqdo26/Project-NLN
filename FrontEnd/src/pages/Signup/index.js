import { Layout, Flex, Button, Form, Input, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './Signup.module.scss';
import { Typography } from 'antd';
import classNames from 'classnames/bind';
const { Title } = Typography;

function Signup() {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate('/' + path);
    };
    return (
        <Flex className={cx('wrapper')} justify="center" align="center" vertical>
            <Title level={3}>Sign up to Documan</Title>
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
                <Title level={5}>Email</Title>
                <Form.Item
                    style={{
                        width: '100%',
                    }}
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input
                        style={{
                            width: 250,
                        }}
                        placeholder="Input Email"
                    />
                </Form.Item>

                <Title level={5}>Username</Title>
                <Form.Item
                    name="Username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username',
                        },
                    ]}
                >
                    <Input
                        style={{
                            width: 250,
                        }}
                        placeholder="Input Username"
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
                        placeholder="Input Password"
                    />
                </Form.Item>
                <Title level={5}>Confirm Password</Title>

                <Form.Item
                    name="checkpassword"
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                    ]}
                >
                    <Input.Password
                        style={{
                            width: 250,
                        }}
                        placeholder="Confirm Password"
                    />
                </Form.Item>

                <Form.Item align="center">
                    <Button type="primary" className={cx('subbtn')}>
                        Create
                    </Button>
                </Form.Item>
            </Form>
        </Flex>
    );
}
export default Signup;
