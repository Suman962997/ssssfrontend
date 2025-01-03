import React, { useState } from "react";
import { Card, Input, List, Progress, Space, Table, Tooltip, Upload, message } from "antd";
import { Radio } from "antd";
import { ArrowLeftOutlined, CheckOutlined, CopyTwoTone, DeleteOutlined, FileAddTwoTone } from "@ant-design/icons";
import CustomButton from "../../component/buttons/CustomButton";
import { allCategories } from "../../utils/Options";
import { primaryColor } from '../../style/ColorCode';
import "./Questionnaire.scss";

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
];

const Questionnaire: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string>("general");
    const [showQuestions, setShowQuestions] = useState<boolean>(false);
    const [answers, setAnswers] = useState<{ [key: string]: any }>({});
    const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: { name: string; size: string } | null }>({});
    const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0);
    const [isViewMode, setIsViewMode] = useState(false);
    const [checkMark, setCheckMark] = useState(false);
    const [singleSection, setSingleSection] = useState<{ [key: string]: any }>({});

    const handleRowClick = (record: any, sectionIndex: number) => {
        setShowQuestions(true);
        setSingleSection(record)
        console.log(record, 'recordrecord')
        setCurrentSectionIndex(sectionIndex);
    };

    const handleBackToCategories = () => {
        setShowQuestions(false);
        setCurrentSectionIndex(0);
    };

    const handleNextSection = () => {
        setCurrentSectionIndex((prev) => Math.min(prev + 1, allCategories[0].questions.length - 1));
    };

    const handlePreviousSection = () => {
        setCurrentSectionIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleInputChange = (section: string, key: string, value: any, questionIndex: number) => {
        const questionKey = `${section}-${key}-${questionIndex}`;
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionKey]: value,
        }));
    };


    const handleFileUpload = (info: any, questionKey: string) => {
        if (info.file.status !== "uploading") {
            const { name, size } = info.file;
            const fileSize = `${(size / 1024).toFixed(2)} KB`;

            setUploadedFiles((prevFiles) => ({
                ...prevFiles,
                [questionKey]: { name, size: fileSize },
            }));

            message.success(`${name} uploaded successfully.`);
        }
    };

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

    const handleSubmitAll = () => {
        let anyAnswered = false;

        const currentCategory = allCategories.find((cat) => cat.key === activeCategory);
        if (currentCategory) {
            currentCategory.questions.forEach((section) => {
                section.question.forEach((_, questionIndex) => {
                    const questionKey = `${activeCategory}-${section.key}-${questionIndex}`;
                    if (answers[questionKey]) {
                        anyAnswered = true;
                    }
                });
            });
        }

        if (!anyAnswered) {
            message.warning("Please answer at least one question before submitting.");
        } else {
            currentCategory && currentCategory.questions.forEach((section) => {
                let answered = 0;

                section.question.forEach((_, questionIndex) => {
                    const questionKey = `${activeCategory}-${section.key}-${questionIndex}`;
                    if (answers[questionKey]) {
                        answered += 1;
                    }
                });

                const total = section.question.length;
                section.questionsAnswer = `${answered}/${total}`;

                const percentComplete = total > 0 ? Math.round((answered / total) * 100) : 0;

                section.percentComplete = String(percentComplete);
            });
            message.success("submitted successfully!");
            setShowQuestions(false);
        }
        setCheckMark(anyAnswered)

    };


    const renderQuestionInput = (
        section: string,
        key: string,
        question: { text: string; choices: string[] | null },
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
                        {checkMark && isAnswered && (
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
                                    <button onClick={() => handleRemoveFile(questionKey)} className="remove-file-icon" >
                                        <DeleteOutlined />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="question-options">
                        {question.choices.map((option, idx) => (
                            <label key={`${option}-${idx}`}>
                                <Space direction="vertical">
                                    <Radio
                                        value={option}
                                        checked={answers[`${section}-${key}-${questionIndex}`] === option}
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

    const currentCategory = allCategories.find((cat) => cat.key === activeCategory);
    const questions = currentCategory?.questions[currentSectionIndex];

    const totalAnswered = currentCategory?.questions.reduce((sum, section) => {
        const [answered] = section.questionsAnswer.split("/").map(Number);
        return sum + answered;
    }, 0) ?? 0;

    const totalQuestions = currentCategory?.questions.reduce((sum, section) => {
        const [, total] = section.questionsAnswer.split("/").map(Number);
        return sum + total;
    }, 0) ?? 0;

    const footer = () => {
        return (
            <div className="footer-main">
                <div className="footer-row">
                    <div className="footer-text empty-cell"></div>
                    <div className="footer-text total-label">
                        <strong>TOTAL</strong>
                    </div>
                    <div className={activeCategory !== "supplierbenchmark" ? "footer-text answered" : "footer-text answe-bench"}>
                        {totalAnswered}/{totalQuestions}
                    </div>
                    <div className="footer-text percentage">
                        {Math.round((totalAnswered / totalQuestions) * 100)}%
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="questionnaire-main">
            <div className="questionnaire-container">
                <div className="category-card">
                    <Card title={"Categories"} bordered>
                        <List
                            key={activeCategory}
                            dataSource={allCategories}
                            renderItem={(category, id: number) => (
                                <List.Item
                                    key={category.key}
                                    onClick={() => {
                                        if (!showQuestions) {
                                            setActiveCategory(category.key);
                                        }
                                    }}
                                    className={`category-item ${activeCategory === category.key ? "active" : ""} ${showQuestions ? "disabled-item" : ""}`}
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
                                <div style={{ textAlign: "center" }}>
                                    <Progress
                                        type="circle"
                                        percent={(() => {
                                            const [answered, total] = singleSection?.questionsAnswer?.split("/").map(Number);
                                            return (answered / total) * 100;
                                        })()}
                                        width={40}
                                        strokeColor={primaryColor}
                                        format={() => singleSection?.questionsAnswer}
                                    />
                                </div>
                            }



                            bordered
                        >
                            {questions?.question.map((q, idx) => {
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
                                        onClick={handleSubmitAll}
                                        disabled={allCategories.find((cat) => cat.key === activeCategory)?.questions.every(section =>
                                            section.question.every((_, questionIndex) => {
                                                const questionKey = `${activeCategory}-${section.key}-${questionIndex}`;
                                                return !answers[questionKey];
                                            })
                                        )}
                                    />
                                </div>
                            </div>

                        </Card>
                    </div>
                )
                }
            </div >
        </div >
    );
};

export default Questionnaire;
