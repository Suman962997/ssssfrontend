import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Tooltip } from 'antd';
import AeiforoLogo from '../../assets/images/Aeiforo-logo.png';
import { ReactComponent as Profile } from '../../assets/images/profile.svg'
import CustomSearchInput from '../inputfield/CustomSearchInput';
import { BellOutlined, LogoutOutlined, SettingFilled } from '@ant-design/icons';
import CustomModal from '../popup/CustomModel';
import { userInfo } from '../../utils/Options';
import './NavBar.scss';
import { bgColor } from '../../style/ColorCode';
const NavBar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const [activeLink, setActiveLink] = useState<string>('Dashboard');
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState(false);


    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };
    useEffect(() => {
        const path = location.pathname.split('/')[1];
        setActiveLink(path || 'dashboard');
    }, [location.pathname]);

    const handleLinkClick = (linkName: string) => {
        setActiveLink(linkName);
    };

    const handleLogout = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const goToProfile = () => {
        navigate('/profile');
    };
    const goToQuestionnaire = () => {
        navigate('/questionnaire');
    };

    const goToUserManagement = () => {
        navigate('/user-management');
    };
    const goToCompanyForm = () => {
        navigate('/company');
    };

    const goToSupplierManagement = () => {
        navigate('/supplier-management');
    };

    const setting = (
        <div className='dropdown-menu'>
            <div className='profile-content'>
                <div className='supplier-name' onClick={() => goToSupplierManagement()}>Supplier</div>
                <div className='supplier-name' onClick={() => goToQuestionnaire()}>Questionnaire</div>
                <div className='supplier-name' onClick={() => goToCompanyForm()}>Company Form</div>
                <div className='user-name' onClick={() => goToUserManagement()}>User Management</div>

            </div>
        </div>
    )

    const profile = (
        <div className="dropdown-menu">
            <div className="dropdown-item">
                <Avatar size={45} icon={<Profile />} onClick={() => handleOpenModal()} />
                <div className="profile-details">
                    <span className="profile-name">Mugesh</span>
                    <span className="profile-role">Admin</span>
                </div>
            </div>
            <div className='profile-content'>
                <div className='profile' role='button' onClick={() => goToProfile()}>Profile</div>
            </div>
            <div className="dropdown-item logout" onClick={handleLogout}>
                <LogoutOutlined />
                <span>Logout</span>
            </div>
        </div>

    )
    return (
        <>
            <div className="navbar">
                <div>
                    <img width={180} src={AeiforoLogo} alt="AeiforoLogo" />
                </div>
                <div className="flex">
                    <ul>
                        <li>
                            <Link
                                to="/dashboard"
                                className={activeLink === 'dashboard' ? 'active' : ''}
                                onClick={() => handleLinkClick('dashboard')}
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/reports"
                                className={activeLink === 'reports' ? 'active' : ''}
                                onClick={() => handleLinkClick('reports')}
                            >
                                Report
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/quality"
                                className={activeLink === 'quality' ? 'active' : ''}
                                onClick={() => handleLinkClick('quality')}
                            >
                                Quality
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/analytics"
                                className={activeLink === 'analytics' ? 'active' : ''}
                                onClick={() => handleLinkClick('analytics')}
                            >
                                Analytics
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="nav-profile-all">
                    <CustomSearchInput
                        value={''}
                        onChange={(value) => { }}
                        placeholder="Search here..." />
                    <div className="nav-profile">
                        <BellOutlined />
                        <div className="settings-icon">
                            <Tooltip color={bgColor} title={setting}>
                                <SettingFilled />
                            </Tooltip>
                        </div>

                    </div>
                    <div className="profile-details">
                        <span className="profile-name-out">{userInfo?.email}</span>
                        <span className="profile-role-out">{userInfo?.user}</span>
                    </div>
                    <div className="nav-profile-pic">
                        <Tooltip color={bgColor}
                            placement="rightTop"
                            title={profile}>
                            <Avatar size={40} icon={<Profile />} />
                        </Tooltip>
                    </div>
                </div>
            </div>
            <CustomModal
                visible={isModalVisible}
                onClose={handleCloseModal}
                title={""}
                content={<Profile />}
                closable={false}
                footer={null} />
        </>
    );
};

export default NavBar;
