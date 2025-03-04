import { Spin } from 'antd';

function LoadingSpin({ loading }) {
    return (
        <Spin
            spinning={loading}
            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        ></Spin>
    );
}

export default LoadingSpin;
