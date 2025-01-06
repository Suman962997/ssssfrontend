import React from 'react';
import './Waste.scss';
import NormalChart from '../../../component/normalchart/NormalChart';
import DocumentCertificate from '../overview/component/document/DocumentCertificate';

const Waste = () => {
    const wasteData = {
        waste: 40,
        consumption: 60,
        title: "Waste & Consumption",
        label1: "Waste",
        label2: "Consumption"
    };

    return (
        <div className='waste-main'>
            <div className='circle-chart'>
                <div className='waste-title'>Waste & Consumption</div>
                <div className='waste-chart'>
                    <NormalChart data={wasteData} />
                </div>
            </div>
            <div className='certificate-new'>
                <DocumentCertificate />
            </div>
        </div>
    );
};

export default Waste;
