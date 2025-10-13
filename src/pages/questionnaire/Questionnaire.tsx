import React, { useEffect, useState } from "react";
import { Card, Input, List, Modal, Progress, Space, Table, Tooltip, Upload, message,DatePicker,Radio } from "antd";
import { ArrowLeftOutlined, CheckOutlined, CopyTwoTone, DeleteOutlined, FileAddTwoTone,DownloadOutlined, UnorderedListOutlined, EditOutlined } from "@ant-design/icons";
import CustomButton from "../../component/buttons/CustomButton";
import { allCategories, data } from "../../utils/Options";
import { bgColor, primaryColor } from '../../style/ColorCode';
import "./Questionnaire.scss";
import SelectDropDown from "../../component/select/SelectDropDown";
import Loader from "../../component/loader/Loader";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import { stringify } from "node:querystring";





const { TextArea } = Input;
const columns: any = [
    {
        title: "Section",
        dataIndex: "quesSection",
        key: "section",
        sorter: false,
        render: (text: string) => <span className="supplier-name">{text}</span>,
    },
    {
        title: "Questions Answered / Total",
        dataIndex: "questionsAnswer",
        key: "questionsAnswer",
        sorter: false,
        align: "center",
    },
    {
        title: "Percent Complete",
        dataIndex: "percentComplete",
        key: "percentComplete",
        sorter: false,
        align: "center",
        render: (percentComplete: number) => `${percentComplete}%`
    },

        {
      title: "Actions",
      key: "actions",
      render: (index: number, record: any) => (
        <Tooltip
          color={bgColor}
          trigger={'click'}
          placement="leftBottom"
          className="custom-tooltip"
          title={
            <div className="menu-options">
              <div className="menu-item" role="button" >
                <UnorderedListOutlined className="list-icon" />
                <div>View details</div>
              </div>
              <div className="menu-item" role="button" >
                <EditOutlined className="edit-icon" />
                <div>Edit item</div>
              </div>
              <div className="menu-item" role="button">
                <DeleteOutlined className="delete-icon" />
                <div>Delete item </div>
              </div>
              <div className="menu-item" role="button">
                <DownloadOutlined className="delete-icon" />
                <div>Download pdf</div>
              </div>
            </div>
          
          }>

          <div className="action-menu">
            <span
              className="three-dot-menu"
            // onClick={() => handleMenuClick(record.key)}
            >
              •••
            </span>
          </div>
        </Tooltip>
      ),
    },

];

const Questionnaire: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string>("general");
    const [showQuestions, setShowQuestions] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [answers, setAnswers] = useState<{ [key: string]: any }>({});
    const [write, setWrite] = useState<{ [key: string]: any }>({});
    const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: { name: string; size: string } | null }>({});
    const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0);
    const [isViewMode, setIsViewMode] = useState(false);
    const [singleSectionTextArea, setsingleSectionTextArea] = useState<any>();
    const [trust, setTrust] = useState<boolean>(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [isUnsavedModalVisible, setIsUnsavedModalVisible] = useState(false);
    const [pendingAction, setPendingAction] = useState<() => void | null>();
    const [submittedAnswers, setSubmittedAnswers] = useState<Record<string, boolean>>({});
    const [extractFill,setExtractFill]= useState<{ [key: string]: any }>({});
    const location = useLocation();

    const editresponse=location.state?.data;
    const editboolean=location.state?.edit;
    const reportname=location.state?.reportname;



    


    const extractQA= (data: { [key: string]: any },section:string,key:string,questionIndex:number) => {
    const TitanKey = `${section}-${key}-${questionIndex}`;
    setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [TitanKey]: "value",
    }));
};



     console.log(editresponse,typeof(editresponse))



    const editanswers={
        // "general-company-overview-0":editresponse["Report name"],
        // "general-company-overview-1":editresponse["Date"],
        // "general-company-overview-2":editresponse["industry"],
        // "general-company-overview-3":editresponse["Email"],
        // "general-company-overview-4":editresponse["Contact No"],
        // "general-company-overview-5":editresponse["What is the legal name of the company"],
        "general-company-overview-0":"suman",
        "general-company-overview-1":"2133",
        "general-company-overview-2":"dwcdcdc",
        "general-company-overview-3":"crrvvv",
        "general-company-overview-4":"vrevevevev",
        "general-company-overview-5":"vrveveveve",
        "general-company-overview-6":editresponse["What year was the company founded"],
        "general-company-overview-7":editresponse["Where is the company headquartered"],
        "general-company-overview-8":editresponse["How many locations/offices does the company operate in"],
        "general-company-overview-9":editresponse["What is the organizational structure of the company"],
        "general-company-overview-10":editresponse["How many employees does the company currently have"],
        "general-company-overview-11":editresponse["What are the company’s primary business activities"],
        "general-company-overview-12":editresponse["In which industries or sectors does the company operate"],
        "general-company-overview-13":editresponse["What are the company’s core products or services"],
        "general-business-operations-0":editresponse["What are the primary markets/geographies the company serves"],
        "general-business-operations-1":editresponse["What is the company’s annual revenue or turnover"],
        "general-business-operations-2":editresponse["How is the company funded"],
        "general-business-operations-3":editresponse["What percentage of the company’s operations are automated"],
        "general-business-operations-4":editresponse["What is the company’s supply chain structure"],
        "general-business-operations-5":editresponse["How does the company ensure quality control of its products/services"],
        "general-business-operations-6":editresponse["Does the company outsource any major business operations"],
        "general-clients-partnerships-0":editresponse["Who are the company’s main customers (B2B, B2C, etc.)"],
        "general-clients-partnerships-1":editresponse["Does the company have strategic partnerships or collaborations"],
        "general-clients-partnerships-2":editresponse["What percentage of revenue comes from the top 5 customers"],
        "general-clients-partnerships-3":editresponse["What is the customer retention rate over the past 3 years"],
        "general-technology-innovation-0":editresponse["What key technologies does the company use to operate its business"],
        "general-technology-innovation-1":editresponse["Does the company invest in R&D (Research & Development)"],
        "general-technology-innovation-2":editresponse["How often does the company upgrade its systems or processes"],
        "general-risk-business-continuity-0":editresponse["Does the company have a business continuity or disaster recovery plan"],
        "general-risk-business-continuity-1":editresponse["What are the major risks the company faces in operations"],
        "general-risk-business-continuity-2":editresponse["Does the company have insurance coverage for its key risks"],
        "general-company-growth-0":editresponse["What has been the average revenue growth rate over the past 5 years"],
        "general-company-growth-1":editresponse["Are there plans for company expansion (new locations, products, etc.)"],
        "general-workforce-0":editresponse["How is the workforce divided by function (operations, sales, admin)"],
        "general-workforce-1":editresponse["What is the company’s attrition rate for the past 3 years"],
        "general-workforce-2":editresponse["How does the company attract and retain talent"],
        "supplierbenchmark-esg-policies-governance-0":editresponse["Do you have a formal Environmental, Social, and Governance (ESG) policy"],
        "supplierbenchmark-esg-policies-governance-1":editresponse["Is your ESG policy aligned with global standards Like"],
        "supplierbenchmark-esg-policies-governance-2":editresponse["How often is the ESG policy reviewed and updated"],
        "supplierbenchmark-esg-policies-governance-3":editresponse["How do you communicate ESG policies to internal and external stakeholders"],
        "supplierbenchmark-risk-screening-0":editresponse["Do you have a sustainability risk assessment process for suppliers"],
        "supplierbenchmark-risk-screening-1":editresponse["Are suppliers categorized based on sustainability risk levels (high, medium, low)"],
        "supplierbenchmark-risk-screening-2":editresponse["What are the most significant sustainability risks across your supplier base"],
        "supplierbenchmark-risk-screening-3":editresponse["How frequently are high-risk suppliers monitored for compliance and improvements"],
        "supplierbenchmark-certification-compliance-0":editresponse["Does your company hold any recognized environmental certifications"],
        "supplierbenchmark-certification-compliance-1":editresponse["Does your company hold any social certifications"],
        "supplierbenchmark-certification-compliance-2":editresponse["Does your company adhere to any sustainability reporting or management standards"],
        "supplierbenchmark-certification-compliance-3":editresponse["Does your company hold any governance or supply chain certifications"],
        "supplierbenchmark-certification-compliance-4":editresponse["How often are you audited for compliance with these certifications"],
        "supplierbenchmark-certification-compliance-5":editresponse["Are there any additional certifications you are pursuing If yes, please apply."],
        "supplierbenchmark-sustainbility-performance-0":editresponse["Do you provide annual sustainability performance reports"],
        "supplierbenchmark-sustainbility-performance-1":editresponse["What KPIs do you use to measure your sustainability performance"],
        "supplierbenchmark-sustainbility-performance-2":editresponse["How transparent are you about your sustainability progress and challenges"],
        "supplierbenchmark-collabration-innovation-0":editresponse["Do you engage in sustainability innovation (e.g., circular economy, low-carbon products)"],
        "supplierbenchmark-collabration-innovation-1":editresponse["What challenges do you face in improving sustainability performance"],
        "performance-cdp-score-0":editresponse["What is your current CDP score for Climate Change"],
        "performance-cdp-score-1":editresponse["What is your current CDP score for Water"],
        "performance-cdp-score-2":editresponse["What is your current CDP score for Forests"],
        "product-supply-product-0":editresponse["How many products have undergone a carbon footprint assessment"],
        "product-supply-product-1":editresponse["What is the product name, type, and function"],
        "product-supply-product-2":editresponse["What is the weight or volume of the product (kg/L)"],
        "product-supply-product-3":editresponse["What is the declared carbon footprint of the product (kg CO2e)"],
        "product-supply-product-4":editresponse["What raw materials are used in production"],
        "product-supply-product-5":editresponse["Provide % of raw materials sourced locally, regionally, and internationally."],
        "product-supply-product-6":editresponse["What is the embodied carbon of the raw materials (kg CO2e) used in the product"],
        "product-supply-product-7":editresponse["Are suppliers certified for sustainable practices"],
        "product-supply-product-8":editresponse["Do suppliers disclose their carbon footprint data "],
        "product-supply-product-9":editresponse["What is the average transport distance for raw materials and finished goods (km)"],
        "product-supply-product-10":editresponse["Are logistics providers certified for sustainability "],
        "product-supply-product-11":editresponse["What is the total energy consumption (kWh) during production"],
        "product-supply-product-12":editresponse["What percentage of energy used during production comes from renewable sources"],
        "product-supply-product-13":editresponse["Are emissions mitigation technologies employed"],
        "product-supply-product-14":editresponse["What emissions are associated with end-of-life processes (kg CO2e)"],
        "governace-certification-0":editresponse["Does your company hold an ISO 14001 certification for environmental management"],
        "governace-certification-1":editresponse["Has your company obtained any other environmental management system certifications, eg EMAS (Eco-Management and Audit Scheme) "],
        "governace-certification-2":editresponse["Does your company hold an ISO 50001 certification for energy management"],
        "governace-certification-3":editresponse["Has your company obtained any other energy-related certifications/framework (e.g., IPMVP – International Performance Measurement and Verification Protocol)"],
        "management-system-management-0":editresponse["Does your company have a formal environmental policy that includes a commitment to legal compliance, continuous measurement, and continuous improvement in environmental performance"],
        "management-system-management-1":editresponse["Which of the following areas are included in your environmental policy"],
        "management-system-management-2":editresponse["Does your company organize training for employees on the environmental policy"],
        "management-system-management-3":editresponse["Does your site have an environmental management system (EMS) in place"],
        "management-system-management-4":editresponse["Does your site have an energy management system (EnMS) in place"],
        "management-system-monitoring-0":editresponse["What percentage of electricity used at your site in the last calendar year came from renewable sources"],
        "management-system-monitoring-1":editresponse["What percentage of heating/cooling used at your site in the last calendar year came from renewable sources"],
        "emissions-waste-ghg-reporting-standards-methodology-0":editresponse["What is the base year selected for your GHG inventory"],
        "emissions-waste-ghg-reporting-standards-methodology-1":editresponse["Which standard, protocol, or methodology has been applied to collect activity data and calculate emissions"],
        "emissions-waste-ghg-reporting-standards-methodology-2":editresponse["Has a documented framework been established to define operational and organizational boundaries for emissions reporting"],
        "emissions-waste-emissions-w-0":editresponse["What were your gross Scope 1 GHG emissions (in metric tons CO₂-equivalent) for the last reporting year"],
        "emissions-waste-emissions-w-1":editresponse["What percentage of your Scope 1 emissions comes from stationary combustion, transportation, or fugitive sources"],
        "emissions-waste-emissions-w-2":editresponse["Which gases were included in your Scope 1 emissions calculations"],
        "emissions-waste-emissions-w-3":editresponse["What were your gross Scope 2 emissions (in metric tons CO₂-equivalent) using the location-based method"],
        "emissions-waste-emissions-w-4":editresponse["If applicable, what were your gross Scope 2 emissions (in metric tons CO₂-equivalent) using the market-based method"],
        "emissions-waste-supply-chain-emissions-0":editresponse["What were your Scope 3 emissions (Supply Chain) in the last reporting period (please provide details in tCO2e for each)"],
        "emissions-waste-supply-chain-emissions-1":editresponse["How many Scope 3 categories (out of 15) do you currently report"],
        "emissions-waste-supply-chain-emissions-2":editresponse["What percentage of your Scope 3 data is based on primary data from suppliers/customers versus estimated data"],
        "emissions-waste-supply-chain-emissions-3":editresponse["Which three Scope 3 categories contribute the most to your emissions"],
        "emissions-waste-upstream-categories-0":editresponse["What are your emissions from purchased goods and services (Scope 3, Category 1) in metric tons CO₂-equivalent"],
        "emissions-waste-upstream-categories-1":editresponse["What percentage of your suppliers (by spend) provide emissions data (Scope 3, Category 1)"],
        "emissions-waste-upstream-categories-2":editresponse["What are your emissions from capital goods (Scope 3, Category 2) in metric tons CO₂-equivalent"],
        "emissions-waste-upstream-categories-3":editresponse["Do you conduct lifecycle assessments for your major capital goods (Scope 3, Category 2)"],
        "emissions-waste-upstream-categories-4":editresponse["What are your emissions from upstream fuel and energy-related activities (Scope 3, Category 3) in metric tons CO₂-equivalent"],
        "emissions-waste-upstream-categories-5":editresponse["What are your emissions from transporting goods to your facilities (Scope 3, Category 4) in metric tons CO₂-equivalent"],
        "emissions-waste-upstream-categories-6":editresponse["What percentage of logistics providers use low-emission transportation methods (Scope 3, Category 4), such as EVs or rail "],
        "emissions-waste-upstream-categories-7":editresponse["What are your emissions from waste management (Scope 3, Category 5) in metric tons CO₂-equivalent "],
        "emissions-waste-upstream-categories-8":editresponse["What percentage of your soperational waste is recycled or composted (Scope 3, Category 5) "],
        "emissions-waste-upstream-categories-9":editresponse["What are your emissions from business travel (Scope 3, Category 6) in metric tons CO₂-equivalent"],
        "emissions-waste-upstream-categories-10":editresponse["What are your emissions from employee commuting (Scope 3, Category 7) in metric tons CO₂-equivalent"],
        "emissions-waste-upstream-categories-11":editresponse["What are your emissions from upstream leased assets (Scope 3, Category 8) in metric tons CO₂-equivalent"],
        "emissions-waste-downstream-categories-0":editresponse["What are your emissions from product distribution to customers (Scope 3, Category 9) in metric tons CO₂-equivalent"],
        "emissions-waste-downstream-categories-1":editresponse["What percentage of your transportation partners use low-carbon technologies (Scope 3, Category 9)"],
        "emissions-waste-downstream-categories-2":editresponse["What are your emissions from the processing of sold products (Scope 3, Category 10) in metric tons CO₂-equivalent"],
        "emissions-waste-downstream-categories-3":editresponse["What are the lifetime emissions (Scope 3, Category 11) from the use of your sold products in metric tons CO₂-equivalent"],
        "emissions-waste-downstream-categories-4":editresponse["What are your emissions from the disposal or recycling of your sold products (Scope 3, Category 12) in metric tons CO₂-equivalent"],
        "emissions-waste-downstream-categories-5":editresponse["What are your emissions from franchise operations (Scope 3, Category 14) in metric tons CO₂-equivalent"],
        "emissions-waste-downstream-categories-6":editresponse["What are your emissions from franchise operations (Scope 3, Category 14) in metric tons CO₂-equivalent"],
        "emissions-waste-downstream-categories-7":editresponse["What percentage of your franchises report emissions data (Scope 3, Category 14)"],
        "emissions-waste-downstream-categories-8":editresponse["What are your emissions from investment activities (Scope 3, Category 15) in metric tons CO₂-equivalent"],
        "emissions-waste-downstream-categories-9":editresponse["What percentage of your investment portfolio is assessed for GHG emissions (Scope 3, Category 15)"],
        "emissions-waste-exclusion-0":editresponse["What is the source of excluded emissions, and why are they excluded from the organization’s carbon accounting"],
        "emissions-waste-exclusion-1":editresponse["Which Scope(s) or Scope 3 categories do these excluded emissions belong to"],
        "emissions-waste-ghg-reduction-targets-0":editresponse["Does your company set Greenhouse Gas (GHG) reduction targets"],
        "emissions-waste-ghg-reduction-targets-1":editresponse["Have you implemented energy efficiency measures to reduce Scope 2 emissions If so, what is the percentage reduction achieved"],
        "emissions-waste-ghg-reduction-targets-2":editresponse["Are the GHG reduction targets approved by the Science Based Targets Initiative (SBTi)"],
        "emissions-waste-ghg-reduction-targets-3":editresponse["Does your company have emission reduction targets for your upstream supply chain emissions (Scope 3)"],
        "emissions-waste-ghg-emissions-data-andanalys-0":editresponse["Describe your gross global combined Scope 1 and 2 emissions for the reporting year in metric tons CO2e per unit currency total revenue. Include any additional intensity metrics relevant to your operations. "],
        "emissions-waste-ghg-emissions-data-andanalys-1":editresponse["Is your organization able to break down emissions data for any subsidiaries included in your CDP response"],
        "emissions-waste-ghg-emissions-data-andanalys-2":editresponse["Provide a breakdown of gross Scope 1 and Scope 2 emissions by subsidiary"],
        "emissions-waste-ghg-emissions-data-andanalys-3":editresponse["How do your gross global emissions (Scope 1, &2 combined) for the reporting year compare to the previous reporting year"],
        "emissions-waste-resource-management-0":editresponse["What restricted substances are used at your site in production or operations"],
        "emissions-waste-resource-management-1":editresponse["Do you have protocols in place to manage restricted substances"],
        "emissions-waste-resource-management-2":editresponse["Which regulations are covered by your site’s written procedures for managing restricted substances"],
        "emissions-waste-Waste-0":editresponse["Does your organization have a comprehensive Waste Management Plan covering construction waste, hazardous waste, wastewater, solid waste, and airborne emissions Provide evidence of past experience in managing and recycling construction waste."],
        "emissions-waste-Waste-1":editresponse["Are systematic checks conducted to confirm the conformity of waste with the transfer note description (e.g., nature, volume, hazardousness)"],
        "emissions-waste-Waste-2":editresponse["Is compliance with the ADR (European Agreement concerning the International Carriage of Dangerous Goods by Road) agreement (road transport of hazardous goods) ensured"],
        "emissions-waste-Waste-3":editresponse["What is the total weight of hazardous waste generated in tons"],
        "emissions-waste-Waste-4":editresponse["What is the total weight of non-hazardous waste generated in tons"],
        "emissions-waste-Waste-5":editresponse["Provide the total weight of other waste types, including electronic waste, organic waste, and recyclable materials, if applicable."],
        "emissions-waste-biodiversity-0":editresponse["Does your organization have a policy in place for protecting biodiversity and natural resources"],
        "emissions-waste-biodiversity-1":editresponse["Is there oversight or responsibility for biodiversity matters at the board or executive management level within the organization"],
        "emissions-waste-biodiversity-2":editresponse["Has your organization publicly committed to biodiversity initiatives or endorsed any related programs"],
        "emissions-waste-biodiversity-3":editresponse["Does your organization evaluate the impacts and dependencies of its value chain on biodiversity"],
        "emissions-waste-biodiversity-4":editresponse["Are any organizational activities located in or near biodiversity-sensitive areas during the reporting year If yes, provide details of these activities."],
        "emissions-waste-biodiversity-5":editresponse["Does your organization use biodiversity indicators to monitor and evaluate performance across its operations"],
        "emissions-waste-biodiversity-6":editresponse["Does  your organization’s operations negatively impact biodiversity or natural habitats"],
        "emissions-waste-Energy -0":editresponse["What is the total consumption of purchased electricity (in MWh) during the reporting period"],
        "emissions-waste-Energy -1":editresponse["What is the total consumption of self-generated electricity (in MWh) during the reporting period"],
        "emissions-waste-Energy -2":editresponse["Is this electricity consumption excluded from your RE100 commitment"],
        "emissions-waste-Energy -3":editresponse["What is the total consumption of purchased heat, steam, and cooling (in MWh) during the reporting period"],
        "emissions-waste-Energy -4":editresponse["What is the total consumption of self-generated heat, steam, and cooling (in MWh) during the reporting period"],
        "emissions-waste-Energy -5":editresponse["What is the total heating value (in MWh) for your organization's energy consumption"],
        "emissions-waste-Energy -6":editresponse["How much energy (in MWh) was consumed from renewable sources during the reporting period"],
        "emissions-waste-Energy -7":editresponse["How much energy (in MWh) was consumed from non-renewable sources during the reporting period"],
        "carbon-cdp-0":editresponse["Did your organization cancel any project-based carbon credits during the reporting year"],
        "carbon-cdp-1":editresponse["Can you provide details of the project-based carbon credits your organization canceled during the reporting year"],
        "carbon-cdp-2":editresponse["Did your organization cancel any Renewable Energy Certificates (RECs) during the reporting year"],
        "carbon-cdp-3":editresponse["Can you provide details of the Renewable Energy Certificates (RECs) your organization canceled during the reporting years"],
        "carbon-cdp-4":editresponse["Does your organization implement an internal carbon pricing mechanism"],
        "carbon-cdp-5":editresponse["How does your organization utilize internal carbon pricing in its operations and decision-making processes"],            
    }








useEffect(() => {
  if (editanswers && Object.keys(editanswers).length > 0) {
    setAnswers(editanswers);
  }
}, []); 

console.log(editanswers)


// setAnswers(editanswers)
// useEffect(() => {
//   if (Object.keys(editanswers).length > 0) {
//     setAnswers(editanswers);
//   }
// }, [editanswers]);

// useEffect(() => {
//   if (Object.keys(editanswers).length > 0) {
//     setAnswers(editanswers);
//   }
// }, [editanswers]);


    const handleRowClick = (record: any, sectionIndex: number) => {
        

        setShowQuestions(true);
        setCurrentSectionIndex(sectionIndex);
    };


    const confirmNavigation = (action: () => void) => {
        if (hasUnsavedChanges && showQuestions) {
            setPendingAction(() => action);
            setIsUnsavedModalVisible(true);
        } else {
            action();
        }
    };


    const handleBackToCategories = () => {
        confirmNavigation(() => {
            const savedAnswers = localStorage.getItem('answeredQuestions');
            if (savedAnswers) {
                setAnswers(JSON.parse(savedAnswers));
            }
            setActiveCategory(activeCategory || "");
            setShowQuestions(false);
            setCurrentSectionIndex(0);
            handleClearUnsubmittedAnswers()
        });

    };

    const handleNextSection = () => {
        setCurrentSectionIndex((prev) => Math.min(prev + 1, allCategories[0].questions.length - 1));
    };

    const handlePreviousSection = () => {
        setCurrentSectionIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleInputChange = (section: string, key: string, value: any, questionIndex: number,question:string) => {
        

        const questionKey = `${section}-${key}-${questionIndex}`;
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionKey]: value,
        }));
        setWrite((prevWrite) => ({
            ...prevWrite,
            // [questionKey]: value,
            [question]: value,

        }));

        setHasUnsavedChanges(answers[questionKey] === "" ? false : true);
    };



    const readed={
        "general-company-overview-0":extractFill["Report name"],
        "general-company-overview-1":extractFill["Date"],
        "general-company-overview-2":extractFill["industry"],
        "general-company-overview-3":extractFill["Email"],
        "general-company-overview-4":extractFill["Contact No"],
        "general-company-overview-5":extractFill["What is the legal name of the company"],
        "general-company-overview-6":extractFill["What year was the company founded"],
        "general-company-overview-7":extractFill["Where is the company headquartered"],
        "general-company-overview-8":extractFill["How many locations/offices does the company operate in"],
        "general-company-overview-9":extractFill["What is the organizational structure of the company"],
        "general-company-overview-10":extractFill["How many employees does the company currently have"],
        "general-company-overview-11":extractFill["What are the company’s primary business activities"],
        "general-company-overview-12":extractFill["In which industries or sectors does the company operate"],
        "general-company-overview-13":extractFill["What are the company’s core products or services"],
        "general-business-operations-0":extractFill["What are the primary markets/geographies the company serves"],
        "general-business-operations-1":extractFill["What is the company’s annual revenue or turnover"],
        "general-business-operations-2":extractFill["How is the company funded"],
        "general-business-operations-3":extractFill["What percentage of the company’s operations are automated"],
        "general-business-operations-4":extractFill["What is the company’s supply chain structure"],
        "general-business-operations-5":extractFill["How does the company ensure quality control of its products/services"],
        "general-business-operations-6":extractFill["Does the company outsource any major business operations"],
        "general-clients-partnerships-0":extractFill["Who are the company’s main customers (B2B, B2C, etc.)"],
        "general-clients-partnerships-1":extractFill["Does the company have strategic partnerships or collaborations"],
        "general-clients-partnerships-2":extractFill["What percentage of revenue comes from the top 5 customers"],
        "general-clients-partnerships-3":extractFill["What is the customer retention rate over the past 3 years"],
        "general-technology-innovation-0":extractFill["What key technologies does the company use to operate its business"],
        "general-technology-innovation-1":extractFill["Does the company invest in R&D (Research & Development)"],
        "general-technology-innovation-2":extractFill["How often does the company upgrade its systems or processes"],
        "general-risk-business-continuity-0":extractFill["Does the company have a business continuity or disaster recovery plan"],
        "general-risk-business-continuity-1":extractFill["What are the major risks the company faces in operations"],
        "general-risk-business-continuity-2":extractFill["Does the company have insurance coverage for its key risks"],
        "general-company-growth-0":extractFill["What has been the average revenue growth rate over the past 5 years"],
        "general-company-growth-1":extractFill["Are there plans for company expansion (new locations, products, etc.)"],
        "general-workforce-0":extractFill["How is the workforce divided by function (operations, sales, admin)"],
        "general-workforce-1":extractFill["What is the company’s attrition rate for the past 3 years"],
        "general-workforce-2":extractFill["How does the company attract and retain talent"],
        "supplierbenchmark-esg-policies-governance-0":extractFill["Do you have a formal Environmental, Social, and Governance (ESG) policy"],
        "supplierbenchmark-esg-policies-governance-1":extractFill["Is your ESG policy aligned with global standards Like"],
        "supplierbenchmark-esg-policies-governance-2":extractFill["How often is the ESG policy reviewed and updated"],
        "supplierbenchmark-esg-policies-governance-3":extractFill["How do you communicate ESG policies to internal and external stakeholders"],
        "supplierbenchmark-risk-screening-0":extractFill["Do you have a sustainability risk assessment process for suppliers"],
        "supplierbenchmark-risk-screening-1":extractFill["Are suppliers categorized based on sustainability risk levels (high, medium, low)"],
        "supplierbenchmark-risk-screening-2":extractFill["What are the most significant sustainability risks across your supplier base"],
        "supplierbenchmark-risk-screening-3":extractFill["How frequently are high-risk suppliers monitored for compliance and improvements"],
        "supplierbenchmark-certification-compliance-0":extractFill["Does your company hold any recognized environmental certifications"],
        "supplierbenchmark-certification-compliance-1":extractFill["Does your company hold any social certifications"],
        "supplierbenchmark-certification-compliance-2":extractFill["Does your company adhere to any sustainability reporting or management standards"],
        "supplierbenchmark-certification-compliance-3":extractFill["Does your company hold any governance or supply chain certifications"],
        "supplierbenchmark-certification-compliance-4":extractFill["How often are you audited for compliance with these certifications"],
        "supplierbenchmark-certification-compliance-5":extractFill["Are there any additional certifications you are pursuing If yes, please apply."],
        "supplierbenchmark-sustainbility-performance-0":extractFill["Do you provide annual sustainability performance reports"],
        "supplierbenchmark-sustainbility-performance-1":extractFill["What KPIs do you use to measure your sustainability performance"],
        "supplierbenchmark-sustainbility-performance-2":extractFill["How transparent are you about your sustainability progress and challenges"],
        "supplierbenchmark-collabration-innovation-0":extractFill["Do you engage in sustainability innovation (e.g., circular economy, low-carbon products)"],
        "supplierbenchmark-collabration-innovation-1":extractFill["What challenges do you face in improving sustainability performance"],
        "performance-cdp-score-0":extractFill["What is your current CDP score for Climate Change"],
        "performance-cdp-score-1":extractFill["What is your current CDP score for Water"],
        "performance-cdp-score-2":extractFill["What is your current CDP score for Forests"],
        "product-supply-product-0":extractFill["How many products have undergone a carbon footprint assessment"],
        "product-supply-product-1":extractFill["What is the product name, type, and function"],
        "product-supply-product-2":extractFill["What is the weight or volume of the product (kg/L)"],
        "product-supply-product-3":extractFill["What is the declared carbon footprint of the product (kg CO2e)"],
        "product-supply-product-4":extractFill["What raw materials are used in production"],
        "product-supply-product-5":extractFill["Provide % of raw materials sourced locally, regionally, and internationally."],
        "product-supply-product-6":extractFill["What is the embodied carbon of the raw materials (kg CO2e) used in the product"],
        "product-supply-product-7":extractFill["Are suppliers certified for sustainable practices"],
        "product-supply-product-8":extractFill["Do suppliers disclose their carbon footprint data "],
        "product-supply-product-9":extractFill["What is the average transport distance for raw materials and finished goods (km)"],
        "product-supply-product-10":extractFill["Are logistics providers certified for sustainability "],
        "product-supply-product-11":extractFill["What is the total energy consumption (kWh) during production"],
        "product-supply-product-12":extractFill["What percentage of energy used during production comes from renewable sources"],
        "product-supply-product-13":extractFill["Are emissions mitigation technologies employed"],
        "product-supply-product-14":extractFill["What emissions are associated with end-of-life processes (kg CO2e)"],
        "governace-certification-0":extractFill["Does your company hold an ISO 14001 certification for environmental management"],
        "governace-certification-1":extractFill["Has your company obtained any other environmental management system certifications, eg EMAS (Eco-Management and Audit Scheme) "],
        "governace-certification-2":extractFill["Does your company hold an ISO 50001 certification for energy management"],
        "governace-certification-3":extractFill["Has your company obtained any other energy-related certifications/framework (e.g., IPMVP – International Performance Measurement and Verification Protocol)"],
        "management-system-management-0":extractFill["Does your company have a formal environmental policy that includes a commitment to legal compliance, continuous measurement, and continuous improvement in environmental performance"],
        "management-system-management-1":extractFill["Which of the following areas are included in your environmental policy"],
        "management-system-management-2":extractFill["Does your company organize training for employees on the environmental policy"],
        "management-system-management-3":extractFill["Does your site have an environmental management system (EMS) in place"],
        "management-system-management-4":extractFill["Does your site have an energy management system (EnMS) in place"],
        "management-system-monitoring-0":extractFill["What percentage of electricity used at your site in the last calendar year came from renewable sources"],
        "management-system-monitoring-1":extractFill["What percentage of heating/cooling used at your site in the last calendar year came from renewable sources"],
        "emissions-waste-ghg-reporting-standards-methodology-0":extractFill["What is the base year selected for your GHG inventory"],
        "emissions-waste-ghg-reporting-standards-methodology-1":extractFill["Which standard, protocol, or methodology has been applied to collect activity data and calculate emissions"],
        "emissions-waste-ghg-reporting-standards-methodology-2":extractFill["Has a documented framework been established to define operational and organizational boundaries for emissions reporting"],
        "emissions-waste-emissions-w-0":extractFill["What were your gross Scope 1 GHG emissions (in metric tons CO₂-equivalent) for the last reporting year"],
        "emissions-waste-emissions-w-1":extractFill["What percentage of your Scope 1 emissions comes from stationary combustion, transportation, or fugitive sources"],
        "emissions-waste-emissions-w-2":extractFill["Which gases were included in your Scope 1 emissions calculations"],
        "emissions-waste-emissions-w-3":extractFill["What were your gross Scope 2 emissions (in metric tons CO₂-equivalent) using the location-based method"],
        "emissions-waste-emissions-w-4":extractFill["If applicable, what were your gross Scope 2 emissions (in metric tons CO₂-equivalent) using the market-based method"],
        "emissions-waste-supply-chain-emissions-0":extractFill["What were your Scope 3 emissions (Supply Chain) in the last reporting period (please provide details in tCO2e for each)"],
        "emissions-waste-supply-chain-emissions-1":extractFill["How many Scope 3 categories (out of 15) do you currently report"],
        "emissions-waste-supply-chain-emissions-2":extractFill["What percentage of your Scope 3 data is based on primary data from suppliers/customers versus estimated data"],
        "emissions-waste-supply-chain-emissions-3":extractFill["Which three Scope 3 categories contribute the most to your emissions"],
        "emissions-waste-upstream-categories-0":extractFill["What are your emissions from purchased goods and services (Scope 3, Category 1) in metric tons CO₂-equivalent"],
        "emissions-waste-upstream-categories-1":extractFill["What percentage of your suppliers (by spend) provide emissions data (Scope 3, Category 1)"],
        "emissions-waste-upstream-categories-2":extractFill["What are your emissions from capital goods (Scope 3, Category 2) in metric tons CO₂-equivalent"],
        "emissions-waste-upstream-categories-3":extractFill["Do you conduct lifecycle assessments for your major capital goods (Scope 3, Category 2)"],
        "emissions-waste-upstream-categories-4":extractFill["What are your emissions from upstream fuel and energy-related activities (Scope 3, Category 3) in metric tons CO₂-equivalent"],
        "emissions-waste-upstream-categories-5":extractFill["What are your emissions from transporting goods to your facilities (Scope 3, Category 4) in metric tons CO₂-equivalent"],
        "emissions-waste-upstream-categories-6":extractFill["What percentage of logistics providers use low-emission transportation methods (Scope 3, Category 4), such as EVs or rail "],
        "emissions-waste-upstream-categories-7":extractFill["What are your emissions from waste management (Scope 3, Category 5) in metric tons CO₂-equivalent "],
        "emissions-waste-upstream-categories-8":extractFill["What percentage of your soperational waste is recycled or composted (Scope 3, Category 5) "],
        "emissions-waste-upstream-categories-9":extractFill["What are your emissions from business travel (Scope 3, Category 6) in metric tons CO₂-equivalent"],
        "emissions-waste-upstream-categories-10":extractFill["What are your emissions from employee commuting (Scope 3, Category 7) in metric tons CO₂-equivalent"],
        "emissions-waste-upstream-categories-11":extractFill["What are your emissions from upstream leased assets (Scope 3, Category 8) in metric tons CO₂-equivalent"],
        "emissions-waste-downstream-categories-0":extractFill["What are your emissions from product distribution to customers (Scope 3, Category 9) in metric tons CO₂-equivalent"],
        "emissions-waste-downstream-categories-1":extractFill["What percentage of your transportation partners use low-carbon technologies (Scope 3, Category 9)"],
        "emissions-waste-downstream-categories-2":extractFill["What are your emissions from the processing of sold products (Scope 3, Category 10) in metric tons CO₂-equivalent"],
        "emissions-waste-downstream-categories-3":extractFill["What are the lifetime emissions (Scope 3, Category 11) from the use of your sold products in metric tons CO₂-equivalent"],
        "emissions-waste-downstream-categories-4":extractFill["What are your emissions from the disposal or recycling of your sold products (Scope 3, Category 12) in metric tons CO₂-equivalent"],
        "emissions-waste-downstream-categories-5":extractFill["What are your emissions from franchise operations (Scope 3, Category 14) in metric tons CO₂-equivalent"],
        "emissions-waste-downstream-categories-6":extractFill["What are your emissions from franchise operations (Scope 3, Category 14) in metric tons CO₂-equivalent"],
        "emissions-waste-downstream-categories-7":extractFill["What percentage of your franchises report emissions data (Scope 3, Category 14)"],
        "emissions-waste-downstream-categories-8":extractFill["What are your emissions from investment activities (Scope 3, Category 15) in metric tons CO₂-equivalent"],
        "emissions-waste-downstream-categories-9":extractFill["What percentage of your investment portfolio is assessed for GHG emissions (Scope 3, Category 15)"],
        "emissions-waste-exclusion-0":extractFill["What is the source of excluded emissions, and why are they excluded from the organization’s carbon accounting"],
        "emissions-waste-exclusion-1":extractFill["Which Scope(s) or Scope 3 categories do these excluded emissions belong to"],
        "emissions-waste-ghg-reduction-targets-0":extractFill["Does your company set Greenhouse Gas (GHG) reduction targets"],
        "emissions-waste-ghg-reduction-targets-1":extractFill["Have you implemented energy efficiency measures to reduce Scope 2 emissions If so, what is the percentage reduction achieved"],
        "emissions-waste-ghg-reduction-targets-2":extractFill["Are the GHG reduction targets approved by the Science Based Targets Initiative (SBTi)"],
        "emissions-waste-ghg-reduction-targets-3":extractFill["Does your company have emission reduction targets for your upstream supply chain emissions (Scope 3)"],
        "emissions-waste-ghg-emissions-data-andanalys-0":extractFill["Describe your gross global combined Scope 1 and 2 emissions for the reporting year in metric tons CO2e per unit currency total revenue. Include any additional intensity metrics relevant to your operations. "],
        "emissions-waste-ghg-emissions-data-andanalys-1":extractFill["Is your organization able to break down emissions data for any subsidiaries included in your CDP response"],
        "emissions-waste-ghg-emissions-data-andanalys-2":extractFill["Provide a breakdown of gross Scope 1 and Scope 2 emissions by subsidiary"],
        "emissions-waste-ghg-emissions-data-andanalys-3":extractFill["How do your gross global emissions (Scope 1, &2 combined) for the reporting year compare to the previous reporting year"],
        "emissions-waste-resource-management-0":extractFill["What restricted substances are used at your site in production or operations"],
        "emissions-waste-resource-management-1":extractFill["Do you have protocols in place to manage restricted substances"],
        "emissions-waste-resource-management-2":extractFill["Which regulations are covered by your site’s written procedures for managing restricted substances"],
        "emissions-waste-Waste-0":extractFill["Does your organization have a comprehensive Waste Management Plan covering construction waste, hazardous waste, wastewater, solid waste, and airborne emissions Provide evidence of past experience in managing and recycling construction waste."],
        "emissions-waste-Waste-1":extractFill["Are systematic checks conducted to confirm the conformity of waste with the transfer note description (e.g., nature, volume, hazardousness)"],
        "emissions-waste-Waste-2":extractFill["Is compliance with the ADR (European Agreement concerning the International Carriage of Dangerous Goods by Road) agreement (road transport of hazardous goods) ensured"],
        "emissions-waste-Waste-3":extractFill["What is the total weight of hazardous waste generated in tons"],
        "emissions-waste-Waste-4":extractFill["What is the total weight of non-hazardous waste generated in tons"],
        "emissions-waste-Waste-5":extractFill["Provide the total weight of other waste types, including electronic waste, organic waste, and recyclable materials, if applicable."],
        "emissions-waste-biodiversity-0":extractFill["Does your organization have a policy in place for protecting biodiversity and natural resources"],
        "emissions-waste-biodiversity-1":extractFill["Is there oversight or responsibility for biodiversity matters at the board or executive management level within the organization"],
        "emissions-waste-biodiversity-2":extractFill["Has your organization publicly committed to biodiversity initiatives or endorsed any related programs"],
        "emissions-waste-biodiversity-3":extractFill["Does your organization evaluate the impacts and dependencies of its value chain on biodiversity"],
        "emissions-waste-biodiversity-4":extractFill["Are any organizational activities located in or near biodiversity-sensitive areas during the reporting year If yes, provide details of these activities."],
        "emissions-waste-biodiversity-5":extractFill["Does your organization use biodiversity indicators to monitor and evaluate performance across its operations"],
        "emissions-waste-biodiversity-6":extractFill["Does  your organization’s operations negatively impact biodiversity or natural habitats"],
        "emissions-waste-Energy -0":extractFill["What is the total consumption of purchased electricity (in MWh) during the reporting period"],
        "emissions-waste-Energy -1":extractFill["What is the total consumption of self-generated electricity (in MWh) during the reporting period"],
        "emissions-waste-Energy -2":extractFill["Is this electricity consumption excluded from your RE100 commitment"],
        "emissions-waste-Energy -3":extractFill["What is the total consumption of purchased heat, steam, and cooling (in MWh) during the reporting period"],
        "emissions-waste-Energy -4":extractFill["What is the total consumption of self-generated heat, steam, and cooling (in MWh) during the reporting period"],
        "emissions-waste-Energy -5":extractFill["What is the total heating value (in MWh) for your organization's energy consumption"],
        "emissions-waste-Energy -6":extractFill["How much energy (in MWh) was consumed from renewable sources during the reporting period"],
        "emissions-waste-Energy -7":extractFill["How much energy (in MWh) was consumed from non-renewable sources during the reporting period"],
        "carbon-cdp-0":extractFill["Did your organization cancel any project-based carbon credits during the reporting year"],
        "carbon-cdp-1":extractFill["Can you provide details of the project-based carbon credits your organization canceled during the reporting year"],
        "carbon-cdp-2":extractFill["Did your organization cancel any Renewable Energy Certificates (RECs) during the reporting year"],
        "carbon-cdp-3":extractFill["Can you provide details of the Renewable Energy Certificates (RECs) your organization canceled during the reporting years"],
        "carbon-cdp-4":extractFill["Does your organization implement an internal carbon pricing mechanism"],
        "carbon-cdp-5":extractFill["How does your organization utilize internal carbon pricing in its operations and decision-making processes"],            
    }



    const handleFileUpload = async (info: any,section: string) => {
        console.log(section)
        const { file } = info;
        if (!file || file.status === "uploading") return;
        setLoading(true);
        
        try {
            const formData = new FormData();
            formData.append('file', file.originFileObj || file);

            const response = await fetch('http://127.0.0.1:5000/extract/', {
                method: 'POST',
                body: formData,
            });


            if (!response.ok) {
                const errorText = await response.text();
                console.error("Server responded with error:", errorText);
                throw new Error(`Server error: ${response.status} - ${errorText}`);
            }

                const data = await response.json();

                setExtractFill(data)
                
                setAnswers(readed)

    
                            
        } catch (error) {
            console.error('Upload error:', error);
            message.error('Failed to process file');
        } finally {
            setLoading(false);
        }

    }


    const handleRemoveFile = (questionKey: string) => {
        setUploadedFiles((prevFiles) => {
            const updatedFiles = { ...prevFiles };
            delete updatedFiles[questionKey];
            return updatedFiles;
        });

        message.success("File removed successfully.");
    };

    
    const handleCopyText = (text: string) => {
        if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
            navigator.clipboard.writeText(text)
                .then(() => {
                    message.success("Question text copied to clipboard!");
                })
                .catch((err) => {
                    console.error("Clipboard copy failed:", err);
                    message.error("Failed to copy text to clipboard.");
                });
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand("copy");
                message.success("Question text copied to clipboard!");
            } catch (err) {
                console.error("Fallback clipboard copy failed:", err);
                message.error("Failed to copy text to clipboard.");
            }
            document.body.removeChild(textArea);
        }
    };




    const hasNonEmptyValues = Object.values(answers).some(value => value !== "");

    const handleSubmitAll = (item: any) => {
        setTrust(item?.isTrusted);
        setSubmittedAnswers((prev) => ({
            ...prev,
            [item]: true,
        }));

        let anyAnswered = false;
        const currentCategory = allCategories.find((cat) => cat.key === activeCategory);

        if (currentCategory) {
            const answeredData: any = [];

            currentCategory.questions.forEach((section: any) => {
                let answered = 0;
                const total = section.question.length;

                section.question.forEach((_: any, questionIndex: any) => {
                    const questionKey = `${activeCategory}-${section.key}-${questionIndex}`;
                    if (answers[questionKey]) {
                        answered += 1;
                        anyAnswered = true;
                    }
                });

                const questionsAnswer = `${answered}/${total}`;
                const percentComplete = total > 0 ? Math.round((answered / total) * 100) : 0;

                section.questionsAnswer = questionsAnswer;
                section.percentComplete = percentComplete;

                answeredData.push({
                    sectionKey: section.key,
                    questionsAnswer,
                    percentComplete,
                });
            });

            localStorage.setItem(`${activeCategory}-answeredData`, JSON.stringify(answeredData));

            if (!anyAnswered) {
                message.warning("Please answer at least one question before submitting.");
            } else {
                message.success("Submitted successfully!");
                setShowQuestions(false);
            }
        }
    };


const handlePost = async (item: any,activeCategory:string) => {
// console.log(extractFill, write)
console.log(write)
if (location.state?.edit==true){
    console.log("****************PUT*******************")

    try{
    const bodyData = {
        report: reportname,
        editdata: write,
    };


const response =await fetch(`http://127.0.0.1:5000/Update_Questionnaire/`,
  {
  method:"PUT",
  headers:{'Content-Type':'application/json',
  },
  body:JSON.stringify(bodyData),

});

if (write == null){
    message.warning("EDIT THIS FILE !")

}

if (! response.ok){
  throw new Error (`HTTP Status:${response.status}`);
}
    const result = await response.json();
  message.success(`${result} File edited sucessfully !`)

    return result
}
  catch(error){

    console.error("Delete error:", error);
    message.error("Failed to delete report.");
  }
}
else{
    console.log("****************POST*******************")
    
try {

    const bodyData = {
        item: item,
        activeCategory: activeCategory,
        submitdata: Object.keys(extractFill).length > 0 ? extractFill : write,
    };
    
    const response = await fetch('http://127.0.0.1:5000/submit/', {

    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
   body: JSON.stringify(bodyData),})


if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Response:', data);
    if (data!=null){
        message.success(`${data} form submited sucessfully!`);
        }
        else{
            message.warning("upload file!")
        }
} catch (error) {
    console.error('Error posting data:', error);
}
};

  

}





    const loadAnsweredData = (categoryKey: string, questions: any[]) => {
        const storedData = localStorage.getItem(`${categoryKey}-answeredData`);
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            questions.forEach((section) => {
                const storedSection = parsedData.find((data: any) => data.sectionKey === section.key);
                if (storedSection) {
                    section.questionsAnswer = storedSection.questionsAnswer;
                    section.percentComplete = storedSection.percentComplete;
                }
            });
        }
    };

    
    const handleClearUnsubmittedAnswers = () => {
        setAnswers((prevAnswers) => {
            const updatedAnswers = { ...prevAnswers };
            Object.keys(updatedAnswers).forEach((key) => {
                if (!submittedAnswers[key]) {
                    updatedAnswers[key] = "";
                }
            });
            return updatedAnswers;
        });
    };

    
    const handleCategoryClick = (categoryKey: string) => {
        // console.log("!!!!!!!!!!!!!!!!",)
        confirmNavigation(() => {

            const selectedCategory = allCategories.find((cat) => cat.key === categoryKey);
            if (selectedCategory) {
                loadAnsweredData(categoryKey, selectedCategory.questions);
            }
            setActiveCategory(categoryKey);
            const savedAnswers = localStorage.getItem('answeredQuestions');

            if (savedAnswers) {
                setAnswers(JSON.parse(savedAnswers));
            }
            handleClearUnsubmittedAnswers()
        })
    };

    
   





    useEffect(() => {
        const savedAnswers: any = localStorage.getItem('answeredQuestions');
        if (savedAnswers) {
            setAnswers(JSON.parse(savedAnswers));
        }
    }, []);


    useEffect(() => {
        if (!trust) {
            setAnswers((prevAnswers) => {
                const updatedAnswers = { ...prevAnswers };
                Object.keys(updatedAnswers).forEach((key) => {
                    if (!submittedAnswers[key] && (!updatedAnswers[key])) {
                        updatedAnswers[key] = "";
                    }
                });
                return updatedAnswers;
            });
        }
    }, [trust, submittedAnswers]);


        
    const renderQuestionInput = (
        section: string,
        key: string,
        question: { text: string; choices: string[] | null; isMandatory: boolean;type:string },
        questionIndex: number
    ) => {
        const questionKey = `${section}-${key}-${questionIndex}`;
        const isFileUploaded = !!uploadedFiles[questionKey];
        const isAnswered = !!answers[questionKey];
        if (isViewMode && !isAnswered) {
            return null;
        }


        return (
            <div>
                <div className="question-text">
                    <div>{questionIndex + 1}. {question.text}
                        {question.isMandatory && <span className="mandatory-asterisk">*</span>}
                        {isAnswered && (
                            <Tooltip title="Answered">
                                <CheckOutlined className="answered-icon" />
                            </Tooltip>
                        )}
                    </div>
                    <Tooltip title="Copy Question">
                        <button
                            className="copy-border"
                            onClick={() => handleCopyText(question?.text)}>
                            <CopyTwoTone
                                className="copy-icon"
                            />
                        </button>
                    </Tooltip>
                </div>
                {
                question.type === "date" ? (
            <DatePicker
                style={{ width: "100%" }}
                placeholder="Select date"
                value={
                    answers[`${section}-${key}-${questionIndex}`]
                        ? dayjs(answers[`${section}-${key}-${questionIndex}`])
                        : null
                }
                onChange={(date, dateString) =>
                    handleInputChange(
                        section,
                        key,
                        dateString,
                        questionIndex,
                        question.text
                    )
                }
            />
        ) :
                question.choices === null ? (
                    <div className="area-upload">
                        <TextArea
                            rows={3}
                            placeholder="Type your answer here"
                            size="small"
                            onChange={(e) =>
                                handleInputChange(section, key, e.target.value, questionIndex,question.text)
                            }
                            value={answers[questionKey] || ""}/>
                    </div>

                ) : question.choices.length > 4 ? (
                    <SelectDropDown
                        mode="multiple"
                        options={question.choices.map((choice) => ({
                            label: choice,
                            value: choice,
                        }))}
                        placeholder="Select options"
                        value={answers[`${section}-${key}-${questionIndex}`] || []}
                        onChange={(value: any) =>
                            handleInputChange(section, key, value, questionIndex,question.text)
                        }
                    />
                ) : (
                    <div className="question-options">
                        {question.choices.map((option, idx) => (
                            <label key={`${option}-${idx}`}>
                                <Space direction="vertical">
                                    <Radio
                                        value={option}
                                        checked={
                                            answers[`${section}-${key}-${questionIndex}`] ===option}
                                        onChange={() =>
                                            handleInputChange(
                                                section,
                                                key,
                                                option,
                                                questionIndex
                                                ,question.text
                                            )
                                        }
                                        className="radio-qbutton"
                                    >
                                        {option}
                                    </Radio>
                                </Space>
                            </label>
                        )
                        
                        )}
                    </div>
                )
                
                
                }

            </div>
        );



    };


    const currentCategory = allCategories.find((cat) => cat.key === activeCategory);
    const questions: any = currentCategory?.questions[currentSectionIndex];

    const totalQuestions = currentCategory?.questions.reduce((sum, section) => {
        const [, total] = section.questionsAnswer.split("/").map(Number);
        return sum + total;
    }, 0) ?? 0;

    const totalAnswered = currentCategory?.questions.reduce((sum, section) => {
        const [answered] = section.questionsAnswer.split("/").map(Number);
        return sum + answered;
    }, 0) ?? 0;
    const footer = () => {
        return (
            <div className="footer-main">
                <div className="footer-row">
                    <div className="footer-text empty-cell"></div>
                    <div className="footer-text total-label">
                        <strong>TOTAL</strong>
                    </div>
                    <div className={`footer-text ${activeCategory || "default"}`}>
                        {totalAnswered}/{totalQuestions}
                    </div>

                    <div className={`footer-text percentage ${activeCategory}`}>
                        {Math.round((totalAnswered / totalQuestions) * 100)}%
                    </div>

                </div>
            </div>
        )
    }

    const countNonEmptyAnswers = () => {
        let nonEmptyCount = 0;
        if (currentCategory) {
            currentCategory.questions[currentSectionIndex]?.question.forEach((_, questionIndex) => {
                const questionKey = `${activeCategory}-${questions.key}-${questionIndex}`;
                if (answers[questionKey]) {
                    nonEmptyCount += 1;
                }
            });
        }

        return nonEmptyCount;
    };
    

    const totalTextAreasInSection = questions?.question.length || 0;

    useEffect(() => {
        setsingleSectionTextArea(totalTextAreasInSection);
    }, [totalTextAreasInSection, questions]);


    const progressPercent = singleSectionTextArea > 0
        ? Math.round((countNonEmptyAnswers() / singleSectionTextArea) * 100)
        : 0;


        const hood={
        "general-company-overview-0":"WLKMKLWMSKW",
        "general-company-overview-1":"WLKMKLWMSKW",
        "general-company-overview-2":"WLKMKLWMSKW",
        "general-company-overview-3":"WLKMKLWMSKW",
        "general-company-overview-4":"WLKMKLWMSKW No",
        "general-company-overview-5":"What is the legal name of the company",
        "general-company-overview-6":"What year was the company founded",
        "general-company-overview-7":"Where is the company headquartered",
        "general-company-overview-8":"How many locations/offices does the company operate in",
        "general-company-overview-9":"What is the organizational structure of the company",
        "general-company-overview-10":"How many employees does the company currently have",
        "general-company-overview-11":"What are the company’s primary business activities",
        "general-company-overview-12":"In which WLKMKLWMSKW or sectors does the company operate",
        "general-company-overview-13":"What are the company’s core products or services",
        "general-business-operations-0":"What are the primary markets/geographies the company serves",
        "general-business-operations-1":"What is the company’s annual revenue or turnover",
        "general-business-operations-2":"How is the company funded",
        "general-business-operations-3":"What percentage of the company’s operations are automated",
        "general-business-operations-4":"What is the company’s supply chain structure",
        "general-business-operations-5":"How does the company ensure quality control of its products/services",
        "general-business-operations-6":"Does the company outsource any major business operations",
        "general-clients-partnerships-0":"Who are the company’s main customers (B2B, B2C, etc.)",
        "general-clients-partnerships-1":"Does the company have strategic partnerships or collaborations",
        "general-clients-partnerships-2":"What percentage of revenue comes from the top 5 customers",
        "general-clients-partnerships-3":"What is the customer retention rate over the past 3 years",
        "general-technology-innovation-0":"What key technologies does the company use to operate its business",
        "general-technology-innovation-1":"Does the company invest in R&D (Research & Development)",
        "general-technology-innovation-2":"How often does the company upgrade its systems or processes",
        "general-risk-business-continuity-0":"Does the company have a business continuity or disaster recovery plan",
        "general-risk-business-continuity-1":"What are the major risks the company faces in operations",
        "general-risk-business-continuity-2":"Does the company have insurance coverage for its key risks",
        "general-company-growth-0":"What has been the average revenue growth rate over the past 5 years",
        "general-company-growth-1":"Are there plans for company expansion (new locations, products, etc.)",
        "general-workforce-0":"How is the workforce divided by function (operations, sales, admin)",
        "general-workforce-1":"What is the company’s attrition rate for the past 3 years",
        "general-workforce-2":"How does the company attract and retain talent",
        "supplierbenchmark-esg-policies-governance-0":"Do you have a formal Environmental, Social, and Governance (ESG) policy",
        "supplierbenchmark-esg-policies-governance-1":"Is your ESG policy aligned with global standards Like",
        "supplierbenchmark-esg-policies-governance-2":"How often is the ESG policy reviewed and updated",
        "supplierbenchmark-esg-policies-governance-3":"How do you communicate ESG policies to internal and external stakeholders",
        "supplierbenchmark-risk-screening-0":"Do you have a sustainability risk assessment process for suppliers",
        "supplierbenchmark-risk-screening-1":"Are suppliers categorized based on sustainability risk levels (high, medium, low)",
        "supplierbenchmark-risk-screening-2":"What are the most significant sustainability risks across your supplier base",
        "supplierbenchmark-risk-screening-3":"How frequently are high-risk suppliers monitored for compliance and improvements",
        "supplierbenchmark-certification-compliance-0":"Does your company hold any recognized environmental certifications",
        "supplierbenchmark-certification-compliance-1":"Does your company hold any social certifications",
        "supplierbenchmark-certification-compliance-2":"Does your company adhere to any sustainability reporting or management standards",
        "supplierbenchmark-certification-compliance-3":"Does your company hold any governance or supply chain certifications",
        "supplierbenchmark-certification-compliance-4":"How often are you audited for compliance with these certifications",
        "supplierbenchmark-certification-compliance-5":"Are there any additional certifications you are pursuing If yes, please apply.",
        "supplierbenchmark-sustainbility-performance-0":"Do you provide annual sustainability performance reports",
        "supplierbenchmark-sustainbility-performance-1":"What KPIs do you use to measure your sustainability performance",
        "supplierbenchmark-sustainbility-performance-2":"How transparent are you about your sustainability progress and challenges",
        "supplierbenchmark-collabration-innovation-0":"Do you engage in sustainability innovation (e.g., circular economy, low-carbon products)",
        "supplierbenchmark-collabration-innovation-1":"What challenges do you face in improving sustainability performance",
        "performance-cdp-score-0":"What is your current CDP score for Climate Change",
        "performance-cdp-score-1":"What is your current CDP score for Water",
        "performance-cdp-score-2":"What is your current CDP score for Forests",
        "product-supply-product-0":"How many products have undergone a carbon footprint assessment",
        "product-supply-product-1":"What is the product name, type, and function",
        "product-supply-product-2":"What is the weight or volume of the product (kg/L)",
        "product-supply-product-3":"What is the declared carbon footprint of the product (kg CO2e)",
        "product-supply-product-4":"What raw materials are used in production",
        "product-supply-product-5":"Provide % of raw materials sourced locally, regionally, and internationally.",
        "product-supply-product-6":"What is the embodied carbon of the raw materials (kg CO2e) used in the product",
        "product-supply-product-7":"Are suppliers certified for sustainable practices",
        "product-supply-product-8":"Do suppliers disclose their carbon footprint data ",
        "product-supply-product-9":"What is the average transport distance for raw materials and finished goods (km)",
        "product-supply-product-10":"Are logistics providers certified for sustainability ",
        "product-supply-product-11":"What is the total energy consumption (kWh) during production",
        "product-supply-product-12":"What percentage of energy used during production comes from renewable sources",
        "product-supply-product-13":"Are emissions mitigation technologies employed",
        "product-supply-product-14":"What emissions are associated with end-of-life processes (kg CO2e)",
        "governace-certification-0":"Does your company hold an ISO 14001 certification for environmental management",
        "governace-certification-1":"Has your company obtained any other environmental management system certifications, eg EMAS (Eco-Management and Audit Scheme) ",
        "governace-certification-2":"Does your company hold an ISO 50001 certification for energy management",
        "governace-certification-3":"Has your company obtained any other energy-related certifications/framework (e.g., IPMVP – International Performance Measurement and Verification Protocol)",
        "management-system-management-0":"Does your company have a formal environmental policy that includes a commitment to legal compliance, continuous measurement, and continuous improvement in environmental performance",
        "management-system-management-1":"Which of the following areas are included in your environmental policy",
        "management-system-management-2":"Does your company organize training for employees on the environmental policy",
        "management-system-management-3":"Does your site have an environmental management system (EMS) in place",
        "management-system-management-4":"Does your site have an energy management system (EnMS) in place",
        "management-system-monitoring-0":"What percentage of electricity used at your site in the last calendar year came from renewable sources",
        "management-system-monitoring-1":"What percentage of heating/cooling used at your site in the last calendar year came from renewable sources",
        "emissions-waste-ghg-reporting-standards-methodology-0":"What is the base year selected for your GHG inventory",
        "emissions-waste-ghg-reporting-standards-methodology-1":"Which standard, protocol, or methodology has been applied to collect activity data and calculate emissions",
        "emissions-waste-ghg-reporting-standards-methodology-2":"Has a documented framework been established to define operational and organizational boundaries for emissions reporting",
        "emissions-waste-emissions-w-0":"What were your gross Scope 1 GHG emissions (in metric tons CO₂-equivalent) for the last reporting year",
        "emissions-waste-emissions-w-1":"What percentage of your Scope 1 emissions comes from stationary combustion, transportation, or fugitive sources",
        "emissions-waste-emissions-w-2":"Which gases were included in your Scope 1 emissions calculations",
        "emissions-waste-emissions-w-3":"What were your gross Scope 2 emissions (in metric tons CO₂-equivalent) using the location-based method",
        "emissions-waste-emissions-w-4":"If applicable, what were your gross Scope 2 emissions (in metric tons CO₂-equivalent) using the market-based method",
        "emissions-waste-supply-chain-emissions-0":"What were your Scope 3 emissions (Supply Chain) in the last reporting period (please provide details in tCO2e for each)",
        "emissions-waste-supply-chain-emissions-1":"How many Scope 3 categories (out of 15) do you currently report",
        "emissions-waste-supply-chain-emissions-2":"What percentage of your Scope 3 data is based on primary data from suppliers/customers versus estimated data",
        "emissions-waste-supply-chain-emissions-3":"Which three Scope 3 categories contribute the most to your emissions",
        "emissions-waste-upstream-categories-0":"What are your emissions from purchased goods and services (Scope 3, Category 1) in metric tons CO₂-equivalent",
        "emissions-waste-upstream-categories-1":"What percentage of your suppliers (by spend) provide emissions data (Scope 3, Category 1)",
        "emissions-waste-upstream-categories-2":"What are your emissions from capital goods (Scope 3, Category 2) in metric tons CO₂-equivalent",
        "emissions-waste-upstream-categories-3":"Do you conduct lifecycle assessments for your major capital goods (Scope 3, Category 2)",
        "emissions-waste-upstream-categories-4":"What are your emissions from upstream fuel and energy-related activities (Scope 3, Category 3) in metric tons CO₂-equivalent",
        "emissions-waste-upstream-categories-5":"What are your emissions from transporting goods to your facilities (Scope 3, Category 4) in metric tons CO₂-equivalent",
        "emissions-waste-upstream-categories-6":"What percentage of logistics providers use low-emission transportation methods (Scope 3, Category 4), such as EVs or rail ",
        "emissions-waste-upstream-categories-7":"What are your emissions from waste management (Scope 3, Category 5) in metric tons CO₂-equivalent ",
        "emissions-waste-upstream-categories-8":"What percentage of your soperational waste is recycled or composted (Scope 3, Category 5) ",
        "emissions-waste-upstream-categories-9":"What are your emissions from business travel (Scope 3, Category 6) in metric tons CO₂-equivalent",
        "emissions-waste-upstream-categories-10":"What are your emissions from employee commuting (Scope 3, Category 7) in metric tons CO₂-equivalent",
        "emissions-waste-upstream-categories-11":"What are your emissions from upstream leased assets (Scope 3, Category 8) in metric tons CO₂-equivalent",
        "emissions-waste-downstream-categories-0":"What are your emissions from product distribution to customers (Scope 3, Category 9) in metric tons CO₂-equivalent",
        "emissions-waste-downstream-categories-1":"What percentage of your transportation partners use low-carbon technologies (Scope 3, Category 9)",
        "emissions-waste-downstream-categories-2":"What are your emissions from the processing of sold products (Scope 3, Category 10) in metric tons CO₂-equivalent",
        "emissions-waste-downstream-categories-3":"What are the lifetime emissions (Scope 3, Category 11) from the use of your sold products in metric tons CO₂-equivalent",
        "emissions-waste-downstream-categories-4":"What are your emissions from the disposal or recycling of your sold products (Scope 3, Category 12) in metric tons CO₂-equivalent",
        "emissions-waste-downstream-categories-5":"What are your emissions from franchise operations (Scope 3, Category 14) in metric tons CO₂-equivalent",
        "emissions-waste-downstream-categories-6":"What are your emissions from franchise operations (Scope 3, Category 14) in metric tons CO₂-equivalent",
        "emissions-waste-downstream-categories-7":"What percentage of your franchises report emissions data (Scope 3, Category 14)",
        "emissions-waste-downstream-categories-8":"What are your emissions from investment activities (Scope 3, Category 15) in metric tons CO₂-equivalent",
        "emissions-waste-downstream-categories-9":"What percentage of your investment portfolio is assessed for GHG emissions (Scope 3, Category 15)",
        "emissions-waste-exclusion-0":"What is the source of excluded emissions, and why are they excluded from the organization’s carbon accounting",
        "emissions-waste-exclusion-1":"Which Scope(s) or Scope 3 categories do these excluded emissions belong to",
        "emissions-waste-ghg-reduction-targets-0":"Does your company set Greenhouse Gas (GHG) reduction targets",
        "emissions-waste-ghg-reduction-targets-1":"Have you implemented energy efficiency measures to reduce Scope 2 emissions If so, what is the percentage reduction achieved",
        "emissions-waste-ghg-reduction-targets-2":"Are the GHG reduction targets approved by the Science Based Targets Initiative (SBTi)",
        "emissions-waste-ghg-reduction-targets-3":"Does your company have emission reduction targets for your upstream supply chain emissions (Scope 3)",
        "emissions-waste-ghg-emissions-data-andanalys-0":"Describe your gross global combined Scope 1 and 2 emissions for the reporting year in metric tons CO2e per unit currency total revenue. Include any additional intensity metrics relevant to your operations. ",
        "emissions-waste-ghg-emissions-data-andanalys-1":"Is your organization able to break down emissions data for any subsidiaries included in your CDP response",
        "emissions-waste-ghg-emissions-data-andanalys-2":"Provide a breakdown of gross Scope 1 and Scope 2 emissions by subsidiary",
        "emissions-waste-ghg-emissions-data-andanalys-3":"How do your gross global emissions (Scope 1, &2 combined) for the reporting year compare to the previous reporting year",
        "emissions-waste-resource-management-0":"What restricted substances are used at your site in production or operations",
        "emissions-waste-resource-management-1":"Do you have protocols in place to manage restricted substances",
        "emissions-waste-resource-management-2":"Which regulations are covered by your site’s written procedures for managing restricted substances",
        "emissions-waste-Waste-0":"Does your organization have a comprehensive Waste Management Plan covering construction waste, hazardous waste, wastewater, solid waste, and airborne emissions Provide evidence of past experience in managing and recycling construction waste.",
        "emissions-waste-Waste-1":"Are systematic checks conducted to confirm the conformity of waste with the transfer note description (e.g., nature, volume, hazardousness)",
        "emissions-waste-Waste-2":"Is compliance with the ADR (European Agreement concerning the International Carriage of Dangerous Goods by Road) agreement (road transport of hazardous goods) ensured",
        "emissions-waste-Waste-3":"What is the total weight of hazardous waste generated in tons",
        "emissions-waste-Waste-4":"What is the total weight of non-hazardous waste generated in tons",
        "emissions-waste-Waste-5":"Provide the total weight of other waste types, including electronic waste, organic waste, and recyclable materials, if applicable.",
        "emissions-waste-biodiversity-0":"Does your organization have a policy in place for protecting biodiversity and natural resources",
        "emissions-waste-biodiversity-1":"Is there oversight or responsibility for biodiversity matters at the board or executive management level within the organization",
        "emissions-waste-biodiversity-2":"Has your organization publicly committed to biodiversity initiatives or endorsed any related programs",
        "emissions-waste-biodiversity-3":"Does your organization evaluate the impacts and dependencies of its value chain on biodiversity",
        "emissions-waste-biodiversity-4":"Are any organizational activities located in or near biodiversity-sensitive areas during the reporting year If yes, provide details of these activities.",
        "emissions-waste-biodiversity-5":"Does your organization use biodiversity indicators to monitor and evaluate performance across its operations",
        "emissions-waste-biodiversity-6":"Does  your organization’s operations negatively impact biodiversity or natural habitats",
        "emissions-waste-Energy -0":"What is the total consumption of purchased electricity (in MWh) during the reporting period",
        "emissions-waste-Energy -1":"What is the total consumption of self-generated electricity (in MWh) during the reporting period",
        "emissions-waste-Energy -2":"Is this electricity consumption excluded from your RE100 commitment",
        "emissions-waste-Energy -3":"What is the total consumption of purchased heat, steam, and cooling (in MWh) during the reporting period",
        "emissions-waste-Energy -4":"What is the total consumption of self-generated heat, steam, and cooling (in MWh) during the reporting period",
        "emissions-waste-Energy -5":"What is the total heating value (in MWh) for your organization's energy consumption",
        "emissions-waste-Energy -6":"How much energy (in MWh) was consumed from renewable sources during the reporting period",
        "emissions-waste-Energy -7":"How much energy (in MWh) was consumed from non-renewable sources during the reporting period",
        "carbon-cdp-0":"Did your organization cancel any project-based carbon credits during the reporting year",
        "carbon-cdp-1":"Can you provide details of the project-based carbon credits your organization canceled during the reporting year",
        "carbon-cdp-2":"Did your organization cancel any Renewable Energy Certificates (RECs) during the reporting year",
        "carbon-cdp-3":"Can you provide details of the Renewable Energy Certificates (RECs) your organization canceled during the reporting years",
        "carbon-cdp-4":"Does your organization implement an internal carbon pricing mechanism",
        "carbon-cdp-5":"How does your organization utilize internal carbon pricing in its operations and decision-making processes",            
    }



    return (
        <div className="questionnaire-main">
                    {loading && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <Loader />
                </div>
            )}

            <div className="questionnaire-title">Questionnaire</div>
            <div className="questionnaire-container">
                <div className="category-card">
                    <Card title={"Categories"} bordered>
                        <List
                            key={activeCategory}
                            dataSource={allCategories}
                            renderItem={(category, id: number) => (
                                <List.Item
                                    key={category.key}
                                    onClick={() => handleCategoryClick(category.key)}
                                    className={`category-item ${activeCategory === category.key ? "active" : ""}`}
                                >
                                    {category.section}
                                </List.Item>
                            )}
                        />
                    </Card>
                </div>
                {!showQuestions ? (
                    <div className="question-card">
                        <Card title={currentCategory?.section} bordered>
                            <Table
                                columns={columns}
                                dataSource={(currentCategory?.questions || []).map((q, idx) => ({ ...q, key: idx }))}
                                bordered={false}
                                pagination={false}
                                onRow={(record: any, index: any) => ({
                                    onClick: () => handleRowClick(record, index),
                                })}
                                footer={footer}
                            />

                        </Card>
                    </div>
                ) : (
                    <div className="question-card">
                        <Card
                            title={
                                <div>
                                    <ArrowLeftOutlined
                                        className="back"
                                        onClick={handleBackToCategories}
                                    />
                                    {`Section: ${questions?.quesSection}`}
                                </div>
                            }
                            extra={
                                <div style={{ textAlign: "center", display: "flex", gap: "10px", alignItems: 'center' }}>
                                    <Tooltip title="Upload">
                                        <Upload
                                            showUploadList={false}
                                            customRequest={(options) => {
                                                const { onSuccess } = options;
                                                setTimeout(() => onSuccess?.("ok"), 0);
                                            }}
                                            onChange={(info) => handleFileUpload(info,'')}>
                                            <FileAddTwoTone className="upload-icon" />
                                        </Upload>
                                    </Tooltip>
                                    <Progress
                                        type="circle"
                                        percent={progressPercent}
                                        width={50}
                                        strokeColor={primaryColor}
                                        format={() => `${countNonEmptyAnswers()}/${singleSectionTextArea}`}
                                    />

                                </div>}
                                bordered>
                            {questions?.question.map((q: any, idx: any) => {
                                return (
                                    <div key={`${questions.key}-${idx}`}>
                                        {renderQuestionInput(activeCategory, questions.key, q, idx)}
                                    </div>
                                );
                            })}

                            <div className="subbutton">
                                <div className="navigation-buttons">
                                    <CustomButton
                                        label="Previous Section"
                                        type="primary"
                                        onClick={handlePreviousSection}
                                        disabled={currentSectionIndex === 0}
                                    />
                                    <span className="current-section-text">
                                        {`Section ${currentSectionIndex + 1} of ${currentCategory?.questions.length}`}
                                    </span>
                                    <CustomButton
                                        label="Next Section"
                                        type="primary"
                                        onClick={handleNextSection}
                                        disabled={currentSectionIndex === (currentCategory?.questions.length ?? 1) - 1 || (isViewMode && hasNonEmptyValues)}
                                    />
                                </div>
                                <div className="common-submit-btn">
                                    <CustomButton
                                        label={isViewMode ? "Hide Answers" : "View Answers"}
                                        type="primary"
                                        onClick={() => setIsViewMode(prev => !prev)}
                                    />
                                    <CustomButton
                                        label="Submit Answers"
                                        type="primary"
                                        // onClick={(item: any) => handleSubmitAll(item)}
                                        disabled={allCategories.find((cat) => cat.key === activeCategory)?.questions.every(section =>
                                            section.question.every((_, questionIndex) => {
                                                const questionKey = `${activeCategory}-${section.key}-${questionIndex}`;
                                                return !answers[questionKey];
                                            })
                                        )}
                                        onClick={(item: any) => handlePost(questions,activeCategory)}
                                    />
                                </div>
                            </div>

                        </Card>
                    </div>
                )
                }
            </div >
            <Modal
                title="Unsaved Changes!!!"
                visible={isUnsavedModalVisible}
                onOk={() => {
                    setIsUnsavedModalVisible(false);
                    setHasUnsavedChanges(false);
                    if (pendingAction) pendingAction();
                }}
                onCancel={() => setIsUnsavedModalVisible(false)}
                okText="Yes"
                cancelText="No"
                centered
            >
                <div className="model-ques-content">Do You Want to Exit Without Saving?</div>
            </Modal>


        </div >

    );

};

export default Questionnaire;
