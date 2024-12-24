import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AeiforoLogo from "../../assets/images/Aeiforo-logo.png";
import CustomButton from "../buttons/CustomButton";
import { ArrowLeftOutlined, CheckOutlined } from "@ant-design/icons";
import {
  GlobalIconComponent,
  HomeIconComponent,
  MailIconComponent,
} from "../../utils/ContactIcons";
import { ShareComponent } from "../../component/sharesocial/ShareSocial";
import { Tabs } from "antd";
import "./DetailsNavBar.scss";

interface NavBarProps {
  activeLink: string;
  setActiveLink: (linkName: string) => void;
  id?: string;
  record: any;
  type?: string;
}

interface TabItem {
  name: string;
  label: string;
}

const NavBar: React.FC<NavBarProps> = ({ activeLink, setActiveLink, id, record }) => {
  const navigate = useNavigate();

  const tabs: TabItem[] = [
    { name: "overview", label: "Overall Reports" },
    { name: "company", label: "Company" },
    { name: "products&services", label: "Products & Services" },
    { name: "location", label: "Location" },
    { name: "governance", label: "Governance and Certifications" },
    { name: "carbon", label: "Emissions" },
    { name: "performance", label: "Offsets and Performance" },
    { name: "analyse", label: "Analyse" },
    { name: "reports", label: "Reports" },
    { name: "waste-consumption", label: "Waste & Consumption" },
    { name: "benchmark-sustainability", label: "Benchmark for Sustainability" },
    { name: "strategy-road-map", label: "Strategy & Road-Map" },
  ];

  const handleLinkClick = (linkName: string) => {
    setActiveLink(linkName);
  };

  const goBackToDash = () => {
    localStorage.removeItem("record");
    localStorage.removeItem("activeTab");
    navigate("/dashboard");
  };

  const goBackToContact = () => {
    console.log("Contact button clicked");
  };



  return (
    <>
      <div className="navbar-1">
        <div>
          <img width={180} src={AeiforoLogo} alt="AeiforoLogo" />
        </div>
        <CustomButton label="Contact" type="secondary" onClick={goBackToContact} />
      </div>
      <div className="navbar-2">
        <div className="heading">
          <ArrowLeftOutlined onClick={goBackToDash} />{" "}
          <div>{record?.supplier}</div>
          <div className="qualify">
            <CheckOutlined /> Qualified
          </div>
        </div>
        <div className="contact-nav">
          <div className="contact-home">
            <HomeIconComponent />
            India
          </div>
          <div className="contact-home">
            <a className="email-link" href="mailto:Gamesupport@Gridlogic.in">
              <MailIconComponent /> {record?.email}
            </a>
          </div>
          <div className="contact-home">
            <GlobalIconComponent />
            <div onClick={() => (window.location.href = record?.website)} role="button">
              {record?.websiteName}
            </div>
          </div>
          <div className="contact-home">ID: {record?.companyId}</div>
          <div className="contact-home">
            <ShareComponent />
          </div>
        </div>
      </div>
      <div className="detail-nav">
        <Tabs
          activeKey={activeLink}
          onChange={(key) => handleLinkClick(key)}
          tabBarGutter={12}
          moreIcon={
            <span className="more-tabs">More...</span>
          }
        >
          {tabs.map((tab) => (
            <Tabs.TabPane
              tab={
                <Link
                  to={`/supplier/${id}/${tab.name}`}
                  className={activeLink === tab.name ? "active" : ""}
                >
                  {tab.label}
                </Link>
              }
              key={tab.name}
            />
          ))}
        </Tabs>
      </div>
    </>
  );
};

export default NavBar;
