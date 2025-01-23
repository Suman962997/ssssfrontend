import { createBrowserRouter } from "react-router-dom";
import Home from './pages/home/Home';
import Report from "./pages/report/Report";
import Analytics from "./pages/analytics/Analytics";
import Quality from "./pages/quality/Quality";
import SupplierDetailsPage from "./pages/supplierdetails/SupplierDetails";
import Dashboard from "./pages/dashboard/Dashboard";
import OverView from "./pages/supplierdetails/overview/OverView";
import Governance from "./pages/supplierdetails/governance/Governance";
import Analyse from "./pages/supplierdetails/analyse/Analyse";
import Performance from "./pages/supplierdetails/performance/Performance";
import Carbon from "./pages/supplierdetails/carbon/Carbon";
import ProfilePage from "./pages/profile/ProfilePage";
import SingleReport from "./pages/supplierdetails/singlereport/SingleReport";
import Waste from "./pages/supplierdetails/waste/Waste";
import BenchmarkSustainability from "./pages/supplierdetails/benchmark/BenchmarkSustainability";
import StrategyRoadMap from "./pages/supplierdetails/supplierstrategy/StrategyRoadMap";
import Questionnaire from "./pages/questionnaire/Questionnaire";
import CompanyDetailsForm from "./pages/form/FormPage";
import SupplierManage from "./pages/supplier/SupplierManage";
import Login from "./pages/login/Login";
import UserManagement from "./pages/usermanagement/UserManagement";
import UserCreation from "./pages/usercreation/UserCreation";

const RouterConfig = createBrowserRouter([

    {
        path: '/',
        element: <Login />,
    },
    {
        element: <Home />,
        children: [
            {
                path: 'dashboard',
                element: <Dashboard />
            },
            {
                path: 'user-creation',
                element: <UserCreation />
            },
            {
                path: 'reports',
                element: <Report />,
            },
            {
                path: 'quality',
                element: <Quality />,
            },
            {
                path: 'analytics',
                element: <Analytics />,
            },
            {
                path: 'company',
                element: <CompanyDetailsForm />
            },
            {
                path: 'profile',
                element: <ProfilePage />
            },
            {
                path: 'questionnaire',
                element: <Questionnaire />
            },
            {
                path: 'user-management',
                element: <UserManagement />
            },
            {
                path: 'supplier-management',
                element: <SupplierManage />
            }
        ],
    },
    {
        path: "supplier/:id",
        element: <SupplierDetailsPage />,
        children: [
            {
                path: 'overview',
                element: <OverView />,
            },
            {
                path: 'company',
                element: <Governance />,
            },
            {
                path: 'products&services',
                element: <Governance />,
            },
            {
                path: 'location',
                element: <Governance />,
            },
            {
                path: 'governance',
                element: <Governance />,
            },
            {
                path: 'carbon',
                element: <Carbon />,
            },
            {
                path: 'performance',
                element: <Performance />,
            },
            {
                path: 'analyse',
                element: <Analyse />,
            },
            {
                path: 'waste-consumption',
                element: <Waste />,
            },
            {
                path: 'reports',
                element: <SingleReport />,
            },
            {
                path: 'benchmark-sustainability',
                element: <BenchmarkSustainability />,
            },
            {
                path: 'strategy-road-map',
                element: <StrategyRoadMap />,
            },
        ]
    },


]);

export default RouterConfig;
