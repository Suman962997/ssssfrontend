export const options = [
  { label: "This Month", value: "1" },
  { label: "Last Year", value: "2" },
];


export const userInfo = {
  name: "Mugesh",
  email: "mugesh.raj09@email.com",
  phone: "9637892021",
  user: "Admin",
};

export const allCategories = [
  {
    key: "general",
    section: "General Information",
    questionsAnswer: "1/3",
    percentComplete: "40%",
    questions: [
      {
        key: "company-overview",
        quesSection: "Company Overview",
        questionsAnswer: "0/9",
        percentComplete: "0",
        question: [
          { text: "What is the legal name of the company?", choices: null },
          { text: "What year was the company founded?", choices: null },
          { text: "Where is the company headquartered?", choices: null },
          { text: "How many locations/offices does the company operate in?", choices: null },
          {
            text: "What is the organizational structure of the company?",
            choices: ["Flat", "Hierarchical", "Matrix", "Other"],
          },
          { text: "How many employees does the company currently have?", choices: null },
          { text: "What are the company’s primary business activities?", choices: null },
          { text: "In which industries or sectors does the company operate?", choices: null },
          { text: "What are the company’s core products or services?", choices: null },
        ],
      },
      {
        key: "business-operations",
        quesSection: "Business Operations",
        questionsAnswer: "0/7",
        percentComplete: "0",
        question: [
          { text: "What are the primary markets/geographies the company serves?", choices: null },
          { text: "What is the company’s annual revenue or turnover?", choices: null },
          { text: "How is the company funded?", choices: null },
          { text: "What percentage of the company’s operations are automated?", choices: null },
          { text: "What is the company’s supply chain structure?", choices: null },
          { text: "How does the company ensure quality control of its products/services?", choices: null },
          { text: "Does the company outsource any major business operations?", choices: ["Yes", "No"] },
        ],
      },
      {
        key: "clients-partnerships",
        quesSection: "Clients Partnerships",
        questionsAnswer: "0/4",
        percentComplete: "0",
        question: [
          { text: "Who are the company’s main customers (B2B, B2C, etc.)?", choices: null },
          { text: "Does the company have strategic partnerships or collaborations?", choices: null },
          { text: "What percentage of revenue comes from the top 5 customers?", choices: null },
          { text: "What is the customer retention rate over the past 3 years?", choices: null },
        ],
      },
      {
        key: "technology-innovation",
        quesSection: "Technology Innovation",
        questionsAnswer: "0/3",
        percentComplete: "0",
        question: [
          { text: "What key technologies does the company use to operate its business?", choices: null },
          { text: "Does the company invest in R&D (Research & Development)?", choices: ["Yes", "No"] },
          { text: "How often does the company upgrade its systems or processes?", choices: null },
        ],
      },
      {
        key: "company-growth",
        quesSection: "Company Growth",
        questionsAnswer: "0/2",
        percentComplete: "0",
        question: [
          { text: "What has been the average revenue growth rate over the past 5 years?", choices: null },
          { text: "Are there plans for company expansion (new locations, products, etc.)?", choices: ["Yes", "No"] },
        ],
      },
      {
        key: "workforce",
        quesSection: "Workforce",
        questionsAnswer: "0/3",
        percentComplete: "0",
        question: [
          { text: "How is the workforce divided by function (operations, sales, admin)?", choices: null },
          { text: "What is the company’s attrition rate for the past 3 years?", choices: null },
          { text: "How does the company attract and retain talent?", choices: null },
        ],
      },
    ],
  },
  {
    key: "supplierbenchmark",
    section: "Supplier Benchmark",
    questionsAnswer: "3/3",
    percentComplete: "90%",
    questions: [
      {
        key: "esg-policies-governance",
        quesSection: "ESG Policies Governance",
        questionsAnswer: "0/4",
        percentComplete: "0",
        question: [
          { text: "Do you have a formal Environmental, Social, and Governance (ESG) policy?", choices: ["Yes", "No"] },
          { text: "Is your ESG policy aligned with global standards?", choices: ["Yes", "No"] },
          { text: "How often is the ESG policy reviewed and updated?", choices: null },
          { text: "How do you communicate ESG policies to internal and external stakeholders?", choices: null },
        ],
      },
      {
        key: "risk-screening",
        quesSection: "Risk Screening",
        questionsAnswer: "0/3",
        percentComplete: "0",
        question: [
          { text: "Do you have a sustainability risk assessment process for suppliers?", choices: ["Yes", "No"] },
          { text: "Are suppliers categorized based on sustainability risk levels (high, medium, low)?", choices: ["Yes", "No"] },
          { text: "What are the most significant sustainability risks across your supplier base?", choices: null },
          { text: "How frequently are high-risk suppliers monitored for compliance and improvements?", choices: null },
        ],
      },
      {
        key: "certification-compliance",
        quesSection: "Certification Compliance",
        questionsAnswer: "0/3",
        percentComplete: "0",
        question: [
          { text: "Does your company hold any recognized environmental certifications?", choices: null },
          { text: "Does your company hold any social certifications?", choices: null },
          { text: "Does your company adhere to any sustainability reporting or management standards?", choices: null },
        ],
      },
    ],
  },
  // {
  //   key: "emission",
  //   section: "Emission",
  //   questionsAnswer: "0/3",
  //   percentComplete: "0%",
  //   questions: [
  //     {
  //       key: "ghg-emissions",
  //       quesSection: "GHG Emissions",
  //       questionsAnswer: "0/5",
  //       percentComplete: "0",
  //       question: [
  //         { text: "Do you measure and report greenhouse gas emissions, including Scope 1, Scope 2, and Scope 3 categories?", choices: ["Yes", "No"] },
  //         { text: "Are your emissions data externally verified for accuracy and reliability?", choices: ["Yes", "No"] },
  //         { text: "Has your company set formal targets to reduce Greenhouse Gas (GHG) emissions?", choices: ["Yes", "No"] },
  //         { text: "Are your emissions reduction targets approved by the Science Based Targets initiative (SBTi)?", choices: ["Yes", "No"] },
  //         { text: "Do your emissions reduction goals extend to supply chain emissions (Scope 3)?", choices: ["Yes", "No"] },
  //       ],
  //     },
  //     {
  //       key: "stationary-combustion",
  //       quesSection: "Stationary Combustion",
  //       questionsAnswer: "0/4",
  //       percentComplete: "0",
  //       question: [
  //         { text: "What are the fuel types used in stationary sources like boilers, furnaces, and generators?", choices: null },
  //         { text: "How is the fuel consumption monitored and recorded for stationary combustion sources?", choices: null },
  //         { text: "What is the thermal efficiency of your stationary combustion equipment?", choices: null },
  //         { text: "Are there any emissions control technologies installed for stationary combustion sources?", choices: ["Yes", "No"] },
  //       ],
  //     },
  //     {
  //       key: "mobile-combustion",
  //       quesSection: "Mobile Combustion",
  //       questionsAnswer: "0/5",
  //       percentComplete: "0",
  //       question: [
  //         { text: "What types of vehicles are part of your operational fleet?", choices: null },
  //         { text: "How are fuel consumption and mileage tracked for company vehicles?", choices: null },
  //         { text: "What initiatives have been implemented to reduce fleet emissions?", choices: null },
  //         { text: "What is the average fuel efficiency of your operational fleet (miles per gallon or km per liter)?", choices: null },
  //         { text: "Do you use telematics or GPS systems to monitor fuel efficiency and route optimization?", choices: ["Yes", "No"] },
  //       ],
  //     },
  //     {
  //       key: "fugitive-emmission",
  //       quesSection: "Fugitive-emission",
  //       questionsAnswer: "0/5",
  //       percentComplete: "0",
  //       question: [
  //         { text: "What types of refrigerants are used in your operations, and how are leaks monitored?", choices: null },
  //         { text: "What is the total charge capacity of refrigerants in your systems?", choices: null },
  //         { text: "Are gas leak detection systems (e.g., infrared cameras, ultrasonic sensors) deployed for refrigerants?", choices: ["Yes", "No"] },
  //         { text: "How frequently are HVAC and refrigeration systems inspected for leaks?", choices: null },
  //         { text: "What percentage of fugitive emissions are recovered or minimized through leak management?", choices: null },
  //       ],
  //     },
  //   ],
  // },
  {
    key: "supplier-strategy",
    section: "Supplier Strategy & SDG Roadmap",
    questionsAnswer: "1/3",
    percentComplete: "40%",
    questions: [
      {
        key: "supplier",
        quesSection: "Supplier",
        questionsAnswer: "0/0",
        percentComplete: "0",
        question: [
        ],
      },
    ]
  },
  {
    key: "performance",
    section: "Performance Reporting",
    questionsAnswer: "1/3",
    percentComplete: "40%",
    questions: [
      {
        key: "cdp-score",
        quesSection: "CDP Score",
        questionsAnswer: "0/3",
        percentComplete: "0",
        question: [
          { text: "What is your current CDP score for Climate Change?", choices: null },
          { text: "What is your current CDP score for Water?", choices: null },
          { text: "What is your current CDP score for Forests?", choices: null },
        ],
      },
    ]
  },

  {
    key: "product-supply",
    section: "Product & Supply Chain Footprint",
    questionsAnswer: "1/3",
    percentComplete: "40%",
    questions: [
      {
        key: "product",
        quesSection: "Product",
        questionsAnswer: "0/0",
        percentComplete: "0",
        question: [
        ],
      },
    ]
  },
  {
    key: "governace",
    section: "Governace & Certificate",
    questionsAnswer: "1/3",
    percentComplete: "40%",
    questions: [
      {
        key: "certification",
        quesSection: "Certification",
        questionsAnswer: "0/4",
        percentComplete: "0",
        question: [
          { text: "Does your company hold an ISO 14001 certification for environmental management?", choices: null },
          { text: "Has your company obtained any other environmental management system certifications, eg EMAS (Eco-Management and Audit Scheme) ?", choices: null },
          { text: "Does your company hold an ISO 50001 certification for energy management?", choices: null },
          { text: "Has your company obtained any other energy-related certifications/framework (e.g., IPMVP – International Performance Measurement and Verification Protocol)?", choices: null },

        ],
      },
    ]
  },
  {
    key: "management-system",
    section: "M,R & Management System",
    questionsAnswer: "1/3",
    percentComplete: "40%",
    questions: [
      {
        key: "management",
        quesSection: "Management",
        questionsAnswer: "0/5",
        percentComplete: "0",
        question: [
          { text: "Does your company have a formal environmental policy that includes a commitment to legal compliance, continuous measurement, and continuous improvement in environmental performance?", choices: null },
          { text: "Which of the following areas are included in your environmental policy?", choices: null },
          { text: "Does your company organize training for employees on the environmental policy?", choices: null },
          { text: "Does your site have an environmental management system (EMS) in place?", choices: null },
          { text: "Does your site have an energy management system (EnMS) in place?", choices: null },
        ],
      },
      {
        key: "monitoring",
        quesSection: "Monitoring",
        questionsAnswer: "0/2",
        percentComplete: "0",
        question: [
          { text: "What percentage of electricity used at your site in the last calendar year came from renewable sources?", choices: null },
          { text: "What percentage of heating/cooling used at your site in the last calendar year came from renewable sources?", choices: null },
        ],
      },
    ]
  },
  {
    key: "emissions-waste",
    section: "Emissions , Waste & Biodiversity",
    questionsAnswer: "1/3",
    percentComplete: "40%",
    questions: [
      {
        key: "ghg-reporting-standards-methodology",
        quesSection: "GHG Reporting Standards & Methodology",
        questionsAnswer: "0/3",
        percentComplete: "0",
        question: [
          { text: "What is the base year selected for your GHG inventory?", choices: null },
          { text: "Which standard, protocol, or methodology has been applied to collect activity data and calculate emissions?", choices: null },
          { text: "Has a documented framework been established to define operational and organizational boundaries for emissions reporting?", choices: null },
        ],
      },
      {
        key: "emissions-w",
        quesSection: "Emissions",
        questionsAnswer: "0/5",
        percentComplete: "0",
        question: [
          { text: "What were your gross Scope 1 GHG emissions (in metric tons CO₂-equivalent) for the last reporting year?", choices: null },
          { text: "What percentage of your Scope 1 emissions comes from stationary combustion, transportation, or fugitive sources?", choices: null },
          { text: "Which gases were included in your Scope 1 emissions calculations?", choices: null },
          { text: "What were your gross Scope 2 emissions (in metric tons CO₂-equivalent) using the location-based method?", choices: null },
          { text: "If applicable, what were your gross Scope 2 emissions (in metric tons CO₂-equivalent) using the market-based method?", choices: null },
        ],
      },
      {
        key: "supply-chain-emissions",
        quesSection: "Supply Chain Emissions",
        questionsAnswer: "0/4",
        percentComplete: "0",
        question: [
          { text: "What were your Scope 3 emissions (Supply Chain) in the last reporting period (please provide details in tCO2e for each)", choices: null },
          { text: "How many Scope 3 categories (out of 15) do you currently report?", choices: null },
          { text: "What percentage of your Scope 3 data is based on primary data from suppliers/customers versus estimated data?", choices: null },
          { text: "Which three Scope 3 categories contribute the most to your emissions", choices: null },
        ],
      },
      {
        key: "upstream-categories",
        quesSection: "Upstream Categories",
        questionsAnswer: "0/12",
        percentComplete: "0",
        question: [
          { text: "What are your emissions from purchased goods and services (Scope 3, Category 1) in metric tons CO₂-equivalent?", choices: null },
          { text: "What percentage of your suppliers (by spend) provide emissions data (Scope 3, Category 1)?", choices: null },
          { text: "What are your emissions from capital goods (Scope 3, Category 2) in metric tons CO₂-equivalent?", choices: null },
          { text: " Do you conduct lifecycle assessments for your major capital goods (Scope 3, Category 2)?", choices: null },
          { text: " What are your emissions from upstream fuel and energy-related activities (Scope 3, Category 3) in metric tons CO₂-equivalent?", choices: null },
          { text: " What are your emissions from transporting goods to your facilities (Scope 3, Category 4) in metric tons CO₂-equivalent?", choices: null },
          { text: "What percentage of logistics providers use low-emission transportation methods (Scope 3, Category 4), such as EVs or rail? ", choices: null },
          { text: "What are your emissions from waste management (Scope 3, Category 5) in metric tons CO₂-equivalent? ", choices: null },
          { text: "What percentage of your operational waste is recycled or composted (Scope 3, Category 5)? ", choices: null },
          { text: " What are your emissions from business travel (Scope 3, Category 6) in metric tons CO₂-equivalent?", choices: null },
          { text: " What are your emissions from employee commuting (Scope 3, Category 7) in metric tons CO₂-equivalent?", choices: null },
          { text: " What are your emissions from upstream leased assets (Scope 3, Category 8) in metric tons CO₂-equivalent?", choices: null },

        ],
      },
      {
        key: "downstream-categories",
        quesSection: "Downstream Categories",
        questionsAnswer: "0/10",
        percentComplete: "0",
        question: [
          { text: "What are your emissions from product distribution to customers (Scope 3, Category 9) in metric tons CO₂-equivalent?", choices: null },
          { text: "What percentage of your transportation partners use low-carbon technologies (Scope 3, Category 9)?", choices: null },
          { text: "What are your emissions from the processing of sold products (Scope 3, Category 10) in metric tons CO₂-equivalent?", choices: null },
          { text: "What are the lifetime emissions (Scope 3, Category 11) from the use of your sold products in metric tons CO₂-equivalent?", choices: null },
          { text: "What are your emissions from the disposal or recycling of your sold products (Scope 3, Category 12) in metric tons CO₂-equivalent?", choices: null },
          { text: "What are your emissions from downstream leased assets (Scope 3, Category 13) in metric tons CO₂-equivalent?", choices: null },
          { text: "What are your emissions from franchise operations (Scope 3, Category 14) in metric tons CO₂-equivalent?", choices: null },
          { text: "What percentage of your franchises report emissions data (Scope 3, Category 14)?", choices: null },
          { text: "What are your emissions from investment activities (Scope 3, Category 15) in metric tons CO₂-equivalent?", choices: null },
          { text: " What percentage of your investment portfolio is assessed for GHG emissions (Scope 3, Category 15)?", choices: null },


        ],
      },
      {
        key: "exclusion",
        quesSection: "Exclusion",
        questionsAnswer: "0/2",
        percentComplete: "0",
        question: [
          { text: "What is the source of excluded emissions, and why are they excluded from the organization’s carbon accounting?", choices: null },
          { text: "Which Scope(s) or Scope 3 categories do these excluded emissions belong to?", choices: null },
        ],
      },
      {
        key: "ghg-reduction-targets",
        quesSection: "GHG Reduction Targets",
        questionsAnswer: "0/4",
        percentComplete: "0",
        question: [
          { text: "Does your company set Greenhouse Gas (GHG) reduction targets?", choices: null },
          { text: "Have you implemented energy efficiency measures to reduce Scope 2 emissions? If so, what is the percentage reduction achieved?", choices: null },
          { text: "Are the GHG reduction targets approved by the Science Based Targets Initiative (SBTi)?", choices: null },
          { text: "Does your company have emission reduction targets for your upstream supply chain emissions (Scope 3)?", choices: null },
        ],
      },
      {
        key: "ghg-emissions-data-andanalys",
        quesSection: "GHG Emissions Data and Analysiss",
        questionsAnswer: "0/4",
        percentComplete: "0",
        question: [
          { text: "Describe your gross global combined Scope 1 and 2 emissions for the reporting year in metric tons CO2e per unit currency total revenue. Include any additional intensity metrics relevant to your operations. ", choices: null },
          { text: "Is your organization able to break down emissions data for any subsidiaries included in your CDP response?", choices: null },
          { text: "Provide a breakdown of gross Scope 1 and Scope 2 emissions by subsidiary", choices: null },
          { text: "How do your gross global emissions (Scope 1, &2 combined) for the reporting year compare to the previous reporting year?", choices: null },
        ],
      },
      {
        key: "resource-management",
        quesSection: "Resource Management",
        questionsAnswer: "0/3",
        percentComplete: "0",
        question: [
          { text: "What restricted substances are used at your site in production or operations?", choices: null },
          { text: "Do you have protocols in place to manage restricted substances?", choices: null },
          { text: "Which regulations are covered by your site’s written procedures for managing restricted substances", choices: null },
        ],
      },
      {
        key: "Waste",
        quesSection: "Waste",
        questionsAnswer: "0/6",
        percentComplete: "0",
        question: [
          { text: "Does your organization have a comprehensive Waste Management Plan covering construction waste, hazardous waste, wastewater, solid waste, and airborne emissions? Provide evidence of past experience in managing and recycling construction waste.", choices: null },
          { text: "Are systematic checks conducted to confirm the conformity of waste with the transfer note description (e.g., nature, volume, hazardousness)", choices: null },
          { text: "Is compliance with the ADR (European Agreement concerning the International Carriage of Dangerous Goods by Road) agreement (road transport of hazardous goods) ensured?", choices: null },
          { text: "What is the total weight of hazardous waste generated in tons?", choices: null },
          { text: "What is the total weight of non-hazardous waste generated in tons?", choices: null },
          { text: "Provide the total weight of other waste types, including electronic waste, organic waste, and recyclable materials, if applicable.", choices: null },

        ],
      },
      {
        key: "biodiversity",
        quesSection: "Biodiversity",
        questionsAnswer: "0/7",
        percentComplete: "0",
        question: [
          { text: "Does your organization have a policy in place for protecting biodiversity and natural resources?", choices: null },
          { text: "Is there oversight or responsibility for biodiversity matters at the board or executive management level within the organization?", choices: null },
          { text: "Has your organization publicly committed to biodiversity initiatives or endorsed any related programs?", choices: null },
          { text: "Does your organization evaluate the impacts and dependencies of its value chain on biodiversity?", choices: null },
          { text: "Are any organizational activities located in or near biodiversity-sensitive areas during the reporting year? If yes, provide details of these activities.", choices: null },
          { text: "Does your organization use biodiversity indicators to monitor and evaluate performance across its operations?", choices: null },
          { text: "Does  your organization’s operations negatively impact biodiversity or natural habitats?", choices: null },
        ],
      },
      {
        key: "Energy ",
        quesSection: "energy ",
        questionsAnswer: "0/8",
        percentComplete: "0",
        question: [
          { text: "What is the total consumption of purchased electricity (in MWh) during the reporting period?", choices: null },
          { text: "What is the total consumption of self-generated electricity (in MWh) during the reporting period?", choices: null },
          { text: "Is this electricity consumption excluded from your RE100 commitment?", choices: null },
          { text: "What is the total consumption of purchased heat, steam, and cooling (in MWh) during the reporting period?", choices: null },
          { text: "What is the total consumption of self-generated heat, steam, and cooling (in MWh) during the reporting period?", choices: null },
          { text: "What is the total heating value (in MWh) for your organization's energy consumption?", choices: null },
          { text: "How much energy (in MWh) was consumed from renewable sources during the reporting period?", choices: null },
          { text: "How much energy (in MWh) was consumed from non-renewable sources during the reporting period?", choices: null },
        ],
      },
    ]
  },

  {
    key: "carbon",
    section: "Carbon Offerts",
    questionsAnswer: "1/3",
    percentComplete: "40%",
    questions: [
      {
        key: "cdp",
        quesSection: "CDP",
        questionsAnswer: "0/6",
        percentComplete: "0",
        question: [
          { text: "Did your organization cancel any project-based carbon credits during the reporting year?", choices: null },
          { text: "Can you provide details of the project-based carbon credits your organization canceled during the reporting year?", choices: null },
          { text: "Did your organization cancel any Renewable Energy Certificates (RECs) during the reporting year?", choices: null },
          { text: "Can you provide details of the Renewable Energy Certificates (RECs) your organization canceled during the reporting year?", choices: null },
          { text: "Does your organization implement an internal carbon pricing mechanism?", choices: null },
          { text: "How does your organization utilize internal carbon pricing in its operations and decision-making processes?", choices: null },

        ],
      },
    ]
  },
  {
    key: "financial-tracking",
    section: "Financial Tracking",
    questionsAnswer: "1/3",
    percentComplete: "40%",
    questions: [
      {
        key: "cdp-score",
        quesSection: "Financial",
        questionsAnswer: "0/3",
        percentComplete: "0",
        question: [
        ],
      },
    ]
  },

];

