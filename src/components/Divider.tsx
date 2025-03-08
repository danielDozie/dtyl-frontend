import React from 'react';
import { Text } from './ui/text';
import AppButton from './ui/app-button';

interface DividerProps {
  title?: string;
  buttonText?: string;
  onClick?: () => void;
}

const Divider: React.FC<DividerProps> = ({ title, onClick, buttonText }) => {
  return (
    <div className={`flex min-w-full justify-between ${title ? `py-2 md:py-4 md:mt-24`: `py-8`} px-4 md:px-8 border-b border-foreground dark:border-foreground`}>
      {title && (
        <div className="mb-4">
          <Text className="text-2xl md:text-[40px] font-medium">
            {title}<span className="text-red font-bold !text-5xl">.</span>
          </Text>
        </div>
      )}
      {buttonText && (
        <div className="">
          <AppButton
            title={buttonText}
            onClick={onClick}
          />
        </div>
      )}
    </div>
  );
};

export default Divider;
