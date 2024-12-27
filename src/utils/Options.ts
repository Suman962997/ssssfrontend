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
  {
    key: "emission",
    section: "Emission",
    questionsAnswer: "0/3",
    percentComplete: "0%",
    questions: [
      {
        key: "ghg-emissions",
        quesSection: "GHG Emissions",
        questionsAnswer: "0/5",
        percentComplete: "0",
        question: [
          { text: "Do you measure and report greenhouse gas emissions, including Scope 1, Scope 2, and Scope 3 categories?", choices: ["Yes", "No"] },
          { text: "Are your emissions data externally verified for accuracy and reliability?", choices: ["Yes", "No"] },
          { text: "Has your company set formal targets to reduce Greenhouse Gas (GHG) emissions?", choices: ["Yes", "No"] },
          { text: "Are your emissions reduction targets approved by the Science Based Targets initiative (SBTi)?", choices: ["Yes", "No"] },
          { text: "Do your emissions reduction goals extend to supply chain emissions (Scope 3)?", choices: ["Yes", "No"] },
        ],
      },
      {
        key: "stationary-combustion",
        quesSection: "Stationary Combustion",
        questionsAnswer: "0/4",
        percentComplete: "0",
        question: [
          { text: "What are the fuel types used in stationary sources like boilers, furnaces, and generators?", choices: null },
          { text: "How is the fuel consumption monitored and recorded for stationary combustion sources?", choices: null },
          { text: "What is the thermal efficiency of your stationary combustion equipment?", choices: null },
          { text: "Are there any emissions control technologies installed for stationary combustion sources?", choices: ["Yes", "No"] },
        ],
      },
      {
        key: "mobile-combustion",
        quesSection: "Mobile Combustion",
        questionsAnswer: "0/5",
        percentComplete: "0",
        question: [
          { text: "What types of vehicles are part of your operational fleet?", choices: null },
          { text: "How are fuel consumption and mileage tracked for company vehicles?", choices: null },
          { text: "What initiatives have been implemented to reduce fleet emissions?", choices: null },
          { text: "What is the average fuel efficiency of your operational fleet (miles per gallon or km per liter)?", choices: null },
          { text: "Do you use telematics or GPS systems to monitor fuel efficiency and route optimization?", choices: ["Yes", "No"] },
        ],
      },
      {
        key: "fugitive-emmission",
        quesSection: "Fugitive-emission",
        questionsAnswer: "0/5",
        percentComplete: "0",
        question: [
          { text: "What types of refrigerants are used in your operations, and how are leaks monitored?", choices: null },
          { text: "What is the total charge capacity of refrigerants in your systems?", choices: null },
          { text: "Are gas leak detection systems (e.g., infrared cameras, ultrasonic sensors) deployed for refrigerants?", choices: ["Yes", "No"] },
          { text: "How frequently are HVAC and refrigeration systems inspected for leaks?", choices: null },
          { text: "What percentage of fugitive emissions are recovered or minimized through leak management?", choices: null },
        ],
      },
    ],
  },
];

