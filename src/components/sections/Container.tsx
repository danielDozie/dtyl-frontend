import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
      <section className='w-full flex flex-col my-8 items-center px-4 md:px-8'>
              {children}
    </section>
  );
};

export default Container;
