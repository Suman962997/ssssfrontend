import React, { useState } from 'react';
import './UserCreation.scss';
import { Card, Collapse, Modal, Form, Input, List, Button, message } from 'antd';
import CustomTable from '../../component/table/CustomTable';
import CustomDrawer from '../../component/drawer/CustomDrawer';
import { SettingOutlined, UserOutlined, UserSwitchOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

const UserCreation: React.FC = () => {
    const [activeChild, setActiveChild] = useState('userList');
    const [isUserDrawerVisible, setIsUserDrawerVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [roleData, setRoleData] = useState<any[]>([
        { key: "admin", roleName: "Administrator", permissions: "All Access" },
        { key: "editor", roleName: "Editor", permissions: "Edit Content" },
        { key: "viewer", roleName: "Viewer", permissions: "Read-Only" },
    ]);
    const [deletedRoles, setDeletedRoles] = useState<any[]>([]);
    const [userData, setUserData] = useState<any[]>([
        { key: "vanaraj123", name: "vanaraj", username: "vanaraj123@gmail.com", role: "Administrator" },
        { key: "stark456", name: "stark", username: "stark456@gmail.com", role: "User" },
        { key: "samrat789", name: "samrat", username: "samrat789@outlook.com", role: "Manager" },
        { key: "mrwhite101", name: "Mr White", username: "white101meth@gmail.com", role: "Editor" },
        { key: "nolan202", name: "nolan", username: "nolan202gmai.com", role: "Viewer" }
    ]);
    const [deletedUsers, setDeletedUsers] = useState<any[]>([]);
    const [isRecoverModalVisible, setIsRecoverModalVisible] = useState(false);
    const [form] = Form.useForm();

    const columns = [
        {
            title: "Display Name", dataIndex: "name", key: "name",
            sorter: (a: any, b: any) => a.name.localeCompare(b.name),

        },
        {
            title: "User Name", dataIndex: "username", key: "username",
            sorter: (a: any, b: any) => a.username.localeCompare(b.username),

        },
        {
            title: "Role", dataIndex: "role", key: "role",
            sorter: (a: any, b: any) => a.role.localeCompare(b.role),

        },
    ];

    const roleColumns = [
        {
            title: "Role Name", dataIndex: "roleName", key: "roleName",
            sorter: (a: any, b: any) => a.roleName.localeCompare(b.roleName),

        },
        {
            title: "Permissions", dataIndex: "permissions", key: "permissions",
            sorter: (a: any, b: any) => a.permissions.localeCompare(b.permissions),

        },
    ];

    const handleChildClick = (childKey: string) => {
        console.log(childKey, 'childKey')
        setActiveChild(childKey);
        setSelectedRowKeys([]);
    };

    const handleRowSelectionChange = (selectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(selectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: handleRowSelectionChange,
    };

    const handleAddUser = () => {
        form
            .validateFields()
            .then(values => {
                const newUser = {
                    name: values.name,
                    username: values.username,
                    role: values.role,
                };
                setUserData([...userData, newUser]);
                setIsUserDrawerVisible(false);
                form.resetFields();
            })
            .catch(err => {
                console.error('Validation failed:', err);
            });
    };


    const handleClose = () => {
        form.resetFields();
        setIsUserDrawerVisible(false);
    };


    const handleDeleteUser = () => {
        const usersToDelete = userData.filter((user) => selectedRowKeys.includes(user.key));
        const remainingUsers = userData.filter((user) => !selectedRowKeys.includes(user.key));

        setDeletedUsers([...deletedUsers, ...usersToDelete]);
        setUserData(remainingUsers);
        setSelectedRowKeys([]);
        setIsDeleteModalVisible(false);
    };

    const handleDeleteRole = () => {
        const rolesToDelete = roleData.filter((role) => selectedRowKeys.includes(role.key));
        const remainingRoles = roleData.filter((role) => !selectedRowKeys.includes(role.key));

        setDeletedRoles([...deletedRoles, ...rolesToDelete]);
        setRoleData(remainingRoles);
        setSelectedRowKeys([]);
        setIsDeleteModalVisible(false);
    };

    const handleRecoverUsers = () => {
        const usersToRecover = deletedUsers.filter((user) => selectedRowKeys.includes(user.key));
        const remainingDeletedUsers = deletedUsers.filter((user) => !selectedRowKeys.includes(user.key));

        setUserData([...userData, ...usersToRecover]);
        setDeletedUsers(remainingDeletedUsers);
        setSelectedRowKeys([]);
        setIsRecoverModalVisible(false);
    };

    const handleAddRole = () => {
        form
            .validateFields()
            .then(values => {
                const newRole = {
                    key: values.roleName.toLowerCase().replace(/\s+/g, ''),
                    roleName: values.roleName,
                    permissions: values.permissions,
                };
                setRoleData([...roleData, newRole]);
                setIsUserDrawerVisible(false);
                form.resetFields();
            })
            .catch(err => console.error('Validation failed:', err));
    };

    const handleRecoverRoles = () => {
        const rolesToRecover = deletedRoles.filter((role) => selectedRowKeys.includes(role.key));
        const remainingDeletedRoles = deletedRoles.filter((role) => !selectedRowKeys.includes(role.key));

        setRoleData([...roleData, ...rolesToRecover]);
        setDeletedRoles(remainingDeletedRoles);
        setSelectedRowKeys([]);
        setIsRecoverModalVisible(false);
    };


    const renderContent = () => {
        if (activeChild === 'userList') {
            return (
                <div>
                    <CustomTable
                        title="User List"
                        columns={columns}
                        data={userData}
                        bordered={false}
                        pagination={true}
                        setIsDrawerVisible={setIsUserDrawerVisible}
                        rowSelection={rowSelection}
                        setIsDeleteModalVisible={setIsDeleteModalVisible}
                        activeChild={activeChild}
                        placeholder={"Search User List..."}
                        containerClass={"cointainer-table"}

                    />
                </div>
            );
        } else if (activeChild === 'addUser') {
            return <div>
                <CustomTable
                    title="Added User"
                    columns={columns}
                    data={userData}
                    bordered={false}
                    pagination={true}
                    rowSelection={rowSelection}
                    setIsDeleteModalVisible={setIsDeleteModalVisible}
                    placeholder={"Search Added User List..."}
                    containerClass={"cointainer-table"}
                />
            </div>
        } else if (activeChild === 'deletedUsers') {
            return <div>
                <CustomTable
                    title="Deleted Users"
                    columns={columns}
                    data={deletedUsers}
                    bordered={false}
                    setIsRecoverModalVisible={setIsRecoverModalVisible}
                    pagination={true}
                    rowSelection={rowSelection}
                    activeChild={activeChild}
                    setIsDeleteModalVisible={setIsDeleteModalVisible}
                    placeholder={"Search Deleted User List..."}
                    containerClass={"cointainer-table"}

                />
            </div>
        } else if (activeChild === 'roleList') {
            return (
                <CustomTable
                    title="Role List"
                    columns={roleColumns}
                    data={roleData}
                    pagination={true}
                    activeChild={activeChild}
                    rowSelection={rowSelection}
                    setIsDeleteModalVisible={setIsDeleteModalVisible}
                    setIsDrawerVisible={setIsUserDrawerVisible}
                    placeholder={"Search Role List..."}
                    containerClass={"cointainer-table"}

                />
            )
        } else if (activeChild === 'addRole') {
            return (
                <CustomTable
                    title="Added Role"
                    columns={roleColumns}
                    data={roleData}
                    bordered={false}
                    pagination={true}
                    rowSelection={rowSelection}
                    setIsDeleteModalVisible={setIsDeleteModalVisible}
                    setIsDrawerVisible={setIsUserDrawerVisible}
                    placeholder={"Search Added Role List..."}
                    containerClass={"cointainer-table"}

                />
            )
        } else if (activeChild === 'deletedRole') {
            return (
                <CustomTable
                    title="Deleted Roles"
                    columns={roleColumns}
                    data={deletedRoles}
                    pagination={true}
                    activeChild={activeChild}
                    rowSelection={rowSelection}
                    setIsDeleteModalVisible={setIsDeleteModalVisible}
                    setIsRecoverModalVisible={setIsRecoverModalVisible}
                    placeholder={"Search Deleted Roles List..."}
                    containerClass={"cointainer-table"}

                />
            )
        } else if (activeChild === 'settings') {
            return (
                <Form form={form} layout="vertical" className="password-form">
                    <Form.Item
                        name="currentPassword"
                        label="Current Password"
                        rules={[{ required: true, message: 'Please input your current password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="newPassword"
                        label="New Password"
                        rules={[{ required: true, message: 'Please input your new password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        label="Confirm New Password"
                        dependencies={['newPassword']}
                        rules={[
                            { required: true, message: 'Please confirm your new password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('The two passwords do not match!');
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Button type="primary" onClick={handleChangePassword}>
                        Change Password
                    </Button>
                </Form>
            )
        }
    };

    const handleChangePassword = () => {
        form
            .validateFields(['currentPassword', 'newPassword', 'confirmPassword'])
            .then(values => {
                if (values.newPassword !== values.confirmPassword) {
                    message.error('New passwords do not match!');
                    return;
                }

                message.success('Password changed successfully!');
                form.resetFields(['currentPassword', 'newPassword', 'confirmPassword']);
            })
            .catch(error => {
                console.error('Password change failed:', error);
                message.error('Failed to change password. Please check your inputs.');
            });
    };

    const content = () => {
        return (
            <div>
                {activeChild === 'userList' ? (

                    <Form form={form} layout="vertical">
                        <Form.Item name="name" label="Display Name" rules={[{ required: true, message: 'Please enter a user name' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please enter a username' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="role" label="Role" rules={[{ required: true, message: 'Please enter a role' }]}>
                            <Input />
                        </Form.Item>
                    </Form>
                ) : (
                    <Form form={form} layout="vertical">
                        <Form.Item name="roleName" label="Role Name" rules={[{ required: true, message: 'Please enter a role name' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="permissions" label="Permissions" rules={[{ required: true, message: 'Please enter role permissions' }]}>
                            <Input />
                        </Form.Item>
                    </Form>
                )}
            </div>
        )
    }

    const footer = () => {
        return (
            <div className='footer'><Button type="primary" onClick={activeChild === 'userList' ? handleAddUser : handleAddRole}>
                {activeChild === 'userList' ? " Add User" : 'Add Role'}
            </Button><Button onClick={handleClose} type="primary">
                    Close
                </Button></div>
        )
    }

    return (
        <div className="user-main">
            <div className="user-container">
                <div className="user-first-box">
                    <Card title="Users" bordered>
                        <Collapse defaultActiveKey={['userList', 'addRole']} accordion expandIconPosition='end'>
                            <Panel header={
                                <>
                                    <UserOutlined className='header-icon' /> User
                                </>
                            } key="userList">
                                <List
                                    dataSource={[
                                        { key: 'userList', name: 'User List' },
                                        { key: 'addUser', name: 'Add User' },
                                        { key: 'deletedUsers', name: 'Deleted Users' },
                                    ]}
                                    renderItem={(item) => (
                                        <List.Item
                                            key={item.key}
                                            onClick={() => {
                                                handleChildClick(item.key);
                                            }}
                                            className={`category-item ${activeChild === item.key ? 'active' : ''}`}
                                        >
                                            {item.name}
                                        </List.Item>
                                    )}
                                />
                            </Panel>
                            <Panel header={
                                <>
                                    <UserSwitchOutlined className='header-icon' /> Role
                                </>
                            }
                                key="addRole">
                                <List
                                    dataSource={[
                                        { key: 'roleList', name: 'Role List' },
                                        { key: 'addRole', name: 'Add Role' },
                                        { key: 'deletedRole', name: 'Deleted Role' },
                                    ]}
                                    renderItem={(item) => (
                                        <List.Item
                                            key={item.key}
                                            onClick={() => handleChildClick(item.key)}
                                            className={`category-item ${activeChild === item.key ? 'active' : ''}`}
                                        >
                                            {item.name}
                                        </List.Item>
                                    )}
                                />
                            </Panel>
                        </Collapse>
                        <div className='setting' onClick={() => handleChildClick('settings')}>
                            <SettingOutlined className='header-icon' /> Settings
                        </div>
                    </Card>
                </div>

                <div className="user-second-box">
                    <Card title={activeChild.charAt(0).toUpperCase() + activeChild.slice(1)} bordered>
                        {renderContent()}
                    </Card>
                </div>
            </div>

            <CustomDrawer
                title={activeChild === 'userList' ? "Add User" : "Add Role"}
                placement="right"
                onClose={handleClose}
                visible={isUserDrawerVisible}
                width={800}
                footer={footer()}
                content={content()}
            />

            <Modal
                title="Confirm Deletion"
                visible={isDeleteModalVisible}
                onOk={activeChild === 'userList' ? handleDeleteUser : handleDeleteRole}
                onCancel={() => setIsDeleteModalVisible(false)}
            >
                {activeChild === 'userList' ? <p>Are you sure you want to delete the selected User?</p> : <p>Are you sure you want to delete the selected Role?</p>}

            </Modal>

            <Modal
                title="Confirm Recovery"
                visible={isRecoverModalVisible}
                onOk={activeChild === 'deletedUsers' ? handleRecoverUsers : handleRecoverRoles}
                onCancel={() => setIsRecoverModalVisible(false)}
            >
                {activeChild === 'deletedUsers' ? <p>Are you sure you want to recover the selected User?</p> : <p>Are you sure you want to recover the selected Role?</p>}

            </Modal>
        </div>
    );
};

export default UserCreation;
