import React from 'react';

type ContainerProps = {
  children: React.ReactElement | React.ReactElement[];
  className?: string;
};

function Container({ children, className }: ContainerProps) {
  const containerClassNames = `container mx-auto px-4 ${className}`;
  return <div className={containerClassNames}>{children}</div>;
}

Container.defaultProps = {
  className: '',
};

export default Container;
