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

export const dateFormatOptions = [
  { value: 'MMM. d, yyyy', label: 'Abbreviated month (Jan. 1, 2025)' },
  { value: 'MMMM d, yyyy', label: 'Full month (January 1, 2025)' },
  { value: 'MM/dd/yyyy', label: 'Numeric (01/01/2025)' },
  { value: 'yyyy-MM-dd', label: 'ISO (2025-01-01)' },
];

export const timeFormatOptions = [
  { value: '12h', label: '12 Hour Format' },
  { value: '24h', label: '24 Hour Format' },
];


export const data = {
  countries: [
    { label: "usa", value: "United States" },
    { label: "uk", value: "United Kingdom" },
    { label: "canada", value: "Canada" },
    { label: "australia", value: "Australia" },
    { label: "germany", value: "Germany" }
  ],
  states: [
    { label: "california", value: "California" },
    { label: "texas", value: "Texas" },
    { label: "new-york", value: "New York" },
    { label: "florida", value: "Florida" },
    { label: "illinois", value: "Illinois" }
  ],
  cities: [
    { label: "los-angeles", value: "Los Angeles" },
    { label: "san-francisco", value: "San Francisco" },
    { label: "new-york-city", value: "New York City" },
    { label: "chicago", value: "Chicago" },
    { label: "miami", value: "Miami" }
  ]
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
          { text: "Report name", choices: null, isMandatory: false },
          { text: "Date", choices: null, isMandatory: false, type:"date"},
          { text: "industry", choices: null, isMandatory: false },
          { text: "Email", choices: null, isMandatory: false },
          { text: "Contact No", choices: null, isMandatory: false },

          { text: "What is the legal name of the company?", choices: null, isMandatory: false },
          { text: "What year was the company founded?", choices: null, isMandatory: false },
          { text: "Where is the company headquartered?", choices: null, isMandatory: false },
          {
            text: "How many locations/offices does the company operate in?", choices: ["Single location",
              "2-5 locations",
              "6-10 locations",
              "More than 10"], isMandatory: false
          },
          {
            text: "What is the organizational structure of the company?",
            choices: ["Functional", "Divisional", "Matrix", "Flat"], isMandatory: false,
          },
          {
            text: "How many employees does the company currently have?", choices: ["Less than 50",
              "51-200",
              "201-500",
              "501-1000",
            ], isMandatory: false
          },
          { text: "What are the company’s primary business activities?", choices: null, isMandatory: false },
          { text: "In which industries or sectors does the company operate?", choices: null, isMandatory: false },
          { text: "What are the company’s core products or services?", choices: null, isMandatory: false },
        ],
      },
      {
        key: "business-operations",
        quesSection: "Business Operations",
        questionsAnswer: "0/7",
        percentComplete: "0",
        question: [
          {
            text: "What are the primary markets/geographies the company serves?", choices: ["Local",
              "Regional",
              "National",
              "Internation"], isMandatory: false
          },
          {
            text: "What is the company’s annual revenue or turnover?", choices: ["Less than $1M",
              "$1M - $10M",
              "$10M - $50M",
              "More than $50M"], isMandatory: false
          },
          {
            text: "How is the company funded?", choices: ["Self-funded",
              "Investor-funded",
              "Publicly listed",
              "Other"], isMandatory: false
          },
          {
            text: "What percentage of the company’s operations are automated?", choices: ["0-25%",
              "26-50%",
              "51-75%",
              "76-100%"], isMandatory: false
          },
          {
            text: "What is the company’s supply chain structure?", choices: ["Single-tier supply chain",
              "Multi-tier supply chain",
              "Global supply chain",
              "Integrated supply chain"], isMandatory: false
          },
          {
            text: "How does the company ensure quality control of its products/services?", choices: ["In-house quality checks",
              "Third-party audits",
              "SO certifications",
              "Regular custom"], isMandatory: false
          },
          {
            text: "Does the company outsource any major business operations?", choices: ["Yes, production operations are outsourced (details required)",
              "Yes, logistics and supply chain management are outsourced (details required)",
              "Yes, IT or administrative functions are outsourced (details required)",
              "No, all major business operations are handled in-house"], isMandatory: false
          },
        ],
      },
      {
        key: "clients-partnerships",
        quesSection: "Clients Partnerships",
        questionsAnswer: "0/4",
        percentComplete: "0",
        question: [
          {
            text: "Who are the company’s main customers (B2B, B2C, etc.)?", choices: ["Business to Business (B2B)",
              "Business to Consumer (B2C)", "Both B2B and B2C",
              "Government or Institutional Customers"], isMandatory: false
          },
          {
            text: "Does the company have strategic partnerships or collaborations?", choices: ["Yes, with suppliers or manufacturers (details required)",
              "Yes, with research institutions or technology partners (details required)",
              "Yes, with NGOs or sustainability organizations (details required)",
              "No, the company operates independently without formal partnerships"], isMandatory: false
          },
          {
            text: "What percentage of revenue comes from the top 5 customers?", choices: ["Less than 10%",
              "10-30%",
              "31-50%",
              "More than 50%"], isMandatory: false
          },
          {
            text: "What is the customer retention rate over the past 3 years?", choices: ["Less than 50%",
              "50-75%",
              "76-90%",
              "More than 90%"], isMandatory: false
          },
        ],
      },
      {
        key: "technology-innovation",
        quesSection: "Technology Innovation",
        questionsAnswer: "0/3",
        percentComplete: "0",
        question: [
          { text: "What key technologies does the company use to operate its business?", choices: null, isMandatory: false },
          {
            text: "Does the company invest in R&D (Research & Development)?", choices: ["Yes, significant investment in R&D",
              "Yes, moderate or limited investment in R&D",
              "No, but plans to invest in the future",
              "No, the company does not focus on R&D"], isMandatory: false
          },
          {
            text: "How often does the company upgrade its systems or processes?", choices: ["Annually",
              "Every 2-3 years",
              "Rarely",
              "Not applicable"], isMandatory: false
          },
        ],
      },
      {
        key: "risk-business-continuity",
        quesSection: "Risk and Business Continuity",
        questionsAnswer: "0/3",
        percentComplete: "0",
        question: [
          {
            text: "Does the company have a business continuity or disaster recovery plan?", choices: ["Yes, regularly tested and updated",
              "Yes, but it has not been tested recently",
              "No, but currently developing one",
              "No, the company does not have a plan"], isMandatory: false
          },
          {
            text: "What are the major risks the company faces in operations?", choices: [
              "Operational risks",
              "Financial risks",
              "Cybersecurity risks", "Other"], isMandatory: false
          },
          {
            text: "Does the company have insurance coverage for its key risks?", choices: ["Yes, comprehensive coverage for key risks",
              "Yes, partial coverage for selected risks",
              "No, but plans to obtain coverage",
              "No, the company does not have insurance coverage"
            ], isMandatory: false
          },
        ],
      },
      {
        key: "company-growth",
        quesSection: "Company Growth",
        questionsAnswer: "0/2",
        percentComplete: "0",
        question: [
          {
            text: "What has been the average revenue growth rate over the past 5 years?", choices: ["Negative growth",
              "0-5%",
              "6-10%",
              "More than 10%"], isMandatory: false
          },
          {
            text: "Are there plans for company expansion (new locations, products, etc.)?", choices: ["Yes, plans for domestic expansion",
              "Yes, plans for international expansion",
              "Yes, expansion into new product or service lines",
              "No current plans for expansion"], isMandatory: false
          },
        ],
      },
      {
        key: "workforce",
        quesSection: "Workforce",
        questionsAnswer: "0/3",
        percentComplete: "0",
        question: [
          { text: "How is the workforce divided by function (operations, sales, admin)?", choices: null, isMandatory: false },
          {
            text: "What is the company’s attrition rate for the past 3 years?", choices: ["Less than 5%",
              "5-10%",
              "11-20%",
              "More than 20%"], isMandatory: false
          },
          { text: "How does the company attract and retain talent?", choices: null, isMandatory: false },
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
          { text: "Do you have a formal Environmental, Social, and Governance (ESG) policy?", choices: ["Yes", "No", "In Progress"], isMandatory: false },
          { text: "Is your ESG policy aligned with global standards Like", choices: null, isMandatory: false },
          {
            text: "How often is the ESG policy reviewed and updated?", choices: ["Annually",
              "Bi-annually",
              "Less frequently",
              "Not reviewed"], isMandatory: false
          },
          {
            text: "How do you communicate ESG policies to internal and external stakeholders?", choices: ["Internal training sessions",
              "Reports and public website",
              "Not communicated",
              "Regular stakeholder meetings and updates",
            ], isMandatory: false
          },
        ],
      },
      {
        key: "risk-screening",
        quesSection: "Risk Screening",
        questionsAnswer: "0/3",
        percentComplete: "0",
        question: [
          { text: "Do you have a sustainability risk assessment process for suppliers?", choices: ["Yes", "No", "In Progress", "Under development"], isMandatory: false },
          { text: "Are suppliers categorized based on sustainability risk levels (high, medium, low)?", choices: ["Yes", "No", "In Progress", "Under development"], isMandatory: false },
          {
            text: "What are the most significant sustainability risks across your supplier base?", choices: ["Environmental impacts",
              "Social impacts",
              "Governance and compliance risks",
              "Financial and market risks"], isMandatory: false
          },
          {
            text: "How frequently are high-risk suppliers monitored for compliance and improvements?", choices: ["Monthly",
              "Quarterly",
              "Annually",
              "Not monitored"], isMandatory: false
          },
        ],
      },
      {
        key: "certification-compliance",
        quesSection: "Certification Compliance",
        questionsAnswer: "0/3",
        percentComplete: "0",
        question: [
          {
            text: "Does your company hold any recognized environmental certifications?", choices: ["Yes, currently certified",
              "Certification in progress",
              "No, but planning to apply",
              "No, and no plans to apply"], isMandatory: false
          },
          {
            text: "Does your company hold any social certifications?", choices: ["Yes, currently certified",
              "Certification in progress",
              "No, but planning to apply",
              "No, and no plans to apply"], isMandatory: false
          },
          {
            text: "Does your company adhere to any sustainability reporting or management standards?", choices: ["Yes, currently certified",
              "Certification in progress",
              "No, but planning to apply",
              "No, and no plans to apply"], isMandatory: false
          },
          {
            text: "Does your company hold any governance or supply chain certifications?", choices: ["Yes, currently certified",
              "Certification in progress",
              "No, but planning to apply",
              "No, and no plans to apply"], isMandatory: false
          },
          {
            text: "How often are you audited for compliance with these certifications?", choices: ["Annually",
              "Bi-annually",
              "Less frequently",
              "Not audited"], isMandatory: false
          },
          {
            text: "Are there any additional certifications you are pursuing? If yes, please apply.", choices: null, isMandatory: false
          },
        ],
      },
      {
        key: "sustainbility-performance",
        quesSection: "Sustainability Performance",
        questionsAnswer: "0/3",
        percentComplete: "0",
        question: [
          {
            text: "Do you provide annual sustainability performance reports?", choices: ["Yes, public reports",
              "Yes, internal reports only",
              "No, but planning to start",
              "No, and no plans to start"], isMandatory: false
          },
          {
            text: "What KPIs do you use to measure your sustainability performance?", choices: ["Environmental Impact KPIs",
              "Resource Efficiency and Innovation KPIs",
              "Governance and Compliance KPIs",
              "Social and Economic Impact KPIs"], isMandatory: false
          },
          {
            text: "How transparent are you about your sustainability progress and challenges?", choices: ["Fully transparent",
              "Partially transparent",
              "Not transparent",
              "Committed to increasing transparency in the future"], isMandatory: false
          },
        ],
      },
      {
        key: "collabration-innovation",
        quesSection: "Collaboration & Innovation",
        questionsAnswer: "0/2",
        percentComplete: "0",
        question: [
          {
            text: "Do you engage in sustainability innovation (e.g., circular economy, low-carbon products)?", choices: ["Yes, fully engaged",
              "Partially engaged",
              "Not engaged",
              "Planning to engage in the near future"], isMandatory: false
          },
          {
            text: "What challenges do you face in improving sustainability performance", choices: ["Financial Constraints",
              "Technical Gaps",
              "Regulatory and Compliance Barriers",
              "Monitoring and Reporting Challenges"], isMandatory: false
          },
        ],
      },
    ],
  },
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
          { text: "What is your current CDP score for Climate Change?", choices: null, isMandatory: false },
          { text: "What is your current CDP score for Water?", choices: null, isMandatory: false },
          { text: "What is your current CDP score for Forests?", choices: null, isMandatory: false },
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
          { text: "How many products have undergone a carbon footprint assessment?", choices: null, isMandatory: true },
          { text: "What is the product name, type, and function?", choices: null, isMandatory: true },
          { text: "What is the weight or volume of the product? (kg/L)", choices: null, isMandatory: true },
          { text: "What is the declared carbon footprint of the product (kg CO2e)?", choices: null, isMandatory: true },
          { text: "What raw materials are used in production?", choices: null, isMandatory: false },
          { text: "Provide % of raw materials sourced locally, regionally, and internationally.", choices: null, isMandatory: false },
          { text: "What is the embodied carbon of the raw materials (kg CO2e) used in the product?", choices: null, isMandatory: false },
          { text: "Are suppliers certified for sustainable practices?", choices: ["Yes", "No", "In Progress", "Not applicable"], isMandatory: false },
          { text: "Do suppliers disclose their carbon footprint data? ", choices: ["Yes", "No", "In Progress", "Not applicable"], isMandatory: true },
          { text: "What is the average transport distance for raw materials and finished goods (km)?", choices: null, isMandatory: false },
          { text: "Are logistics providers certified for sustainability? ", choices: ["Yes", "No", "In Progress", "Not applicable"], isMandatory: false },
          { text: "What is the total energy consumption (kWh) during production?", choices: null, isMandatory: true },
          { text: "What percentage of energy used during production comes from renewable sources?", choices: null, isMandatory: false },
          { text: "Are emissions mitigation technologies employed?", choices: ["Yes", "No", "In Progress", "Not applicable"], isMandatory: false },
          { text: "What emissions are associated with end-of-life processes (kg CO2e)?", choices: null, isMandatory: false },


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
          { text: "Does your company hold an ISO 14001 certification for environmental management?", choices: ["Yes", "No", "In Progress", "Not applicable"], isMandatory: true },
          { text: "Has your company obtained any other environmental management system certifications, eg EMAS (Eco-Management and Audit Scheme) ?", choices: null, isMandatory: true },
          { text: "Does your company hold an ISO 50001 certification for energy management?", choices: ["Yes", "No", "In Progress", "Not applicable"], isMandatory: true },
          { text: "Has your company obtained any other energy-related certifications/framework (e.g., IPMVP – International Performance Measurement and Verification Protocol)?", choices: null, isMandatory: true },

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
          { text: "Does your company have a formal environmental policy that includes a commitment to legal compliance, continuous measurement, and continuous improvement in environmental performance?", choices: null, isMandatory: true },
          {
            text: "Which of the following areas are included in your environmental policy?", choices: ["Legal compliance",
              "Continuous measurement of environmental performance",
              "Continuous improvement in environmental performance",
              "Waste management",
              "Water management",
              "Resource efficiency",
              "Biodiversity conservation",
              "Energy management",
              "Other (please specify)"], isMandatory: false
          },
          { text: "Does your company organize training for employees on the environmental policy?", choices: ["Yes", "No", "In Progress", "Not applicable"], isMandatory: true },
          { text: "Does your site have an environmental management system (EMS) in place?", choices: ["Yes", "No", "In Progress", "Not applicable"], isMandatory: true },
          { text: "Does your site have an energy management system (EnMS) in place?", choices: ["Yes", "No", "In Progress", "Not applicable"], isMandatory: true },
        ],
      },
      {
        key: "monitoring",
        quesSection: "Monitoring",
        questionsAnswer: "0/2",
        percentComplete: "0",
        question: [
          { text: "What percentage of electricity used at your site in the last calendar year came from renewable sources?", choices: ["0-25%", "26-50%", "51-75%", "76-100%"], isMandatory: true },
          { text: "What percentage of heating/cooling used at your site in the last calendar year came from renewable sources?", choices: ["0-25%", "26-50%", "51-75%", "76-100%"], isMandatory: true },
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
          { text: "What is the base year selected for your GHG inventory?", choices: null, isMandatory: true },
          { text: "Which standard, protocol, or methodology has been applied to collect activity data and calculate emissions?", choices: null, isMandatory: true },
          { text: "Has a documented framework been established to define operational and organizational boundaries for emissions reporting?", choices: ["0-25%", "26-50%", "51-75%", "76-100%"], isMandatory: true },
        ],
      },
      {
        key: "emissions-w",
        quesSection: "Emissions",
        questionsAnswer: "0/5",
        percentComplete: "0",
        question: [
          { text: "What were your gross Scope 1 GHG emissions (in metric tons CO₂-equivalent) for the last reporting year?", choices: null, isMandatory: true },
          { text: "What percentage of your Scope 1 emissions comes from stationary combustion, transportation, or fugitive sources?", choices: null, isMandatory: true },
          {
            text: "Which gases were included in your Scope 1 emissions calculations?", choices: [
              "-CO₂ (Carbon Dioxide)",
              "-CH₄ (Methane)",
              "-N₂O (Nitrous Oxide)",
              "-HFCs (Hydrofluorocarbons)",
              "-PFCs (Perfluorocarbons)",
              "-SF₆ (Sulfur Hexafluoride)",
              "-NF₃ (Nitrogen Trifluoride)"], isMandatory: true
          },
          { text: "What were your gross Scope 2 emissions (in metric tons CO₂-equivalent) using the location-based method?", choices: null, isMandatory: false },
          { text: "If applicable, what were your gross Scope 2 emissions (in metric tons CO₂-equivalent) using the market-based method?", choices: null, isMandatory: true },
        ],
      },
      {
        key: "supply-chain-emissions",
        quesSection: "Supply Chain Emissions",
        questionsAnswer: "0/4",
        percentComplete: "0",
        question: [
          { text: "What were your Scope 3 emissions (Supply Chain) in the last reporting period (please provide details in tCO2e for each)", choices: null, isMandatory: true },
          { text: "How many Scope 3 categories (out of 15) do you currently report?", choices: null, isMandatory: true },
          { text: "What percentage of your Scope 3 data is based on primary data from suppliers/customers versus estimated data?", choices: null, isMandatory: true },
          { text: "Which three Scope 3 categories contribute the most to your emissions", choices: null, isMandatory: true },
        ],
      },
      {
        key: "upstream-categories",
        quesSection: "Upstream Categories",
        questionsAnswer: "0/12",
        percentComplete: "0",
        question: [
          { text: "What are your emissions from purchased goods and services (Scope 3, Category 1) in metric tons CO₂-equivalent?", choices: null, isMandatory: false },
          { text: "What percentage of your suppliers (by spend) provide emissions data (Scope 3, Category 1)?", choices: ["0-25%", "26-50%", "51-75%", "76-100%"], isMandatory: true },
          { text: "What are your emissions from capital goods (Scope 3, Category 2) in metric tons CO₂-equivalent?", choices: null, isMandatory: false },
          { text: " Do you conduct lifecycle assessments for your major capital goods (Scope 3, Category 2)?", choices: ["0-25%", "26-50%", "51-75%", "76-100%"], isMandatory: false },
          { text: " What are your emissions from upstream fuel and energy-related activities (Scope 3, Category 3) in metric tons CO₂-equivalent?", choices: null, isMandatory: false },
          { text: " What are your emissions from transporting goods to your facilities (Scope 3, Category 4) in metric tons CO₂-equivalent?", choices: null, isMandatory: false },
          { text: "What percentage of logistics providers use low-emission transportation methods (Scope 3, Category 4), such as EVs or rail? ", choices: ["0-25%", "26-50%", "51-75%", "76-100%"], isMandatory: false },
          { text: "What are your emissions from waste management (Scope 3, Category 5) in metric tons CO₂-equivalent? ", choices: null, isMandatory: false },
          { text: "What percentage of your operational waste is recycled or composted (Scope 3, Category 5)? ", choices: ["0-25%", "26-50%", "51-75%", "76-100%"], isMandatory: false },
          { text: " What are your emissions from business travel (Scope 3, Category 6) in metric tons CO₂-equivalent?", choices: null, isMandatory: false },
          { text: " What are your emissions from employee commuting (Scope 3, Category 7) in metric tons CO₂-equivalent?", choices: null, isMandatory: false },
          { text: " What are your emissions from upstream leased assets (Scope 3, Category 8) in metric tons CO₂-equivalent?", choices: null, isMandatory: false },

        ],
      },
      {
        key: "downstream-categories",
        quesSection: "Downstream Categories",
        questionsAnswer: "0/10",
        percentComplete: "0",
        question: [
          { text: "What are your emissions from product distribution to customers (Scope 3, Category 9) in metric tons CO₂-equivalent?", choices: null, isMandatory: false },
          { text: "What percentage of your transportation partners use low-carbon technologies (Scope 3, Category 9)?", choices: ["0-25%", "26-50%", "51-75%", "76-100%"], isMandatory: false },
          { text: "What are your emissions from the processing of sold products (Scope 3, Category 10) in metric tons CO₂-equivalent?", choices: null, isMandatory: false },
          { text: "What are the lifetime emissions (Scope 3, Category 11) from the use of your sold products in metric tons CO₂-equivalent?", choices: null, isMandatory: false },
          { text: "What are your emissions from the disposal or recycling of your sold products (Scope 3, Category 12) in metric tons CO₂-equivalent?", choices: null, isMandatory: false },
          { text: "What are your emissions from downstream leased assets (Scope 3, Category 13) in metric tons CO₂-equivalent?", choices: null, isMandatory: false },
          { text: "What are your emissions from franchise operations (Scope 3, Category 14) in metric tons CO₂-equivalent?", choices: null, isMandatory: false },
          { text: "What percentage of your franchises report emissions data (Scope 3, Category 14)?", choices: ["0-25%", "26-50%", "51-75%", "76-100%"], isMandatory: false },
          { text: "What are your emissions from investment activities (Scope 3, Category 15) in metric tons CO₂-equivalent?", choices: null, isMandatory: false },
          { text: " What percentage of your investment portfolio is assessed for GHG emissions (Scope 3, Category 15)?", choices: ["0-25%", "26-50%", "51-75%", "76-100%"], isMandatory: false },


        ],
      },
      {
        key: "exclusion",
        quesSection: "Exclusion",
        questionsAnswer: "0/2",
        percentComplete: "0",
        question: [
          { text: "What is the source of excluded emissions, and why are they excluded from the organization’s carbon accounting?", choices: null, isMandatory: false },
          { text: "Which Scope(s) or Scope 3 categories do these excluded emissions belong to?", choices: null, isMandatory: false },
        ],
      },
      {
        key: "ghg-reduction-targets",
        quesSection: "GHG Reduction Targets",
        questionsAnswer: "0/4",
        percentComplete: "0",
        question: [
          { text: "Does your company set Greenhouse Gas (GHG) reduction targets?", choices: ["Yes", "No", "In Progress", "Not applicable"], isMandatory: true },
          { text: "Have you implemented energy efficiency measures to reduce Scope 2 emissions? If so, what is the percentage reduction achieved?", choices: null, isMandatory: true },
          { text: "Are the GHG reduction targets approved by the Science Based Targets Initiative (SBTi)?", choices: ["Yes", "No", "In Progress", "Not applicable"], isMandatory: true },
          { text: "Does your company have emission reduction targets for your upstream supply chain emissions (Scope 3)?", choices: ["Yes", "No", "In Progress", "Not applicable"], isMandatory: true },
        ],
      },
      {
        key: "ghg-emissions-data-andanalys",
        quesSection: "GHG Emissions Data and Analysiss",
        questionsAnswer: "0/4",
        percentComplete: "0",
        question: [
          { text: "Describe your gross global combined Scope 1 and 2 emissions for the reporting year in metric tons CO2e per unit currency total revenue. Include any additional intensity metrics relevant to your operations. ", choices: null, isMandatory: true },
          { text: "Is your organization able to break down emissions data for any subsidiaries included in your CDP response?", choices: ["Yes", "No", "In Progress", "Not applicable"], isMandatory: true },
          { text: "Provide a breakdown of gross Scope 1 and Scope 2 emissions by subsidiary", choices: null, isMandatory: false },
          { text: "How do your gross global emissions (Scope 1, &2 combined) for the reporting year compare to the previous reporting year?", choices: null, isMandatory: true },
        ],
      },
      {
        key: "resource-management",
        quesSection: "Resource Management",
        questionsAnswer: "0/3",
        percentComplete: "0",
        question: [
          { text: "What restricted substances are used at your site in production or operations?", choices: null, isMandatory: true },
          { text: "Do you have protocols in place to manage restricted substances?", choices: ["Yes", "No", "In Progress", "Not applicable"], isMandatory: true },
          {
            text: "Which regulations are covered by your site’s written procedures for managing restricted substances", choices: ["-REACH (EU)",
              "-TSCA or CERCLA (USA)",
              "-RoHS (EU)",
              "-Other (please specify)"], isMandatory: true
          },
        ],
      },
      {
        key: "Waste",
        quesSection: "Waste",
        questionsAnswer: "0/6",
        percentComplete: "0",
        question: [
          { text: "Does your organization have a comprehensive Waste Management Plan covering construction waste, hazardous waste, wastewater, solid waste, and airborne emissions? Provide evidence of past experience in managing and recycling construction waste.", choices: ["Yes", "No", "In Progress", "Not applicable"], isMandatory: true },
          { text: "Are systematic checks conducted to confirm the conformity of waste with the transfer note description (e.g., nature, volume, hazardousness)", choices: ["Yes", "No", "In Progress", "Not applicable"], isMandatory: false },
          { text: "Is compliance with the ADR (European Agreement concerning the International Carriage of Dangerous Goods by Road) agreement (road transport of hazardous goods) ensured?", choices: ["Yes", "No", "In Progress", "Not applicable"], isMandatory: false },
          { text: "What is the total weight of hazardous waste generated in tons?", choices: null, isMandatory: false },
          { text: "What is the total weight of non-hazardous waste generated in tons?", choices: null, isMandatory: false },
          { text: "Provide the total weight of other waste types, including electronic waste, organic waste, and recyclable materials, if applicable.", choices: null, isMandatory: false },

        ],
      },
      {
        key: "biodiversity",
        quesSection: "Biodiversity",
        questionsAnswer: "0/7",
        percentComplete: "0",
        question: [
          { text: "Does your organization have a policy in place for protecting biodiversity and natural resources?", choices: ["Yes", "No"], isMandatory: true },
          { text: "Is there oversight or responsibility for biodiversity matters at the board or executive management level within the organization?", choices: ["Yes", "No"], isMandatory: true },
          { text: "Has your organization publicly committed to biodiversity initiatives or endorsed any related programs?", choices: ["Yes", "No"], isMandatory: true },
          { text: "Does your organization evaluate the impacts and dependencies of its value chain on biodiversity?", choices: ["Yes", "No"], isMandatory: true },
          { text: "Are any organizational activities located in or near biodiversity-sensitive areas during the reporting year? If yes, provide details of these activities.", choices: ["Yes", "No"], isMandatory: true },
          { text: "Does your organization use biodiversity indicators to monitor and evaluate performance across its operations?", choices: ["Yes", "No"], isMandatory: true },
          { text: "Does  your organization’s operations negatively impact biodiversity or natural habitats?", choices: ["Yes", "No"], isMandatory: true },
        ],
      },
      {
        key: "Energy ",
        quesSection: "energy ",
        questionsAnswer: "0/8",
        percentComplete: "0",
        question: [
          { text: "What is the total consumption of purchased electricity (in MWh) during the reporting period?", choices: null, isMandatory: true },
          { text: "What is the total consumption of self-generated electricity (in MWh) during the reporting period?", choices: null, isMandatory: true },
          { text: "Is this electricity consumption excluded from your RE100 commitment?", choices: null, isMandatory: false },
          { text: "What is the total consumption of purchased heat, steam, and cooling (in MWh) during the reporting period?", choices: null, isMandatory: true },
          { text: "What is the total consumption of self-generated heat, steam, and cooling (in MWh) during the reporting period?", choices: null, isMandatory: true },
          { text: "What is the total heating value (in MWh) for your organization's energy consumption?", choices: null, isMandatory: true },
          { text: "How much energy (in MWh) was consumed from renewable sources during the reporting period?", choices: null, isMandatory: true },
          { text: "How much energy (in MWh) was consumed from non-renewable sources during the reporting period?", choices: null, isMandatory: true },
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
          { text: "Did your organization cancel any project-based carbon credits during the reporting year?", choices: ["Yes", "No"], isMandatory: true },
          { text: "Can you provide details of the project-based carbon credits your organization canceled during the reporting year?", choices: null, isMandatory: false },
          { text: "Did your organization cancel any Renewable Energy Certificates (RECs) during the reporting year?", choices: ["Yes", "No"], isMandatory: true },
          { text: "Can you provide details of the Renewable Energy Certificates (RECs) your organization canceled during the reporting year?", choices: null, isMandatory: false },
          { text: "Does your organization implement an internal carbon pricing mechanism?", choices: ["Yes", "No"], isMandatory: true },
          { text: "How does your organization utilize internal carbon pricing in its operations and decision-making processes?", choices: null, isMandatory: false },

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