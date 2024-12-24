import React from 'react';
import { Drawer, Button } from 'antd';
import { DrawerProps } from 'antd/es/drawer';
import '../style/Drawer.scss'; 

interface CustomDrawerProps extends DrawerProps {
  title: string;
  onClose: () => void;
  visible: boolean;
  footerContent?: React.ReactNode;
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({
  title,
  onClose,
  visible,
  footerContent,
  children,
  ...props
}) => {
  return (
    <Drawer
      className="custom-drawer" 
      title={title}
      placement="right"
      onClose={onClose}
      visible={visible}
      width={400} 
      {...props} 
    >
      <div className="custom-content">
        {children}
      </div>

      <div className="custom-footer">
        {footerContent ? (
          footerContent
        ) : (
          <Button onClick={onClose} type="primary">
            Close
          </Button>
        )}
      </div>
    </Drawer>
  );
};

export default CustomDrawer;
