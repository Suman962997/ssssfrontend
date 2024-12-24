import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Card, Tabs } from "antd";
import {
    SettingOutlined,
    HistoryOutlined,
    LogoutOutlined,
    ArrowLeftOutlined,
} from "@ant-design/icons";
import { ReactComponent as Profile } from '../../assets/images/profile.svg'
import AeiforoLogo from "../../assets/images/Aeiforo-logo.png";
import CustomButton from "../../component/buttons/CustomButton";
import "./Profile.scss";
import { userInfo } from "../../utils/Options";

const { TabPane } = Tabs;

const ProfilePage: React.FC = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        console.log("User logged out");
    };

    const goBackToContact = () => {
        console.log("LogOut");
    };

    const goBackToDash = () => {
        navigate("/dashboard");
    };

    return (
        <div className="profile-main">
            <div className="profile-navbar-top">
                <div>
                    <img width={180} src={AeiforoLogo} alt="AeiforoLogo" />
                </div>
                <CustomButton label="Contact" type="secondary" onClick={goBackToContact} />
            </div>
            <div className="profile-navbar">
                <div className="profile-header">
                    <ArrowLeftOutlined onClick={goBackToDash} />{" "}
                    <div>{"Profile"}</div>
                </div>
            </div>
            <div className="profile-page">
                <Card className="profile-card">
                    <div className="profile-header">
                        <Avatar size={100} icon={<Profile />} />
                        <div className="profile-info">
                            <h2>{userInfo.name}</h2>
                            <p className="profile-email">{userInfo.email}</p>
                            <p className="profile-phone">{userInfo.phone}</p>
                            <p className="profile-bio">{userInfo.user}</p>
                        </div>
                    </div>
                    <CustomButton
                        type="primary"
                        icon={<LogoutOutlined />}
                        onClick={handleLogout}
                        className="logout-button"
                        label="Logout"
                    />

                </Card>
                <Card className="profile-tabs">
                    <Tabs defaultActiveKey="1" className="custom-tabs">
                        <TabPane
                            tab={
                                <><span>
                                    <SettingOutlined />

                                </span>
                                    <div>
                                        Account Settings
                                    </div></>
                            }
                            key="1"
                        >
                            <div className="tab-content">
                                <h3>Update your settings</h3>
                                <p>Here you can manage your account preferences and security.</p>
                            </div>
                        </TabPane>
                        <TabPane
                            tab={
                                <>
                                    <span>
                                        <HistoryOutlined />

                                    </span>
                                    <div>
                                        History
                                    </div>
                                </>
                            }
                            key="2"
                        >
                            <div className="tab-content">
                                <h3>Your List</h3>
                                <p>No History found.</p>
                            </div>
                        </TabPane>
                    </Tabs>
                </Card>
            </div>
        </div>
    );
};

export default ProfilePage;
