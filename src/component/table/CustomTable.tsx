import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import './Table.scss';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import CustomSearchInput from '../inputfield/CustomSearchInput';
import { useLocation } from 'react-router-dom';

interface CustomTableProps {
  columns: any[];
  data: any[];
  title?: string;
  bordered?: boolean;
  pagination?: any;
  footer?: any;
  onRow?: (record: any) => React.HTMLAttributes<HTMLElement>;
}

const CustomTable: React.FC<CustomTableProps> = ({
  columns,
  data,
  title,
  bordered = false,
  pagination = false,
  footer,
  onRow,
}) => {
  const location = useLocation();


  const currentPath = location.pathname.split("/")[3];
  const currentLoc = location.pathname.split("/")[1];

  const [filteredData, setFilteredData] = useState<any[]>(data);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    if (!searchText) {
      setFilteredData(data);
      return;
    }

    const lowerSearchText = searchText.toLowerCase();
    const filtered = data.filter((row) =>
      ['supplier', 'industry', 'category', 'compliance'].some((key) =>
        row[key]?.toString().toLowerCase().includes(lowerSearchText)
      )
    );

    setFilteredData(filtered);
  }, [searchText, data]);

  const handleSearchChange = (value: string) => {
    setSearchText(value);
  };

  const customizedColumns = columns.map((col) => ({
    ...col,
    sorterIcon: (
      <>
        <CaretUpOutlined className="custom-sort-icon" />
        <CaretDownOutlined className="custom-sort-icon" />
      </>
    ),
  }));
  console.log(currentLoc, 'currentPath')
  return (
    <div className="custom-table-container">
      {currentPath !== "benchmark-sustainability" && currentLoc !== "questionnaire" &&
        <div className='search-bar' >
          <div className="table-title">{title}<span className='title-count'>({filteredData?.length})</span></div>
          <div> <CustomSearchInput
            value={searchText}
            onChange={handleSearchChange}
            placeholder="Search here..."
          />
          </div>
        </div>
      }
      <Table
        columns={customizedColumns}
        dataSource={filteredData}
        pagination={pagination}
        bordered={bordered}
        className="custom-table"
        onRow={onRow}
        footer={footer}
      />
    </div>
  );
};

export default CustomTable;
