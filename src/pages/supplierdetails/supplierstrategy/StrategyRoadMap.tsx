import React from "react";
import { Timeline } from "antd";
import "./StrategyRoadMap.scss";
import DocumentCertificate from "../overview/component/document/DocumentCertificate";

const StrategyRoadMap: React.FC = () => {
    const milestones = [
        { year: "2024", event: "Launch sustainability initiative" },
        { year: "2025", event: "Achieve 50% carbon reduction" },
        { year: "2026", event: "Implement renewable energy systems" },
        { year: "2027", event: "Zero waste to landfill goal" },
        { year: "2030", event: "Net zero carbon emissions" },
    ];

    const strategies = [
        {
            title: "Energy Efficiency",
            description: "Reduce energy consumption through optimized operations and technology upgrades.",
        },
        {
            title: "Sustainable Sourcing",
            description: "Collaborate with suppliers to ensure eco-friendly raw materials and sustainable practices.",
        },
        {
            title: "Innovation",
            description: "Invest in R&D to develop greener products and processes.",
        },
        {
            title: "Community Engagement",
            description: "Partner with communities to promote environmental awareness and sustainability education.",
        },
    ];

    return (
        <div className="strategy-flex">
            <div className="strategy-road-map">
                <div className="title-section">
                    <h1>Supplier's Strategy and Road-Map</h1>
                    <p>
                        A comprehensive plan to achieve sustainability and long-term growth while addressing environmental, social, and governance (ESG) goals.
                    </p>
                </div>

                <div className="content-section">
                    <div className="timeline-section">
                        <h2>Milestones</h2>
                        <Timeline mode="right">
                            {milestones.map((milestone, index) => (
                                <Timeline.Item key={index} label={milestone.year}>
                                    {milestone.event}
                                </Timeline.Item>
                            ))}
                        </Timeline>
                    </div>

                    <div className="strategy-cards">
                        <h2>Key Strategies</h2>
                        <div className="cards-container">
                            {strategies.map((strategy, index) => (
                                <div className="card-div" key={index} title={strategy.title} >
                                    <p>{strategy.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='certificate-new'>
                <DocumentCertificate />
            </div>
        </div>
    );
};

export default StrategyRoadMap;
