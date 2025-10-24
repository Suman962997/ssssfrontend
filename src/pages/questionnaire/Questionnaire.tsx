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
import { fetchSupplierListData } from "../../features/action/SupplierAction";
import { useNavigate } from "react-router-dom";




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
    const [extractBoolean, setExtractBoolean] = useState<boolean>(false);
    const [selectedRow, setSelectedRow] = useState<boolean>(false);

    
    const editresponse=location.state?.data;
    const editboolean=location.state?.edit;
    const reportname=location.state?.reportname;
    const refresh =location.state?.main;
    const [data, setData] = useState<any>(null);
    const [cardData, setCardData] = useState<any>(null);
    

  const navigate = useNavigate(); // ✅ must be inside the component


    // console.log(editresponse)


    const editanswers={
        "general-company-overview-0":"Report name",
        "general-company-overview-1":"Date",
        "general-company-overview-2":"industry",
        "general-company-overview-3":"Email",
        "general-company-overview-4":"Contact No",
        "general-company-overview-5":"What is the legal name of the company?",
        "general-company-overview-6":"What year was the company founded?",
        "general-company-overview-7":"Where is the company headquartered?",
        "general-company-overview-8":"How many locations/offices does the company operate in?",
        "general-company-overview-9":"What is the organizational structure of the company?",
        "general-company-overview-10":"How many employees does the company currently have?",
        "general-company-overview-11":"What are the company’s primary business activities?",
        "general-company-overview-12":"In which industries or sectors does the company operate?",
        "general-company-overview-13":"What are the company’s core products or services?",
        "general-business-operations-0":"What are the primary markets/geographies the company serves?",
        "general-business-operations-1":"What is the company’s annual revenue or turnover?",
        "general-business-operations-2":"How is the company funded?",
        "general-business-operations-3":"What percentage of the company’s operations are automated?",
        "general-business-operations-4":"What is the company’s supply chain structure?",
        "general-business-operations-5":"How does the company ensure quality control of its products/services?",
        "general-business-operations-6":"Does the company outsource any major business operations?",
        "general-clients-partnerships-0":"Who are the company’s main customers (B2B, B2C, etc.)?",
        "general-clients-partnerships-1":"Does the company have strategic partnerships or collaborations?",
        "general-clients-partnerships-2":"What percentage of revenue comes from the top 5 customers?",
        "general-clients-partnerships-3":"What is the customer retention rate over the past 3 years?",
        "general-technology-innovation-0":"What key technologies does the company use to operate its business?",
        "general-technology-innovation-1":"Does the company invest in R&D (Research & Development)?",
        "general-technology-innovation-2":"How often does the company upgrade its systems or processes?",
        "general-risk-business-continuity-0":"Does the company have a business continuity or disaster recovery plan?",
        "general-risk-business-continuity-1":"What are the major risks the company faces in operations?",
        "general-risk-business-continuity-2":"Does the company have insurance coverage for its key risks?",
        "general-company-growth-0":"What has been the average revenue growth rate over the past 5 years?",
        "general-company-growth-1":"Are there plans for company expansion (new locations, products, etc.)?",
        "general-workforce-0":"How is the workforce divided by function (operations, sales, admin)?",
        "general-workforce-1":"What is the company’s attrition rate for the past 3 years?",
        "general-workforce-2":"How does the company attract and retain talent?",
        "supplierbenchmark-esg-policies-governance-0":"Do you have a formal Environmental, Social, and Governance (ESG) policy?",
        "supplierbenchmark-esg-policies-governance-1":"Is your ESG policy aligned with global standards Like",
        "supplierbenchmark-esg-policies-governance-2":"How often is the ESG policy reviewed and updated?",
        "supplierbenchmark-esg-policies-governance-3":"How do you communicate ESG policies to internal and external stakeholders?",
        "supplierbenchmark-risk-screening-0":"Do you have a sustainability risk assessment process for suppliers?",
        "supplierbenchmark-risk-screening-1":"Are suppliers categorized based on sustainability risk levels (high, medium, low)?",
        "supplierbenchmark-risk-screening-2":"What are the most significant sustainability risks across your supplier base?",
        "supplierbenchmark-risk-screening-3":"How frequently are high-risk suppliers monitored for compliance and improvements?",
        "supplierbenchmark-certification-compliance-0":"Does your company hold any recognized environmental certifications?",
        "supplierbenchmark-certification-compliance-1":"Does your company hold any social certifications?",
        "supplierbenchmark-certification-compliance-2":"Does your company adhere to any sustainability reporting or management standards?",
        "supplierbenchmark-certification-compliance-3":"Does your company hold any governance or supply chain certifications?",
        "supplierbenchmark-certification-compliance-4":"How often are you audited for compliance with these certifications?",
        "supplierbenchmark-certification-compliance-5":"Are there any additional certifications you are pursuing If yes, please apply.",
        "supplierbenchmark-sustainbility-performance-0":"Do you provide annual sustainability performance reports?",
        "supplierbenchmark-sustainbility-performance-1":"What KPIs do you use to measure your sustainability performance?",
        "supplierbenchmark-sustainbility-performance-2":"How transparent are you about your sustainability progress and challenges?",
        "supplierbenchmark-collabration-innovation-0":"Do you engage in sustainability innovation (e.g., circular economy, low-carbon products)?",
        "supplierbenchmark-collabration-innovation-1":"What challenges do you face in improving sustainability performance",
        "performance-cdp-score-0":"What is your current CDP score for Climate Change?",
        "performance-cdp-score-1":"What is your current CDP score for Water?",
        "performance-cdp-score-2":"What is your current CDP score for Forests?",
        "product-supply-product-0":"How many products have undergone a carbon footprint assessment?",
        "product-supply-product-1":"What is the product name, type, and function?",
        "product-supply-product-2":"What is the weight or volume of the product? (kg/L)",
        "product-supply-product-3":"What is the declared carbon footprint of the product (kg CO2e)?",
        "product-supply-product-4":"What raw materials are used in production?",
        "product-supply-product-5":"Provide % of raw materials sourced locally, regionally, and internationally.",
        "product-supply-product-6":"What is the embodied carbon of the raw materials (kg CO2e) used in the product?",
        "product-supply-product-7":"Are suppliers certified for sustainable practices?",
        "product-supply-product-8":"Do suppliers disclose their carbon footprint data? ",
        "product-supply-product-9":"What is the average transport distance for raw materials and finished goods (km)?",
        "product-supply-product-10":"Are logistics providers certified for sustainability? ",
        "product-supply-product-11":"What is the total energy consumption (kWh) during production?",
        "product-supply-product-12":"What percentage of energy used during production comes from renewable sources?",
        "product-supply-product-13":"Are emissions mitigation technologies employed?",
        "product-supply-product-14":"What emissions are associated with end-of-life processes (kg CO2e)?",
        "governace-certification-0":"Does your company hold an ISO 14001 certification for environmental management?",
        "governace-certification-1":"Has your company obtained any other environmental management system certifications, eg EMAS (Eco-Management and Audit Scheme) ?",
        "governace-certification-2":"Does your company hold an ISO 50001 certification for energy management?",
        "governace-certification-3":"Has your company obtained any other energy-related certifications/framework (e.g., IPMVP – International Performance Measurement and Verification Protocol)?",
        "management-system-management-0":"Does your company have a formal environmental policy that includes a commitment to legal compliance, continuous measurement, and continuous improvement in environmental performance?",
        "management-system-management-1":"Which of the following areas are included in your environmental policy?",
        "management-system-management-2":"Does your company organize training for employees on the environmental policy?",
        "management-system-management-3":"Does your site have an environmental management system (EMS) in place?",
        "management-system-management-4":"Does your site have an energy management system (EnMS) in place?",
        "management-system-monitoring-0":"What percentage of electricity used at your site in the last calendar year came from renewable sources?",
        "management-system-monitoring-1":"What percentage of heating/cooling used at your site in the last calendar year came from renewable sources?",
        "emissions-waste-ghg-reporting-standards-methodology-0":"What is the base year selected for your GHG inventory?",
        "emissions-waste-ghg-reporting-standards-methodology-1":"Which standard, protocol, or methodology has been applied to collect activity data and calculate emissions?",
        "emissions-waste-ghg-reporting-standards-methodology-2":"Has a documented framework been established to define operational and organizational boundaries for emissions reporting?",
        "emissions-waste-emissions-w-0":"What were your gross Scope 1 GHG emissions (in metric tons CO₂-equivalent) for the last reporting year?",
        "emissions-waste-emissions-w-1":"What percentage of your Scope 1 emissions comes from stationary combustion, transportation, or fugitive sources?",
        "emissions-waste-emissions-w-2":"Which gases were included in your Scope 1 emissions calculations?",
        "emissions-waste-emissions-w-3":"What were your gross Scope 2 emissions (in metric tons CO₂-equivalent) using the location-based method?",
        "emissions-waste-emissions-w-4":"If applicable, what were your gross Scope 2 emissions (in metric tons CO₂-equivalent) using the market-based method?",
        "emissions-waste-supply-chain-emissions-0":"What were your Scope 3 emissions (Supply Chain) in the last reporting period (please provide details in tCO2e for each)",
        "emissions-waste-supply-chain-emissions-1":"How many Scope 3 categories (out of 15) do you currently report?",
        "emissions-waste-supply-chain-emissions-2":"What percentage of your Scope 3 data is based on primary data from suppliers/customers versus estimated data?",
        "emissions-waste-supply-chain-emissions-3":"Which three Scope 3 categories contribute the most to your emissions?",
        "emissions-waste-upstream-categories-0":"What are your emissions from purchased goods and services (Scope 3, Category 1) in metric tons CO₂-equivalent?",
        "emissions-waste-upstream-categories-1":"What percentage of your suppliers (by spend) provide emissions data (Scope 3, Category 1)?",
        "emissions-waste-upstream-categories-2":"What are your emissions from capital goods (Scope 3, Category 2) in metric tons CO₂-equivalent?",
        "emissions-waste-upstream-categories-3":"Do you conduct lifecycle assessments for your major capital goods (Scope 3, Category 2)?",
        "emissions-waste-upstream-categories-4":"What are your emissions from upstream fuel and energy-related activities (Scope 3, Category 3) in metric tons CO₂-equivalent?",
        "emissions-waste-upstream-categories-5":"What are your emissions from transporting goods to your facilities (Scope 3, Category 4) in metric tons CO₂-equivalent?",
        "emissions-waste-upstream-categories-6":"What percentage of logistics providers use low-emission transportation methods (Scope 3, Category 4), such as EVs or rail?",
        "emissions-waste-upstream-categories-7":"What are your emissions from waste management (Scope 3, Category 5) in metric tons CO₂-equivalent?",
        "emissions-waste-upstream-categories-8":"What percentage of your soperational waste is recycled or composted (Scope 3, Category 5)?",
        "emissions-waste-upstream-categories-9":"What are your emissions from business travel (Scope 3, Category 6) in metric tons CO₂-equivalent?",
        "emissions-waste-upstream-categories-10":"What are your emissions from employee commuting (Scope 3, Category 7) in metric tons CO₂-equivalent?",
        "emissions-waste-upstream-categories-11":"What are your emissions from upstream leased assets (Scope 3, Category 8) in metric tons CO₂-equivalent?",
        "emissions-waste-downstream-categories-0":"What are your emissions from product distribution to customers (Scope 3, Category 9) in metric tons CO₂-equivalent?",
        "emissions-waste-downstream-categories-1":"What percentage of your transportation partners use low-carbon technologies (Scope 3, Category 9)?",
        "emissions-waste-downstream-categories-2":"What are your emissions from the processing of sold products (Scope 3, Category 10) in metric tons CO₂-equivalent?",
        "emissions-waste-downstream-categories-3":"What are the lifetime emissions (Scope 3, Category 11) from the use of your sold products in metric tons CO₂-equivalent?",
        "emissions-waste-downstream-categories-4":"What are your emissions from the disposal or recycling of your sold products (Scope 3, Category 12) in metric tons CO₂-equivalent?",
        "emissions-waste-downstream-categories-5":"What are your emissions from franchise operations (Scope 3, Category 14) in metric tons CO₂-equivalent?",
        "emissions-waste-downstream-categories-6":"What are your emissions from franchise operations (Scope 3, Category 14) in metric tons CO₂-equivalent?",
        "emissions-waste-downstream-categories-7":"What percentage of your franchises report emissions data (Scope 3, Category 14)?",
        "emissions-waste-downstream-categories-8":"What are your emissions from investment activities (Scope 3, Category 15) in metric tons CO₂-equivalent?",
        "emissions-waste-downstream-categories-9":"What percentage of your investment portfolio is assessed for GHG emissions (Scope 3, Category 15)?",
        "emissions-waste-exclusion-0":"What is the source of excluded emissions, and why are they excluded from the organization’s carbon accounting?",
        "emissions-waste-exclusion-1":"Which Scope(s) or Scope 3 categories do these excluded emissions belong to?",
        "emissions-waste-ghg-reduction-targets-0":"Does your company set Greenhouse Gas (GHG) reduction targets?",
        "emissions-waste-ghg-reduction-targets-1":"Have you implemented energy efficiency measures to reduce Scope 2 emissions If so, what is the percentage reduction achieved?",
        "emissions-waste-ghg-reduction-targets-2":"Are the GHG reduction targets approved by the Science Based Targets Initiative (SBTi)?",
        "emissions-waste-ghg-reduction-targets-3":"Does your company have emission reduction targets for your upstream supply chain emissions (Scope 3)?",
        "emissions-waste-ghg-emissions-data-andanalys-0":"Describe your gross global combined Scope 1 and 2 emissions for the reporting year in metric tons CO2e per unit currency total revenue. Include any additional intensity metrics relevant to your operations.",
        "emissions-waste-ghg-emissions-data-andanalys-1":"Is your organization able to break down emissions data for any subsidiaries included in your CDP response?",
        "emissions-waste-ghg-emissions-data-andanalys-2":"Provide a breakdown of gross Scope 1 and Scope 2 emissions by subsidiary",
        "emissions-waste-ghg-emissions-data-andanalys-3":"How do your gross global emissions (Scope 1, &2 combined) for the reporting year compare to the previous reporting year?",
        "emissions-waste-resource-management-0":"What restricted substances are used at your site in production or operations?",
        "emissions-waste-resource-management-1":"Do you have protocols in place to manage restricted substances?",
        "emissions-waste-resource-management-2":"Which regulations are covered by your site’s written procedures for managing restricted substances",
        "emissions-waste-Waste-0":"Does your organization have a comprehensive Waste Management Plan covering construction waste, hazardous waste, wastewater, solid waste, and airborne emissions Provide evidence of past experience in managing and recycling construction waste.",
        "emissions-waste-Waste-1":"Are systematic checks conducted to confirm the conformity of waste with the transfer note description (e.g., nature, volume, hazardousness)",
        "emissions-waste-Waste-2":"Is compliance with the ADR (European Agreement concerning the International Carriage of Dangerous Goods by Road) agreement (road transport of hazardous goods) ensured?",
        "emissions-waste-Waste-3":"What is the total weight of hazardous waste generated in tons?",
        "emissions-waste-Waste-4":"What is the total weight of non-hazardous waste generated in tons?",
        "emissions-waste-Waste-5":"Provide the total weight of other waste types, including electronic waste, organic waste, and recyclable materials, if applicable.",
        "emissions-waste-biodiversity-0":"Does your organization have a policy in place for protecting biodiversity and natural resources?",
        "emissions-waste-biodiversity-1":"Is there oversight or responsibility for biodiversity matters at the board or executive management level within the organization?",
        "emissions-waste-biodiversity-2":"Has your organization publicly committed to biodiversity initiatives or endorsed any related programs?",
        "emissions-waste-biodiversity-3":"Does your organization evaluate the impacts and dependencies of its value chain on biodiversity?",
        "emissions-waste-biodiversity-4":"Are any organizational activities located in or near biodiversity-sensitive areas during the reporting year If yes, provide details of these activities.",
        "emissions-waste-biodiversity-5":"Does your organization use biodiversity indicators to monitor and evaluate performance across its operations?",
        "emissions-waste-biodiversity-6":"Does  your organization’s operations negatively impact biodiversity or natural habitats?",
        "emissions-waste-Energy -0":"What is the total consumption of purchased electricity (in MWh) during the reporting period?",
        "emissions-waste-Energy -1":"What is the total consumption of self-generated electricity (in MWh) during the reporting period?",
        "emissions-waste-Energy -2":"Is this electricity consumption excluded from your RE100 commitment?",
        "emissions-waste-Energy -3":"What is the total consumption of purchased heat, steam, and cooling (in MWh) during the reporting period?",
        "emissions-waste-Energy -4":"What is the total consumption of self-generated heat, steam, and cooling (in MWh) during the reporting period?",
        "emissions-waste-Energy -5":"What is the total heating value (in MWh) for your organization's energy consumption?",
        "emissions-waste-Energy -6":"How much energy (in MWh) was consumed from renewable sources during the reporting period?",
        "emissions-waste-Energy -7":"How much energy (in MWh) was consumed from non-renewable sources during the reporting period?",
        "carbon-cdp-0":"Did your organization cancel any project-based carbon credits during the reporting year?",
        "carbon-cdp-1":"Can you provide details of the project-based carbon credits your organization canceled during the reporting year?",
        "carbon-cdp-2":"Did your organization cancel any Renewable Energy Certificates (RECs) during the reporting year?",
        "carbon-cdp-3":"Can you provide details of the Renewable Energy Certificates (RECs) your organization canceled during the reporting years?",
        "carbon-cdp-4":"Does your organization implement an internal carbon pricing mechanism?",
        "carbon-cdp-5":"How does your organization utilize internal carbon pricing in its operations and decision-making processes?",            
    }


const updatedEditAnswers: Record<string, string> = {};


Object.entries(editanswers).forEach(([key, question]) => {
  const match = editresponse?.find?.(
    (item: { question: string; answer: string | null }) =>
      item.question === question
  );
  updatedEditAnswers[key] = match ? match.answer || "" : "";
});




    // setAnswers(updatedEditAnswers);



    const handleRowClick = (record: any, sectionIndex: number) => {
        setSelectedRow(true)



        setShowQuestions(true);
        setCurrentSectionIndex(sectionIndex);
    };


    useEffect(() => {
        if ( updatedEditAnswers && Object.keys(updatedEditAnswers).length > 0) {
            setAnswers(updatedEditAnswers);
        }
        }, [activeCategory]); 



// console.log(answers)



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





    const handleFileUpload = async (info: any,section: string) => {
        console.log(section)
        const { file } = info;
        if (!file || file.status === "uploading") return;
        setLoading(true);
        
        try {
            const formData = new FormData();
            formData.append('file', file.originFileObj || file);
            formData.append('Categorie',section);

                const response = await fetch(`http://127.0.0.1:5000/extract/?Categorie=${section}`, {
                method: 'POST',
                body: formData,

            });


            if (!response.ok) {
                const errorText = await response.text();
                console.error("Server responded with error:", errorText);
                throw new Error(`Server error: ${response.status} - ${errorText}`);
            }

                const data = await response.json();
                console.log(data)
                setExtractBoolean(true)



    const readed={
            "general-company-overview-0":data["Report name"],
            "general-company-overview-1":data["Date"],
            "general-company-overview-2":data["industry"],
            "general-company-overview-3":data["Email"],
            "general-company-overview-4":data["Contact No"],
            "general-company-overview-5":data["What is the legal name of the company?"],
            "general-company-overview-6":data["What year was the company founded?"],
            "general-company-overview-7":data["Where is the company headquartered?"],
            "general-company-overview-8":data["How many locations/offices does the company operate in?"],
            "general-company-overview-9":data["What is the organizational structure of the company?"],
            "general-company-overview-10":data["How many employees does the company currently have?"],
            "general-company-overview-11":data["What are the company’s primary business activities?"],
            "general-company-overview-12":data["In which industries or sectors does the company operate?"],
            "general-company-overview-13":data["What are the company’s core products or services?"],
            "general-business-operations-0":data["What are the primary markets/geographies the company serves?"],
            "general-business-operations-1":data["What is the company’s annual revenue or turnover?"],
            "general-business-operations-2":data["How is the company funded?"],
            "general-business-operations-3":data["What percentage of the company’s operations are automated?"],
            "general-business-operations-4":data["What is the company’s supply chain structure?"],
            "general-business-operations-5":data["How does the company ensure quality control of its products/services?"],
            "general-business-operations-6":data["Does the company outsource any major business operations?"],
            "general-clients-partnerships-0":data["Who are the company’s main customers (B2B, B2C, etc.)?"],
            "general-clients-partnerships-1":data["Does the company have strategic partnerships or collaborations?"],
            "general-clients-partnerships-2":data["What percentage of revenue comes from the top 5 customers?"],
            "general-clients-partnerships-3":data["What is the customer retention rate over the past 3 years?"],
            "general-technology-innovation-0":data["What key technologies does the company use to operate its business?"],
            "general-technology-innovation-1":data["Does the company invest in R&D (Research & Development)?"],
            "general-technology-innovation-2":data["How often does the company upgrade its systems or processes?"],
            "general-risk-business-continuity-0":data["Does the company have a business continuity or disaster recovery plan?"],
            "general-risk-business-continuity-1":data["What are the major risks the company faces in operations?"],
            "general-risk-business-continuity-2":data["Does the company have insurance coverage for its key risks?"],
            "general-company-growth-0":data["What has been the average revenue growth rate over the past 5 years?"],
            "general-company-growth-1":data["Are there plans for company expansion (new locations, products, etc.)?"],
            "general-workforce-0":data["How is the workforce divided by function (operations, sales, admin)?"],
            "general-workforce-1":data["What is the company’s attrition rate for the past 3 years?"],
            "general-workforce-2":data["How does the company attract and retain talent?"],
            "supplierbenchmark-esg-policies-governance-0":data["Do you have a formal Environmental, Social, and Governance (ESG) policy?"],
            "supplierbenchmark-esg-policies-governance-1":data["Is your ESG policy aligned with global standards Like"],
            "supplierbenchmark-esg-policies-governance-2":data["How often is the ESG policy reviewed and updated?"],
            "supplierbenchmark-esg-policies-governance-3":data["How do you communicate ESG policies to internal and external stakeholders?"],
            "supplierbenchmark-risk-screening-0":data["Do you have a sustainability risk assessment process for suppliers?"],
            "supplierbenchmark-risk-screening-1":data["Are suppliers categorized based on sustainability risk levels (high, medium, low)?"],
            "supplierbenchmark-risk-screening-2":data["What are the most significant sustainability risks across your supplier base?"],
            "supplierbenchmark-risk-screening-3":data["How frequently are high-risk suppliers monitored for compliance and improvements?"],
            "supplierbenchmark-certification-compliance-0":data["Does your company hold any recognized environmental certifications?"],
            "supplierbenchmark-certification-compliance-1":data["Does your company hold any social certifications?"],
            "supplierbenchmark-certification-compliance-2":data["Does your company adhere to any sustainability reporting or management standards?"],
            "supplierbenchmark-certification-compliance-3":data["Does your company hold any governance or supply chain certifications?"],
            "supplierbenchmark-certification-compliance-4":data["How often are you audited for compliance with these certifications?"],
            "supplierbenchmark-certification-compliance-5":data["Are there any additional certifications you are pursuing If yes, please apply."],
            "supplierbenchmark-sustainbility-performance-0":data["Do you provide annual sustainability performance reports?"],
            "supplierbenchmark-sustainbility-performance-1":data["What KPIs do you use to measure your sustainability performance?"],
            "supplierbenchmark-sustainbility-performance-2":data["How transparent are you about your sustainability progress and challenges?"],
            "supplierbenchmark-collabration-innovation-0":data["Do you engage in sustainability innovation (e.g., circular economy, low-carbon products)?"],
            "supplierbenchmark-collabration-innovation-1":data["What challenges do you face in improving sustainability performance"],
            "performance-cdp-score-0":data["What is your current CDP score for Climate Change?"],
            "performance-cdp-score-1":data["What is your current CDP score for Water?"],
            "performance-cdp-score-2":data["What is your current CDP score for Forests?"],
            "product-supply-product-0":data["How many products have undergone a carbon footprint assessment?"],
            "product-supply-product-1":data["What is the product name, type, and function?"],
            "product-supply-product-2":data["What is the weight or volume of the product? (kg/L)"],
            "product-supply-product-3":data["What is the declared carbon footprint of the product (kg CO2e)?"],
            "product-supply-product-4":data["What raw materials are used in production?"],
            "product-supply-product-5":data["Provide % of raw materials sourced locally, regionally, and internationally."],
            "product-supply-product-6":data["What is the embodied carbon of the raw materials (kg CO2e) used in the product?"],
            "product-supply-product-7":data["Are suppliers certified for sustainable practices?"],
            "product-supply-product-8":data["Do suppliers disclose their carbon footprint data?"],
            "product-supply-product-9":data["What is the average transport distance for raw materials and finished goods (km)?"],
            "product-supply-product-10":data["Are logistics providers certified for sustainability?"],
            "product-supply-product-11":data["What is the total energy consumption (kWh) during production?"],
            "product-supply-product-12":data["What percentage of energy used during production comes from renewable sources?"],
            "product-supply-product-13":data["Are emissions mitigation technologies employed?"],
            "product-supply-product-14":data["What emissions are associated with end-of-life processes (kg CO2e)?"],
            "governace-certification-0":data["Does your company hold an ISO 14001 certification for environmental management?"],
            "governace-certification-1":data["Has your company obtained any other environmental management system certifications, eg EMAS (Eco-Management and Audit Scheme)?"],
            "governace-certification-2":data["Does your company hold an ISO 50001 certification for energy management?"],
            "governace-certification-3":data["Has your company obtained any other energy-related certifications/framework (e.g., IPMVP – International Performance Measurement and Verification Protocol)?"],
            "management-system-management-0":data["Does your company have a formal environmental policy that includes a commitment to legal compliance, continuous measurement, and continuous improvement in environmental performance?"],
            "management-system-management-1":data["Which of the following areas are included in your environmental policy?"],
            "management-system-management-2":data["Does your company organize training for employees on the environmental policy?"],
            "management-system-management-3":data["Does your site have an environmental management system (EMS) in place?"],
            "management-system-management-4":data["Does your site have an energy management system (EnMS) in place?"],
            "management-system-monitoring-0":data["What percentage of electricity used at your site in the last calendar year came from renewable sources?"],
            "management-system-monitoring-1":data["What percentage of heating/cooling used at your site in the last calendar year came from renewable sources?"],
            "emissions-waste-ghg-reporting-standards-methodology-0":data["What is the base year selected for your GHG inventory?"],
            "emissions-waste-ghg-reporting-standards-methodology-1":data["Which standard, protocol, or methodology has been applied to collect activity data and calculate emissions?"],
            "emissions-waste-ghg-reporting-standards-methodology-2":data["Has a documented framework been established to define operational and organizational boundaries for emissions reporting?"],
            "emissions-waste-emissions-w-0":data["What were your gross Scope 1 GHG emissions (in metric tons CO₂-equivalent) for the last reporting year?"],
            "emissions-waste-emissions-w-1":data["What percentage of your Scope 1 emissions comes from stationary combustion, transportation, or fugitive sources?"],
            "emissions-waste-emissions-w-2":data["Which gases were included in your Scope 1 emissions calculations?"],
            "emissions-waste-emissions-w-3":data["What were your gross Scope 2 emissions (in metric tons CO₂-equivalent) using the location-based method?"],
            "emissions-waste-emissions-w-4":data["If applicable, what were your gross Scope 2 emissions (in metric tons CO₂-equivalent) using the market-based method?"],
            "emissions-waste-supply-chain-emissions-0":data["What were your Scope 3 emissions (Supply Chain) in the last reporting period (please provide details in tCO2e for each)"],
            "emissions-waste-supply-chain-emissions-1":data["How many Scope 3 categories (out of 15) do you currently report?"],
            "emissions-waste-supply-chain-emissions-2":data["What percentage of your Scope 3 data is based on primary data from suppliers/customers versus estimated data?"],
            "emissions-waste-supply-chain-emissions-3":data["Which three Scope 3 categories contribute the most to your emissions?"],
            "emissions-waste-upstream-categories-0":data["What are your emissions from purchased goods and services (Scope 3, Category 1) in metric tons CO₂-equivalent?"],
            "emissions-waste-upstream-categories-1":data["What percentage of your suppliers (by spend) provide emissions data (Scope 3, Category 1)?"],
            "emissions-waste-upstream-categories-2":data["What are your emissions from capital goods (Scope 3, Category 2) in metric tons CO₂-equivalent?"],
            "emissions-waste-upstream-categories-3":data["Do you conduct lifecycle assessments for your major capital goods (Scope 3, Category 2)?"],
            "emissions-waste-upstream-categories-4":data["What are your emissions from upstream fuel and energy-related activities (Scope 3, Category 3) in metric tons CO₂-equivalent?"],
            "emissions-waste-upstream-categories-5":data["What are your emissions from transporting goods to your facilities (Scope 3, Category 4) in metric tons CO₂-equivalent?"],
            "emissions-waste-upstream-categories-6":data["What percentage of logistics providers use low-emission transportation methods (Scope 3, Category 4), such as EVs or rail?"],
            "emissions-waste-upstream-categories-7":data["What are your emissions from waste management (Scope 3, Category 5) in metric tons CO₂-equivalent?"],
            "emissions-waste-upstream-categories-8":data["What percentage of your soperational waste is recycled or composted (Scope 3, Category 5)?"],
            "emissions-waste-upstream-categories-9":data["What are your emissions from business travel (Scope 3, Category 6) in metric tons CO₂-equivalent?"],
            "emissions-waste-upstream-categories-10":data["What are your emissions from employee commuting (Scope 3, Category 7) in metric tons CO₂-equivalent?"],
            "emissions-waste-upstream-categories-11":data["What are your emissions from upstream leased assets (Scope 3, Category 8) in metric tons CO₂-equivalent?"],
            "emissions-waste-downstream-categories-0":data["What are your emissions from product distribution to customers (Scope 3, Category 9) in metric tons CO₂-equivalent?"],
            "emissions-waste-downstream-categories-1":data["What percentage of your transportation partners use low-carbon technologies (Scope 3, Category 9)?"],
            "emissions-waste-downstream-categories-2":data["What are your emissions from the processing of sold products (Scope 3, Category 10) in metric tons CO₂-equivalent?"],
            "emissions-waste-downstream-categories-3":data["What are the lifetime emissions (Scope 3, Category 11) from the use of your sold products in metric tons CO₂-equivalent?"],
            "emissions-waste-downstream-categories-4":data["What are your emissions from the disposal or recycling of your sold products (Scope 3, Category 12) in metric tons CO₂-equivalent?"],
            "emissions-waste-downstream-categories-5":data["What are your emissions from franchise operations (Scope 3, Category 14) in metric tons CO₂-equivalent?"],
            "emissions-waste-downstream-categories-6":data["What are your emissions from franchise operations (Scope 3, Category 14) in metric tons CO₂-equivalent?"],
            "emissions-waste-downstream-categories-7":data["What percentage of your franchises report emissions data (Scope 3, Category 14)?"],
            "emissions-waste-downstream-categories-8":data["What are your emissions from investment activities (Scope 3, Category 15) in metric tons CO₂-equivalent?"],
            "emissions-waste-downstream-categories-9":data["What percentage of your investment portfolio is assessed for GHG emissions (Scope 3, Category 15)?"],
            "emissions-waste-exclusion-0":data["What is the source of excluded emissions, and why are they excluded from the organization’s carbon accounting?"],
            "emissions-waste-exclusion-1":data["Which Scope(s) or Scope 3 categories do these excluded emissions belong to?"],
            "emissions-waste-ghg-reduction-targets-0":data["Does your company set Greenhouse Gas (GHG) reduction targets?"],
            "emissions-waste-ghg-reduction-targets-1":data["Have you implemented energy efficiency measures to reduce Scope 2 emissions If so, what is the percentage reduction achieved?"],
            "emissions-waste-ghg-reduction-targets-2":data["Are the GHG reduction targets approved by the Science Based Targets Initiative (SBTi)?"],
            "emissions-waste-ghg-reduction-targets-3":data["Does your company have emission reduction targets for your upstream supply chain emissions (Scope 3)?"],
            "emissions-waste-ghg-emissions-data-andanalys-0":data["Describe your gross global combined Scope 1 and 2 emissions for the reporting year in metric tons CO2e per unit currency total revenue. Include any additional intensity metrics relevant to your operations."],
            "emissions-waste-ghg-emissions-data-andanalys-1":data["Is your organization able to break down emissions data for any subsidiaries included in your CDP response?"],
            "emissions-waste-ghg-emissions-data-andanalys-2":data["Provide a breakdown of gross Scope 1 and Scope 2 emissions by subsidiary"],
            "emissions-waste-ghg-emissions-data-andanalys-3":data["How do your gross global emissions (Scope 1, &2 combined) for the reporting year compare to the previous reporting year?"],
            "emissions-waste-resource-management-0":data["What restricted substances are used at your site in production or operations?"],
            "emissions-waste-resource-management-1":data["Do you have protocols in place to manage restricted substances?"],
            "emissions-waste-resource-management-2":data["Which regulations are covered by your site’s written procedures for managing restricted substances"],
            "emissions-waste-Waste-0":data["Does your organization have a comprehensive Waste Management Plan covering construction waste, hazardous waste, wastewater, solid waste, and airborne emissions Provide evidence of past experience in managing and recycling construction waste."],
            "emissions-waste-Waste-1":data["Are systematic checks conducted to confirm the conformity of waste with the transfer note description (e.g., nature, volume, hazardousness)"],
            "emissions-waste-Waste-2":data["Is compliance with the ADR (European Agreement concerning the International Carriage of Dangerous Goods by Road) agreement (road transport of hazardous goods) ensured?"],
            "emissions-waste-Waste-3":data["What is the total weight of hazardous waste generated in tons?"],
            "emissions-waste-Waste-4":data["What is the total weight of non-hazardous waste generated in tons?"],
            "emissions-waste-Waste-5":data["Provide the total weight of other waste types, including electronic waste, organic waste, and recyclable materials, if applicable."],
            "emissions-waste-biodiversity-0":data["Does your organization have a policy in place for protecting biodiversity and natural resources?"],
            "emissions-waste-biodiversity-1":data["Is there oversight or responsibility for biodiversity matters at the board or executive management level within the organization?"],
            "emissions-waste-biodiversity-2":data["Has your organization publicly committed to biodiversity initiatives or endorsed any related programs?"],
            "emissions-waste-biodiversity-3":data["Does your organization evaluate the impacts and dependencies of its value chain on biodiversity?"],
            "emissions-waste-biodiversity-4":data["Are any organizational activities located in or near biodiversity-sensitive areas during the reporting year If yes, provide details of these activities."],
            "emissions-waste-biodiversity-5":data["Does your organization use biodiversity indicators to monitor and evaluate performance across its operations?"],
            "emissions-waste-biodiversity-6":data["Does  your organization’s operations negatively impact biodiversity or natural habitats?"],
            "emissions-waste-Energy -0":data["What is the total consumption of purchased electricity (in MWh) during the reporting period?"],
            "emissions-waste-Energy -1":data["What is the total consumption of self-generated electricity (in MWh) during the reporting period?"],
            "emissions-waste-Energy -2":data["Is this electricity consumption excluded from your RE100 commitment?"],
            "emissions-waste-Energy -3":data["What is the total consumption of purchased heat, steam, and cooling (in MWh) during the reporting period?"],
            "emissions-waste-Energy -4":data["What is the total consumption of self-generated heat, steam, and cooling (in MWh) during the reporting period?"],
            "emissions-waste-Energy -5":data["What is the total heating value (in MWh) for your organization's energy consumption?"],
            "emissions-waste-Energy -6":data["How much energy (in MWh) was consumed from renewable sources during the reporting period?"],
            "emissions-waste-Energy -7":data["How much energy (in MWh) was consumed from non-renewable sources during the reporting period?"],
            "carbon-cdp-0":data["Did your organization cancel any project-based carbon credits during the reporting year?"],
            "carbon-cdp-1":data["Can you provide details of the project-based carbon credits your organization canceled during the reporting year?"],
            "carbon-cdp-2":data["Did your organization cancel any Renewable Energy Certificates (RECs) during the reporting year?"],
            "carbon-cdp-3":data["Can you provide details of the Renewable Energy Certificates (RECs) your organization canceled during the reporting years?"],
            "carbon-cdp-4":data["Does your organization implement an internal carbon pricing mechanism?"],
            "carbon-cdp-5":data["How does your organization utilize internal carbon pricing in its operations and decision-making processes?"],            
        }
                    setExtractFill(data)
                
                setAnswers(readed)
                console.log(answers)

    
                            
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

if (! response.ok){
  throw new Error (`HTTP Status:${response.status}`);
}
    const result = await response.json();
    if (result == null){
    message.warning("EDIT THIS FILE !")

    }
    else{
  message.success(`${result} File edited sucessfully !`)
            navigate("//dashboard");

    return result}
}
  catch(error){

    console.error("Delete error:", error);
    message.error("Failed to delete report.");
  }
}
else{
    console.log("****************POST*******************")
    
try {
    // console.log("extrcatfill",extractFill)
    // console.log("write",write)


    const bodyData = {
        item: item,
        activeCategory: activeCategory,
        submitdata: extractBoolean ? extractFill : write,
        // submitdata: Object.keys(extractFill).length > 0 ? extractFill : write,
        
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
            // navigate("/sss/dashboard");
    
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
        console.log(categoryKey)

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
        "supplierbenchmark-risk-screening-1":"Are suppliers categorized based on sustainability risk levels (high, medium, low)?",
        "supplierbenchmark-risk-screening-2":"What are the most significant sustainability risks across your supplier base?",
        "supplierbenchmark-risk-screening-3":"How frequently are high-risk suppliers monitored for compliance and improvements?",
        "supplierbenchmark-certification-compliance-0":"Does your company hold any recognized environmental certifications?",
        "supplierbenchmark-certification-compliance-1":"Does your company hold any social certifications?",
        "supplierbenchmark-certification-compliance-2":"Does your company adhere to any sustainability reporting or management standards?",
        "supplierbenchmark-certification-compliance-3":"Does your company hold any governance or supply chain certifications?",
        "supplierbenchmark-certification-compliance-4":"How often are you audited for compliance with these certifications?",
        "supplierbenchmark-certification-compliance-5":"Are there any additional certifications you are pursuing If yes, please apply.",
        "supplierbenchmark-sustainbility-performance-0":"Do you provide annual sustainability performance reports?",
        "supplierbenchmark-sustainbility-performance-1":"What KPIs do you use to measure your sustainability performance?",
        "supplierbenchmark-sustainbility-performance-2":"How transparent are you about your sustainability progress and challenges?",
        "supplierbenchmark-collabration-innovation-0":"Do you engage in sustainability innovation (e.g., circular economy, low-carbon products)?",
        "supplierbenchmark-collabration-innovation-1":"What challenges do you face in improving sustainability performance",
        "performance-cdp-score-0":"What is your current CDP score for Climate Change?",
        "performance-cdp-score-1":"What is your current CDP score for Water?",
        "performance-cdp-score-2":"What is your current CDP score for Forests?",
        "product-supply-product-0":"How many products have undergone a carbon footprint assessment?",
        "product-supply-product-1":"What is the product name, type, and function?",
        "product-supply-product-2":"What is the weight or volume of the product (kg/L)?",
        "product-supply-product-3":"What is the declared carbon footprint of the product (kg CO2e)?",
        "product-supply-product-4":"What raw materials are used in production?",
        "product-supply-product-5":"Provide % of raw materials sourced locally, regionally, and internationally.",
        "product-supply-product-6":"What is the embodied carbon of the raw materials (kg CO2e) used in the product?",
        "product-supply-product-7":"Are suppliers certified for sustainable practices?",
        "product-supply-product-8":"Do suppliers disclose their carbon footprint data?",
        "product-supply-product-9":"What is the average transport distance for raw materials and finished goods (km)?",
        "product-supply-product-10":"Are logistics providers certified for sustainability?",
        "product-supply-product-11":"What is the total energy consumption (kWh) during production?",
        "product-supply-product-12":"What percentage of energy used during production comes from renewable sources?",
        "product-supply-product-13":"Are emissions mitigation technologies employed?",
        "product-supply-product-14":"What emissions are associated with end-of-life processes (kg CO2e)?",
        "governace-certification-0":"Does your company hold an ISO 14001 certification for environmental management?",
        "governace-certification-1":"Has your company obtained any other environmental management system certifications, eg EMAS (Eco-Management and Audit Scheme) ?",
        "governace-certification-2":"Does your company hold an ISO 50001 certification for energy management?",
        "governace-certification-3":"Has your company obtained any other energy-related certifications/framework (e.g., IPMVP – International Performance Measurement and Verification Protocol)?",
        "management-system-management-0":"Does your company have a formal environmental policy that includes a commitment to legal compliance, continuous measurement, and continuous improvement in environmental performance?",
        "management-system-management-1":"Which of the following areas are included in your environmental policy?",
        "management-system-management-2":"Does your company organize training for employees on the environmental policy?",
        "management-system-management-3":"Does your site have an environmental management system (EMS) in place?",
        "management-system-management-4":"Does your site have an energy management system (EnMS) in place?",
        "management-system-monitoring-0":"What percentage of electricity used at your site in the last calendar year came from renewable sources?",
        "management-system-monitoring-1":"What percentage of heating/cooling used at your site in the last calendar year came from renewable sources?",
        "emissions-waste-ghg-reporting-standards-methodology-0":"What is the base year selected for your GHG inventory?",
        "emissions-waste-ghg-reporting-standards-methodology-1":"Which standard, protocol, or methodology has been applied to collect activity data and calculate emissions?",
        "emissions-waste-ghg-reporting-standards-methodology-2":"Has a documented framework been established to define operational and organizational boundaries for emissions reporting?",
        "emissions-waste-emissions-w-0":"What were your gross Scope 1 GHG emissions (in metric tons CO₂-equivalent) for the last reporting year?",
        "emissions-waste-emissions-w-1":"What percentage of your Scope 1 emissions comes from stationary combustion, transportation, or fugitive sources?",
        "emissions-waste-emissions-w-2":"Which gases were included in your Scope 1 emissions calculations?",
        "emissions-waste-emissions-w-3":"What were your gross Scope 2 emissions (in metric tons CO₂-equivalent) using the location-based method?",
        "emissions-waste-emissions-w-4":"If applicable, what were your gross Scope 2 emissions (in metric tons CO₂-equivalent) using the market-based method",
        "emissions-waste-supply-chain-emissions-0":"What were your Scope 3 emissions (Supply Chain) in the last reporting period (please provide details in tCO2e for each)",
        "emissions-waste-supply-chain-emissions-1":"How many Scope 3 categories (out of 15) do you currently report?",
        "emissions-waste-supply-chain-emissions-2":"What percentage of your Scope 3 data is based on primary data from suppliers/customers versus estimated data?",
        "emissions-waste-supply-chain-emissions-3":"Which three Scope 3 categories contribute the most to your emissions?",
        "emissions-waste-upstream-categories-0":"What are your emissions from purchased goods and services (Scope 3, Category 1) in metric tons CO₂-equivalent?",
        "emissions-waste-upstream-categories-1":"What percentage of your suppliers (by spend) provide emissions data (Scope 3, Category 1)?",
        "emissions-waste-upstream-categories-2":"What are your emissions from capital goods (Scope 3, Category 2) in metric tons CO₂-equivalent?",
        "emissions-waste-upstream-categories-3":"Do you conduct lifecycle assessments for your major capital goods (Scope 3, Category 2)?",
        "emissions-waste-upstream-categories-4":"What are your emissions from upstream fuel and energy-related activities (Scope 3, Category 3) in metric tons CO₂-equivalent?",
        "emissions-waste-upstream-categories-5":"What are your emissions from transporting goods to your facilities (Scope 3, Category 4) in metric tons CO₂-equivalent?",
        "emissions-waste-upstream-categories-6":"What percentage of logistics providers use low-emission transportation methods (Scope 3, Category 4), such as EVs or rail?",
        "emissions-waste-upstream-categories-7":"What are your emissions from waste management (Scope 3, Category 5) in metric tons CO₂-equivalent?",
        "emissions-waste-upstream-categories-8":"What percentage of your soperational waste is recycled or composted (Scope 3, Category 5)?",
        "emissions-waste-upstream-categories-9":"What are your emissions from business travel (Scope 3, Category 6) in metric tons CO₂-equivalent?",
        "emissions-waste-upstream-categories-10":"What are your emissions from employee commuting (Scope 3, Category 7) in metric tons CO₂-equivalent?",
        "emissions-waste-upstream-categories-11":"What are your emissions from upstream leased assets (Scope 3, Category 8) in metric tons CO₂-equivalent?",
        "emissions-waste-downstream-categories-0":"What are your emissions from product distribution to customers (Scope 3, Category 9) in metric tons CO₂-equivalent?",
        "emissions-waste-downstream-categories-1":"What percentage of your transportation partners use low-carbon technologies (Scope 3, Category 9)?",
        "emissions-waste-downstream-categories-2":"What are your emissions from the processing of sold products (Scope 3, Category 10) in metric tons CO₂-equivalent?",
        "emissions-waste-downstream-categories-3":"What are the lifetime emissions (Scope 3, Category 11) from the use of your sold products in metric tons CO₂-equivalent?",
        "emissions-waste-downstream-categories-4":"What are your emissions from the disposal or recycling of your sold products (Scope 3, Category 12) in metric tons CO₂-equivalent?",
        "emissions-waste-downstream-categories-5":"What are your emissions from franchise operations (Scope 3, Category 14) in metric tons CO₂-equivalent?",
        "emissions-waste-downstream-categories-6":"What are your emissions from franchise operations (Scope 3, Category 14) in metric tons CO₂-equivalent?",
        "emissions-waste-downstream-categories-7":"What percentage of your franchises report emissions data (Scope 3, Category 14)?",
        "emissions-waste-downstream-categories-8":"What are your emissions from investment activities (Scope 3, Category 15) in metric tons CO₂-equivalent?",
        "emissions-waste-downstream-categories-9":"What percentage of your investment portfolio is assessed for GHG emissions (Scope 3, Category 15)?",
        "emissions-waste-exclusion-0":"What is the source of excluded emissions, and why are they excluded from the organization’s carbon accounting?",
        "emissions-waste-exclusion-1":"Which Scope(s) or Scope 3 categories do these excluded emissions belong to?",
        "emissions-waste-ghg-reduction-targets-0":"Does your company set Greenhouse Gas (GHG) reduction targets?",
        "emissions-waste-ghg-reduction-targets-1":"Have you implemented energy efficiency measures to reduce Scope 2 emissions If so, what is the percentage reduction achieved?",
        "emissions-waste-ghg-reduction-targets-2":"Are the GHG reduction targets approved by the Science Based Targets Initiative (SBTi)?",
        "emissions-waste-ghg-reduction-targets-3":"Does your company have emission reduction targets for your upstream supply chain emissions (Scope 3)?",
        "emissions-waste-ghg-emissions-data-andanalys-0":"Describe your gross global combined Scope 1 and 2 emissions for the reporting year in metric tons CO2e per unit currency total revenue. Include any additional intensity metrics relevant to your operations. ",
        "emissions-waste-ghg-emissions-data-andanalys-1":"Is your organization able to break down emissions data for any subsidiaries included in your CDP response?",
        "emissions-waste-ghg-emissions-data-andanalys-2":"Provide a breakdown of gross Scope 1 and Scope 2 emissions by subsidiary",
        "emissions-waste-ghg-emissions-data-andanalys-3":"How do your gross global emissions (Scope 1, &2 combined) for the reporting year compare to the previous reporting year?",
        "emissions-waste-resource-management-0":"What restricted substances are used at your site in production or operations?",
        "emissions-waste-resource-management-1":"Do you have protocols in place to manage restricted substances?",
        "emissions-waste-resource-management-2":"Which regulations are covered by your site’s written procedures for managing restricted substances",
        "emissions-waste-Waste-0":"Does your organization have a comprehensive Waste Management Plan covering construction waste, hazardous waste, wastewater, solid waste, and airborne emissions Provide evidence of past experience in managing and recycling construction waste.",
        "emissions-waste-Waste-1":"Are systematic checks conducted to confirm the conformity of waste with the transfer note description (e.g., nature, volume, hazardousness)",
        "emissions-waste-Waste-2":"Is compliance with the ADR (European Agreement concerning the International Carriage of Dangerous Goods by Road) agreement (road transport of hazardous goods) ensured?",
        "emissions-waste-Waste-3":"What is the total weight of hazardous waste generated in tons?",
        "emissions-waste-Waste-4":"What is the total weight of non-hazardous waste generated in tons?",
        "emissions-waste-Waste-5":"Provide the total weight of other waste types, including electronic waste, organic waste, and recyclable materials, if applicable.",
        "emissions-waste-biodiversity-0":"Does your organization have a policy in place for protecting biodiversity and natural resources?",
        "emissions-waste-biodiversity-1":"Is there oversight or responsibility for biodiversity matters at the board or executive management level within the organization?",
        "emissions-waste-biodiversity-2":"Has your organization publicly committed to biodiversity initiatives or endorsed any related programs?",
        "emissions-waste-biodiversity-3":"Does your organization evaluate the impacts and dependencies of its value chain on biodiversity?",
        "emissions-waste-biodiversity-4":"Are any organizational activities located in or near biodiversity-sensitive areas during the reporting year If yes, provide details of these activities.",
        "emissions-waste-biodiversity-5":"Does your organization use biodiversity indicators to monitor and evaluate performance across its operations?",
        "emissions-waste-biodiversity-6":"Does  your organization’s operations negatively impact biodiversity or natural habitats?",
        "emissions-waste-Energy -0":"What is the total consumption of purchased electricity (in MWh) during the reporting period?",
        "emissions-waste-Energy -1":"What is the total consumption of self-generated electricity (in MWh) during the reporting period?",
        "emissions-waste-Energy -2":"Is this electricity consumption excluded from your RE100 commitment?",
        "emissions-waste-Energy -3":"What is the total consumption of purchased heat, steam, and cooling (in MWh) during the reporting period?",
        "emissions-waste-Energy -4":"What is the total consumption of self-generated heat, steam, and cooling (in MWh) during the reporting period?",
        "emissions-waste-Energy -5":"What is the total heating value (in MWh) for your organization's energy consumption?",
        "emissions-waste-Energy -6":"How much energy (in MWh) was consumed from renewable sources during the reporting period?",
        "emissions-waste-Energy -7":"How much energy (in MWh) was consumed from non-renewable sources during the reporting period?",
        "carbon-cdp-0":"Did your organization cancel any project-based carbon credits during the reporting year?",
        "carbon-cdp-1":"Can you provide details of the project-based carbon credits your organization canceled during the reporting year?",
        "carbon-cdp-2":"Did your organization cancel any Renewable Energy Certificates (RECs) during the reporting year?",
        "carbon-cdp-3":"Can you provide details of the Renewable Energy Certificates (RECs) your organization canceled during the reporting years?",
        "carbon-cdp-4":"Does your organization implement an internal carbon pricing mechanism?",
        "carbon-cdp-5":"How does your organization utilize internal carbon pricing in its operations and decision-making processes?",            
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
                                            onChange={(info) => handleFileUpload(info,activeCategory)}>
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
