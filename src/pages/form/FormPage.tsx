import React, { useState } from "react";
import { Form, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import './FormPage.scss';
import CustomButton from "../../component/buttons/CustomButton";

const CompanyDetailsForm = () => {
    const [formData, setFormData] = useState({
        companyName: "",
        address: "",
        contactNumber: "",
        emailId: "",
        website: "",
    });

    const handleFileUpload = async () => {
        const mockResponse = {
            companyName: "Mock Company",
            address: "123 Mock Street, Mock City, MC 12345",
            contactNumber: "+1234567890",
            emailId: "info@mockcompany.com",
            website: "www.mockcompany.com",
        };

        setTimeout(() => {
            setFormData(mockResponse);
            message.success(`File uploaded successfully.`);

        }, 1000);

        return false;
    };

    return (
        <div className="company-details-form">
            <Form layout="vertical">
                <Form.Item className="upload-file" label="Upload File">
                    <Upload
                        beforeUpload={handleFileUpload}
                        showUploadList={false}
                    >
                        <CustomButton icon={<UploadOutlined />} label="Click to Upload" type="primary" className="upload-button" />
                    </Upload>
                </Form.Item>

                <Form.Item className="form-item" label="Company Name">
                    <Input.TextArea
                        className="text-area"
                        value={formData.companyName}
                        readOnly
                        autoSize={{ minRows: 1 }}
                    />
                </Form.Item>

                <Form.Item className="form-item" label="Address">
                    <Input.TextArea
                        className="text-area"
                        value={formData.address}
                        readOnly
                        autoSize={{ minRows: 2 }}
                    />
                </Form.Item>

                <Form.Item className="form-item" label="Contact Number">
                    <Input.TextArea
                        className="text-area"
                        value={formData.contactNumber}
                        readOnly
                        autoSize={{ minRows: 1 }}
                    />
                </Form.Item>

                <Form.Item className="form-item" label="Email ID">
                    <Input.TextArea
                        className="text-area"
                        value={formData.emailId}
                        readOnly
                        autoSize={{ minRows: 1 }}
                    />
                </Form.Item>

                <Form.Item className="form-item" label="Website">
                    <Input.TextArea
                        className="text-area"
                        value={formData.website}
                        readOnly
                        autoSize={{ minRows: 1 }}
                    />
                </Form.Item>
            </Form>
        </div>
    );
};

export default CompanyDetailsForm;
