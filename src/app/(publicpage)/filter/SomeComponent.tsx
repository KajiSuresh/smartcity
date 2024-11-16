import React from 'react';

interface SomeComponentProps {
  category: string;
}

const SomeComponent: React.FC<SomeComponentProps> = ({ category }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold">Category: {category}</h2>
      {/* Add other content for SomeComponent */}
    </div>
  );
};

export default SomeComponent;
