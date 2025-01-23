import React, { useState } from 'react';
import './UserCreation.scss';
import { Card, List, Modal, Form, Input, Checkbox } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CustomButton from '../../component/buttons/CustomButton';

const UserCreation: React.FC = () => {
    const [activeList, setActiveList] = useState('user');
    const [isUserModalVisible, setIsUserModalVisible] = useState(false);
    const [isRoleModalVisible, setIsRoleModalVisible] = useState(false);
    const [users, setUsers] = useState<string[]>(['john snow', 'jaime lannister']);
    const [roles, setRoles] = useState<string[]>(['Admin', 'Manager']);
    const [permissions] = useState<string[]>(['View', 'Edit', 'Delete']);
    const [rolePermissions, setRolePermissions] = useState<{ [role: string]: string[] }>({});
    const [form] = Form.useForm();

    const handleListClick = (key: string) => {
        setActiveList(key);
    };

    const handleAddUser = () => {
        form.validateFields()
            .then(values => {
                setUsers([...users, values.name]);
                form.resetFields();
                setIsUserModalVisible(false);
            })
            .catch(error => {
                console.error('Validation Error:', error);
            });
    };

    const handleAddRole = () => {
        form.validateFields()
            .then(values => {
                setRoles([...roles, values.name]);
                setRolePermissions({ ...rolePermissions, [values.name]: values.permissions || [] });
                form.resetFields();
                setIsRoleModalVisible(false);
            })
            .catch(error => {
                console.error('Validation Error:', error);
            });
    };

    const handlePermissionChange = (role: string, selectedPermissions: string[]) => {
        setRolePermissions({ ...rolePermissions, [role]: selectedPermissions });
    };

    const renderContent = () => {
        if (activeList === 'user') {
            return (
                <>
                    <CustomButton type="primary" icon={<PlusOutlined />} label='Add User' onClick={() => setIsUserModalVisible(true)} />
                    <List
                        dataSource={users}
                        renderItem={(user) => <List.Item key={user}>{user}</List.Item>}
                    />
                </>
            );
        } else if (activeList === 'role') {
            return (
                <>
                    <CustomButton type="primary" icon={<PlusOutlined />} label='Add Role' onClick={() => setIsRoleModalVisible(true)} />
                    <List
                        dataSource={roles}
                        renderItem={(role) => (
                            <List.Item key={role}>
                                <div className="role-item">
                                    <span>{role}</span>
                                    <Checkbox.Group
                                        options={permissions}
                                        value={rolePermissions[role] || []}
                                        onChange={(checkedValues) => handlePermissionChange(role, checkedValues as string[])}
                                    />
                                </div>
                            </List.Item>
                        )}
                    />
                </>
            );
        } else if (activeList === 'permissions') {
            return (
                <List
                    dataSource={permissions}
                    renderItem={(permission) => <List.Item key={permission}>{permission}</List.Item>}
                />
            );
        } else if (activeList === 'settings') {
            return (
                <div className="settings-container">
                    <h3>General Settings</h3>
                    <Form layout="vertical">
                        <Form.Item label="Application Name">
                            <Input placeholder="Enter application name" />
                        </Form.Item>
                        <Form.Item label="Default Language">
                            <Input placeholder="e.g., English" />
                        </Form.Item>
                        <Form.Item label="Time Zone">
                            <Input placeholder="e.g., UTC+0" />
                        </Form.Item>
                    </Form>

                    <h3>Account Settings</h3>
                    <Form layout="vertical">
                        <Form.Item label="Change Password">
                            <Input.Password placeholder="Enter new password" />
                        </Form.Item>
                        <Form.Item>
                            <Checkbox>Enable Two-Factor Authentication (2FA)</Checkbox>
                        </Form.Item>
                    </Form>

                    <h3>Notification Settings</h3>
                    <Form layout="vertical">
                        <Form.Item>
                            <Checkbox>Email Notifications</Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <Checkbox>SMS Notifications</Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <Checkbox>Push Notifications</Checkbox>
                        </Form.Item>
                    </Form>

                </div>
            );


        }
    };

    return (
        <div className="user-main">
            <div className="user-container">
                <div className="user-first-box">
                    <Card title="User Creation" bordered>
                        <List
                            dataSource={[
                                { key: 'user', section: 'User' },
                                { key: 'role', section: 'Role' },
                                { key: 'permissions', section: 'Permissions' },
                                { key: 'settings', section: 'Settings' },
                            ]}
                            renderItem={(category) => (
                                <List.Item
                                    key={category.key}
                                    onClick={() => handleListClick(category.key)}
                                    className={`category-item ${activeList === category.key ? 'active' : ''}`}
                                >
                                    {category.section}
                                </List.Item>
                            )}
                        />
                    </Card>
                </div>
                <div className="user-second-box">
                    <Card title={activeList.charAt(0).toUpperCase() + activeList.slice(1)} bordered>
                        {renderContent()}
                    </Card>
                </div>
            </div>

            {/* Add User Modal */}
            <Modal
                title="Add User"
                visible={isUserModalVisible}
                onOk={handleAddUser}
                onCancel={() => setIsUserModalVisible(false)}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="name"
                        label="User Name"
                        rules={[{ required: true, message: 'Please enter a user name' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>

            {/* Add Role Modal */}
            <Modal
                title="Add Role"
                visible={isRoleModalVisible}
                onOk={handleAddRole}
                onCancel={() => setIsRoleModalVisible(false)}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="name"
                        label="Role Name"
                        rules={[{ required: true, message: 'Please enter a role name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="permissions" label="Assign Permissions">
                        <Checkbox.Group options={permissions} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default UserCreation;
