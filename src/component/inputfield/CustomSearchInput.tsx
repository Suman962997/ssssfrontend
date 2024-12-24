import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './SearchInput.scss';

interface CustomSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: 'small' | 'middle' | 'large';
}

const CustomSearchInput: React.FC<CustomSearchInputProps> = ({
  value,
  onChange,
  placeholder,
  disabled = false,
  size = 'middle',
}) => {
  return (
    <div className="custom-search-wrapper">
      <Input
        value={value}
        prefix={<SearchOutlined />}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || 'Search...'}
        disabled={disabled}
        size={size}
      />
    </div>
  );
};

export default CustomSearchInput;
