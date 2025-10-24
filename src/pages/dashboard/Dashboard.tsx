import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { useAppSelector } from "../../features/RDXHook";
import CustomCard from "../../component/cards/CustomCard";
import MeterCard from "../../component/cards/MeterCard";
import CustomTable from "../../component/table/CustomTable";
import {message, Result} from 'antd'
import {
  AuditsIcon,
  DeliveryIcon,
  SuppliersIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  WarningIcon,
} from "../../utils/CardIcons";
import { useNavigate } from "react-router-dom";
import CustomModal from "../../component/popup/CustomModel";
import { DeleteOutlined, EditOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Form, Switch, Tooltip } from "antd";
import Loader from "../../component/loader/Loader";
import EditRow from "./EditRow";
import CustomButton from "../../component/buttons/CustomButton";
import { fetchSupplierListData } from "../../features/action/SupplierAction";
import { setSelectedRecord, setSuppliers } from "../../features/slices/SupplierSlice";
import { useDispatch } from "react-redux";
import { bgColor } from "../../style/ColorCode";
import "./Dashboard.scss";
import { json } from "node:stream/consumers";


interface ReportItem {
  id: number | null;
  section: string | null;
  category: string | null;
  question: string | null;
  answer: string | null;
  created_at: string | null;
}

const Dashboard: React.FC = () => {
  const params = new URLSearchParams(window.location.search);
const walletAdd = params.get("wallet");

if (walletAdd) {
  localStorage.setItem("walletAddress", walletAdd);
}
const [walletAddress, setWalletAddress] = useState<string | null>(walletAdd);
  const suppliers = useAppSelector((state) => state.suppliers?.data);

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const showModal = () => setIsTrue(true);
  const hideModal = () => setIsTrue(false);
  const [data, setData] = useState<any>(null);
  const [cardData, setCardData] = useState<any>(null);
  const [editData, setEditData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedValue, setSelectedValue] = useState<string>("This Month");
  const [rowType, setRowType] = useState<string>('')
  const [compliantPercentage, setCompliantPercentage] = useState<number>(0);
  const [nonCompliantPercentage, setNonCompliantPercentage] = useState<number>(0);
  const [isTrue, setIsTrue] = useState(false)
  const [singleDeleteData, setSingleDeleteData] = useState<string | any>(null)
  const [visibleRow, setVisibleRow] = useState<string | null>(null);
  const [deleteKey,setDeleteKey] =useState<string | null>(null);
  const [reportEdit, setReportEdit] = useState<ReportItem[]>([]);



const edit_get_document = async (report: string) => {

  try {
    const response = await fetch(
      `http://127.0.0.1:5000/edit_get/?table_name=${encodeURIComponent(report)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP Status: ${response.status}`);
    }
    const result = await response.json();
    setReportEdit(result)
    
    return result;
  } catch (error) {
    console.error("Get error:", error);
    message.error("Failed to get edit report.");
  }
};



  const handleDropdownChange = (value: string) => {
    setSelectedValue(value);
  };

  const handleRowClick = (id: string, record: any) => {
    navigate(`/sss/supplier/${id}/overview`);
    localStorage.setItem("record", JSON.stringify(record));
    dispatch(setSelectedRecord(record));

  };
  const handleDetails = (id: string, record: any) => {
    navigate(`/sss/supplier/${id}/overview`);
    localStorage.setItem("record", JSON.stringify(record));
    dispatch(setSelectedRecord(record));

  }

  const handleMenuClick = (rowKey: string) => {
    setVisibleRow(visibleRow === rowKey ? null : rowKey);
  };





  const handleEdit = (row: any, p0: string) => {
    setRowType(p0)
    setSingleDeleteData(row)
    // showModal()
edit_get_document(row.key).then(result => {
    navigate('/sss/questionnaire', {
      state: { data: result,
               edit:true,
               reportname:row.key,

       }
    });
  });
  };

  const handleStatus = (row: any, p0: string) => {
    setRowType(p0)
    setSingleDeleteData(row)
    showModal()
  };

  const editreport = (row: any, p0: string) => {

  };





const edit_document_report =async (report:any) =>{
  try{
const response =await fetch(`http://127.0.0.1:5000/update/`,

  {
  method:"PUT",
  headers:{'Content-Type':'application/json',
  },
  body:JSON.stringify(report)
});

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
  }}





  const delete_document_report = async (index: any) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:5000/delete/${encodeURIComponent(index)}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP Status: ${response.status}`);
    }

    const result = await response.json();
    message.success(`"${result}" deleted successfully!`);
    console.log("Delete result:", result);
    fetchSupplierListData({ setData, setCardData,setLoading, calculateCompliancePercentages });
    return result;
  } catch (error) {
    console.error("Delete error:", error);
    message.error("Failed to delete report.");
  }
};



  const handleDelete = (row: any, p0: string) => {
    setDeleteKey(row?.key)
    setRowType(p0)
    setSingleDeleteData(row)
    showModal()
  };

  const columns = [
    {
      title: "Suppliers",
      dataIndex: "supplier",
      key: "supplier",
      sorter: (a: any, b: any) => a.supplier.localeCompare(b.supplier),
      render: (text: string, record: any) => (
        <span
          className="supplier-name"
          onClick={() => handleRowClick(record.key, record)}
          role="button"
        >
          {text}
        </span>
      ),
    },
    {
      title: "Industry",
      dataIndex: "industry",
      key: "industry",
      sorter: (a: any, b: any) => a.industry.localeCompare(b.industry),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      sorter: (a: any, b: any) => a.industry.localeCompare(b.industry),
    },
    {
      title: "Risk Score",
      dataIndex: "riskScore",
      key: "riskScore",
      sorter: (a: any, b: any) => a.riskScore - b.riskScore,
      render: (score: number) => (
        <span
          className={
            score > 70 ? "risk-high" : score > 40 ? "risk-medium" : "risk-low"
          }
        >
          {score}
        </span>
      ),
    },
    {
      title: "Risk Level",
      dataIndex: "riskLevel",
      key: "riskLevel",
      sorter: (a: any, b: any) => a.riskLevel.localeCompare(b.riskLevel),
      render: (level: any) => (
        <span
          className={
            level === "Low"
              ? "risk-high"
              : level === "Medium"
                ? "risk-medium"
                : level === "High"
                  ? "risk-low"
                  : ""
          }
        >
          {level}
        </span>
      ),
    },
    {
      title: "Compliance",
      dataIndex: "compliance",
      key: "compliance",
      sorter: (a: any, b: any) => a.compliance.localeCompare(b.compliance),
      render: (level: any) => (
        <span
          className={
            level === "Compliant"
              ? "risk-high"
              : level === "Non-Compliant"
                ? "risk-low"
                : ""
          }
        >
          {level}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a: any, b: any) => {
        const statusA = a.status ? String(a.status) : '';
        const statusB = b.status ? String(b.status) : '';
        return statusA.localeCompare(statusB);
      },
      render: (_: any, record: any) => (
        <Switch
          checked={!record?.status}
          size="small"
          onClick={() => handleStatus(record, "status")}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (index: number, record: any) => (
        <Tooltip
          color={bgColor}
          placement="leftBottom"
          className="custom-tooltip"
          title={
            <div className="menu-options">
              <div className="menu-item" role="button" onClick={() => handleDetails(record.key, record)}>
                <UnorderedListOutlined className="list-icon" />
                <div>View details</div>
              </div>
              <div className="menu-item" role="button" onClick={() => handleEdit(record, "edit")}>
              {/* <div className="menu-item" role="button" onClick={() => NavBar}> */}
                <EditOutlined className="edit-icon" />
                <div>Edit item</div>
              </div>
              <div className="menu-item" role="button" onClick={() => handleDelete(record, "delete")}>
                <DeleteOutlined className="delete-icon" />
                <div>Delete item</div>
              </div>
            </div>
          }>

          <div className="action-menu">
            <span
              className="three-dot-menu"
              onClick={() => handleMenuClick(record.key)}
            >
              •••
            </span>
          </div>
        </Tooltip>
      ),
    },
  ];


  const handleOk = async () => {
    switch (rowType) {
      case "delete":
        console.log("Deleting:", singleDeleteData?.supplier);
        delete_document_report(deleteKey)
        break;
      case "edit":
        form.validateFields()
          .then(values => {
            const newUser: any = { key: String(suppliers.length + 1), ...values };
            setSuppliers([...suppliers, newUser]);
          })
          .catch(error => {
            console.log('errorr')
          })
        
        console.log("Editing:", singleDeleteData?.supplier);
        
        edit_document_report(editData)
        
        break;
      case "status":
        console.log("Changing Status for:", singleDeleteData?.supplier);
        break;
      default:
        break;
    }
    hideModal();
  };


  const navigate = useNavigate();


  const calculateCompliancePercentages = useCallback(() => {
    const total = suppliers.length;
    const compliantCount = suppliers.filter(
      (row: any) => row.compliance === "Compliant"
    ).length;
    const nonCompliantCount = suppliers.filter(
      (row: any) => row.compliance === "Non-Compliant"
    ).length;

    const compliantPct = Math.round((compliantCount / total) * 100);
    const nonCompliantPct = Math.round((nonCompliantCount / total) * 100);

    setCompliantPercentage(compliantPct);
    setNonCompliantPercentage(nonCompliantPct);
  }, [suppliers]);

  useEffect(() => {
    fetchSupplierListData({ setData, setCardData,setLoading, calculateCompliancePercentages });
  }, [calculateCompliancePercentages]);

useEffect(() => {
    const savedAddress = localStorage.getItem("walletAddress");
    if (savedAddress) {
      setWalletAddress(savedAddress);
    }
  }, []);



  if (loading) {
    return <Loader />;
  }

  const icons = [
    <SuppliersIcon key={"supplier"} />,
    <ThumbsDownIcon key={"thumbsdown"} />,
    <ThumbsUpIcon key={"thumbsup"} />,
    <WarningIcon key={"warning"} />,
    <AuditsIcon key={"audits"} />,
    <DeliveryIcon key={"delivery"} />,
  ];

  const options = [
    { label: "This Month", value: "1" },
    { label: "Last Year", value: "2" },
  ];

  const getTitle = (rowType: string) => {
    switch (rowType) {
      case "delete":
        return "Do you want to Delete this User?";
      case "edit":
        return "Edit";
      case "status":
        return "Do you want to change the Status?";
      default:
        return "";
    }
  };

const rare=  {
    "supplier": "venues pdf",
    "industry": "seed",
    "category": "General Information",
    "riskScore": 20,
    "compliance": "Non-Compliant",
    "status": true
}

  const getCancelName = (rowType: string) => {
    switch (rowType) {
      case "delete":
        return <><CustomButton key="cancel" type='default' onClick={hideModal} label={"No"} /><CustomButton key="ok" type="primary" onClick={handleOk} label={"Yes"} /></>;
      case "edit":
        return <><CustomButton key="cancel" type='default' onClick={hideModal} label={"Cancel"} /><CustomButton key="ok" type="primary" onClick={handleOk} label={"edit"} /></>;
        case "status":
        return <><CustomButton key="cancel" type='default' onClick={hideModal} label={"No"} /><CustomButton key="ok" type="primary" onClick={handleOk} label={"Yes"} /></>;
      default:
        return "";
    }
  };
   const handleFormDataChange = (data: any) => {
    setEditData(data)
    
  };
  const getComponent: any = (rowType: string) => {
    switch (rowType) {
      case "delete":
        return <div>{singleDeleteData?.supplier}</div>
      case "edit":
        return <EditRow singleDeleteData={singleDeleteData} form={form} onFormDataChange={handleFormDataChange} />;
      case "status":
        return <div>{singleDeleteData?.status}</div>;
      default:
        return "";
    }
  };
  return (
    <div className="Dashboard-main">
      <div className="cards-flex">
        <div className="multi-cards">
          {cardData &&
            cardData?.map((item: any, index: number) => (
              <CustomCard
                key={index}
                title={item?.name || "Default Title"}
                content={item?.value || "Default Content"}
                icon={icons[index]}
                isLow={item?.value}
              />
            ))}
        </div>
        <div className="single-card">
          <MeterCard
            title="Compliance"
            options={options}
            value={selectedValue || ""}
            compliantPercentage={compliantPercentage}
            nonCompliantPercentage={nonCompliantPercentage}
            onChange={handleDropdownChange}
          />
        </div>
      </div>
      <CustomTable
        title="Supplier List"
        columns={columns}
        data={data}
        bordered={false}
        pagination={true}
      />

      <CustomModal
        visible={isTrue}
        onClose={hideModal}
        onCancel={hideModal}
        title={getTitle(rowType)}
        content={getComponent(rowType)}
        onOk={handleOk}
        footer={getCancelName(rowType)}
      />
    </div>
  );
};

export default Dashboard;
