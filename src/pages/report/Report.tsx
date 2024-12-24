import React, { useEffect, useState } from 'react'
import './Report.scss'
import FinancialTable from '../../component/financialtable/FinancialTable'
import FinancialChart from '../../component/financialchart/FinancialChart'
import Loader from '../../component/loader/Loader'
const Report: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(loadData);
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className='main-report'>
      <FinancialChart />
      <div className='report-table'>
        <FinancialTable />
      </div>
    </div>
  )
}

export default Report
