import React from 'react';
import { Button } from 'antd';
import '../buttons/Buttons.scss';

interface ButtonProps {
  label: string;
  onClick?: any;
  type?: "primary" | "outline" | "secondary" | "default";
  icon?: any;
  className?: string;
  disabled?: any;
}

const CustomButton: React.FC<ButtonProps> = ({ label, onClick, type = "primary", icon, className = "primary-button", disabled }) => {
  return (
    <>
      {type === 'primary' ? (
        <Button className={className} type="primary" disabled={disabled} onClick={onClick} icon={icon}>
          {label}
        </Button>
      ) : (
        <Button className="outline-button" onClick={onClick} disabled={disabled} icon={icon}>
          {label}
        </Button>
      )}
    </>
  );
};

export default CustomButton;
