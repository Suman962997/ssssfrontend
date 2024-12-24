import React from 'react';
import DocumentCertificate from '../overview/component/document/DocumentCertificate';
import AnalyseChart from '../../../component/analyseChart/AnalyseChart';
import './Analyse.scss';
import { useLocation } from 'react-router-dom';

const Analyse: React.FC = () => {
    const location = useLocation();

    return (
        <div className="analyse-main">
            <div className={location.pathname.split('/')[3] === 'analyse' ? "analyse-grid" : "analyse-grid2"}>
                {location.pathname === '/analytics' ? (
                    <>
                        <AnalyseChart title={"Avaerage Score Trend: Silver"} />
                        <AnalyseChart title={"Total ESG Score : All Rating : Silver"} />
                        <AnalyseChart title={"ESG Ratings : All Rating: Silver"} />
                        <AnalyseChart title={"ECIX Rating : All Rating : Silver"} />
                    </>
                ) : (
                    <>
                        <AnalyseChart title={"Total ESG Score : All Rating : Silver"} />
                        <AnalyseChart title={"ESG Ratings : All Rating: Silver"} />
                        <AnalyseChart title={"Avaerage Score Trend: Silver"} />
                        <AnalyseChart title={"ECIX Rating : All Rating : Silver"} />
                    </>
                )}
            </div>
            {location.pathname.split('/')[3] === 'analyse' &&
                <div className="certificate">
                    <DocumentCertificate />
                </div>
            }
        </div>
    );
};

export default Analyse;
