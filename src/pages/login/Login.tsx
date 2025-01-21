import React, { useState } from 'react';
import { Card, Input, Button, Checkbox, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from '@ant-design/icons';
import './Login.scss';
import AeiforoLogo from '../../assets/images/Aeiforo-logo.png';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../component/buttons/CustomButton';

const LoginPage = () => {
    const navigate = useNavigate();
    const Background = require('../../assets/images/login_background.svg').default;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const correctUsername = 'admin123';
    const correctPassword = 'admin@123';

    const handleLogin = () => {
        if (!username || !password) {
            message.error('Please fill in both username and password!');
            return;
        }
        if (username === correctUsername && password === correctPassword) {
            navigate('/dashboard');
        } else {
            message.error('Invalid username or password!');
        }
    };

    return (
        <div className="login-page">
            <div className="login-illustration">
                <div className="login-con">
                    <img width={120} src={AeiforoLogo} alt="Aeiforo Logo" />
                </div>
                <div className="illustration-content">
                    <img src={Background} alt="Illustration" />
                </div>
            </div>

            <div className="login-form-container">
                <Card className="login-card">
                    <div className="login-header">
                        <h2>Welcome to Aeiforo</h2>
                    </div>
                    <form className="login-form" onSubmit={(e) => e.preventDefault()}>
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Email"
                            className="login-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Password"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            className="login-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="login-options">
                            <Checkbox>Remember me</Checkbox>
                            <a href="/forgot-password" className="forgot-password-link">
                                Forgot password?
                            </a>
                        </div>
                        <CustomButton
                            type="primary"
                            className="login-button"
                            onClick={handleLogin}
                            label='Log In'
                        />

                    </form>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;
