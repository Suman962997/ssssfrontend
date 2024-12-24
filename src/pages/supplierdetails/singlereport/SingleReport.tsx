import React from 'react';
import EmissionsChart from '../../../component/emissionschart/EmissionsChart';
import './SingleReport.scss';
import FinancialTable from '../../../component/financialtable/FinancialTable';
import AnalyseChart from '../../../component/analyseChart/AnalyseChart';
import DocumentCertificate from '../overview/component/document/DocumentCertificate';
const SingleReport = () => {
    return (
        <div className='single-report'>
            <div className='report-main'>
                <div className='report-chart'>
                    <div className='report-emissionchart'>
                        <EmissionsChart title={'Reports'} />
                    </div>
                    <div className='report-multichart'>
                        <AnalyseChart title={"Reports"} />
                    </div>
                </div>
                <FinancialTable />
            </div>
            <div className='certificate-new'>
                <DocumentCertificate />
            </div>
        </div>

    )
}

export default SingleReport
