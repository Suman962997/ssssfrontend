import React, { useMemo, useState } from "react";
import { Card, Input, List, Space, Table, Tooltip, Upload, message } from "antd";
import { Radio } from "antd";
import { ArrowLeftOutlined, CopyTwoTone, DeleteOutlined, FileAddTwoTone } from "@ant-design/icons";
import CustomButton from "../../component/buttons/CustomButton";
import { allCategories } from "../../utils/Options";
import "./Questionnaire.scss";
import NavBar from "../../component/navbar/NavBar";

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
    },
];
const Questionnaire: React.FC = () => {
    const [activeQuestionGroup, setActiveQuestionGroup] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>("general");
    const [showQuestions, setShowQuestions] = useState<boolean>(false);
    const [answers, setAnswers] = useState<{ [key: string]: any }>({});
    const [quesTitle, setQuesTitle] = useState<string>("");
    const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: { name: string; size: string } | null }>({});
    const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0);
    const [singleRecord, setSingleRecord] = useState<any>(null);

    const handleBackToCategories = () => {
        setShowQuestions(false);
    };

    const handleInputChange = (
        section: string,
        key: string,
        value: any,
        questionIndex: number
    ) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [`${section}-${key}-${questionIndex}`]: value,
        }));
    };

    const handleRowClick = (key: string, record: string, singleRecord: any) => {
        console.log(record, singleRecord, 'recoooo')
        setQuesTitle(record);
        setActiveQuestionGroup(key);
        setShowQuestions(true);
        setCurrentSectionIndex(0);
        setSingleRecord(singleRecord)
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text).then(
            () => message.success("Copied to clipboard!"),
            () => message.error("Failed to copy.")
        );
    };

    const currentCategory = allCategories.find((cat) => cat.key === activeCategory);
    const quesSections = useMemo(() => currentCategory?.questions || [], [currentCategory]);

    const currentSection = quesSections[currentSectionIndex];

    const totalAnswered = useMemo(() => {
        return quesSections.reduce((acc, section) => {
            const [answered] = section.questionsAnswer.split("/").map(Number);
            return acc + (answered || 0);
        }, 0);
    }, [quesSections]);

    const totalQuestions = useMemo(() => {
        return quesSections.reduce((acc, section) => {
            const [, total] = section.questionsAnswer.split("/").map(Number);
            return acc + (total || 0);
        }, 0);
    }, [quesSections]);

    const handleFileUpload = (info: any, questionKey: string) => {
        if (info.file.status === "done") {
            const { name, size } = info.file;
            setUploadedFiles((prevFiles) => ({
                ...prevFiles,
                [questionKey]: {
                    name,
                    size: (size / 1024).toFixed(2) + " KB",
                },
            }));
            message.success(`${name} uploaded successfully.`);
        } else if (info.file.status === "error") {
            message.error(`${info.file.name} upload failed.`);
        }
    };

    const handleRemoveFile = (questionKey: string) => {
        setUploadedFiles((prevFiles) => ({
            ...prevFiles,
            [questionKey]: null,
        }));
        message.info("File removed.");
    };


    const handleNextSection = () => {
        const totalSections = singleRecord?.question.length || 0;  // Based on singleRecord question data
        setCurrentSectionIndex((prev) => Math.min(prev + 1, totalSections - 1));  // Make sure we do not go beyond the available sections
    };

    const handlePreviousSection = () => {
        setCurrentSectionIndex((prev) => Math.max(prev - 1, 0));  // Prevent going below the first section
    };

    console.log(currentCategory, quesSections, currentSection, singleRecord, 'fulllrow')
    const renderQuestionInput = (
        section: string,
        key: string,
        question: { text: string; choices: string[] | null },
        questionIndex: number
    ) => {
        const questionKey = `${section}-${key}-${questionIndex}`;
        const isFileUploaded = !!uploadedFiles[questionKey];

        return (
            <div>
                {question.choices === null ? (
                    <div className="area-upload">
                        <TextArea
                            rows={3}
                            placeholder="Type your answer here"
                            size="small"
                            onChange={(e) => handleInputChange(section, key, e.target.value, questionIndex)}
                            value={answers[questionKey] || ""}
                        />
                        <div className="upload-section">
                            {!isFileUploaded && (
                                <Tooltip title="Upload">
                                    <Upload
                                        showUploadList={false}
                                        customRequest={(options) => {
                                            const { onSuccess } = options;
                                            setTimeout(() => onSuccess?.("ok"), 0);
                                        }}
                                        onChange={(info) => handleFileUpload(info, questionKey)}
                                    >
                                        <FileAddTwoTone className="upload-icon" />
                                    </Upload>
                                </Tooltip>
                            )}
                        </div>
                        {isFileUploaded && (
                            <div className="uploaded-file-info">
                                <div className="uploaded-file-details">
                                    File: {uploadedFiles[questionKey]?.name} ({uploadedFiles[questionKey]?.size})
                                    <span
                                        onClick={() => handleRemoveFile(questionKey)}
                                        className="remove-file-icon"
                                    >
                                        <DeleteOutlined />
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="question-options">
                        {question.choices.map((option, idx) => (
                            <label key={idx}>
                                <Space direction="vertical">
                                    <Radio
                                        value={option}
                                        onChange={() => handleInputChange(section, key, option, questionIndex)}
                                        className="radio-qbutton"
                                    >
                                        {option}
                                    </Radio>
                                </Space>
                            </label>
                        ))}
                    </div>
                )}
            </div>
        );
    };


    return (
        <div className="questionnaire-main">
            <NavBar />
            <div className="questionnaire-container">
                <div className="category-card">
                    <Card title={"Categories"} bordered>
                        <List
                            dataSource={allCategories}
                            renderItem={(category) => (
                                <List.Item
                                    onClick={() => {
                                        if (!showQuestions) {
                                            setActiveCategory(category.key);
                                        }
                                    }}
                                    className={`category-item ${activeCategory === category.key ? "active" : ""} ${showQuestions ? "disabled-item" : ""
                                        }`}
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
                                dataSource={currentCategory?.questions || []}
                                bordered={false}
                                pagination={false}
                                onRow={(record: any) => ({
                                    onClick: () => handleRowClick(record.key, record.quesSection, record),
                                })}
                                footer={() => (
                                    <div className="footer-main">
                                        <div className="footer-row">
                                            <div className="footer-text empty-cell"></div>
                                            <div className="footer-text total-label">
                                                <strong>TOTAL</strong>
                                            </div>
                                            <div className="footer-text answered">
                                                {totalAnswered}/{totalQuestions}
                                            </div>
                                            <div className="footer-text percentage">
                                                80%
                                            </div>
                                        </div>
                                    </div>
                                )}
                                style={{ marginBottom: 10 }}
                            />

                        </Card>
                    </div>
                ) : (
                    <div className="question-card">
                        <Card
                            title={`${quesTitle} Questions`}
                            bordered
                            extra={
                                <span onClick={handleBackToCategories} role="button" className="back">
                                    <ArrowLeftOutlined /> Back
                                </span>
                            }
                        >
                            {currentSection && (
                                <div className="question-item">
                                    {singleRecord.question.map((q: any, idx: number) => (
                                        <div key={idx}>
                                            <div className="copy-upload">
                                                <div className="question-text">{q.text}</div>
                                                <Tooltip title="Copy">
                                                    <CopyTwoTone onClick={() => handleCopy(q.text)} />
                                                </Tooltip>
                                            </div>
                                            {renderQuestionInput(
                                                activeCategory,
                                                activeQuestionGroup!,
                                                q,
                                                idx
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="subbutton">
                                <CustomButton
                                    label="Submit Answers"
                                    type="primary"
                                    onClick={() => console.log("Answers:", answers)}
                                />
                                <div className="navigation-buttons">
                                    <CustomButton
                                        label="Previous Section"
                                        type="primary"
                                        onClick={handlePreviousSection}
                                        disabled={currentSectionIndex === 0}
                                    />
                                    <span className="current-section-text">
                                        {`Section ${currentSectionIndex + 1} of ${quesSections.length}`}
                                    </span>
                                    <CustomButton
                                        label="Next Section"
                                        type="primary"
                                        onClick={handleNextSection}
                                        disabled={currentSectionIndex === quesSections.length - 1}
                                    />
                                </div>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Questionnaire;
