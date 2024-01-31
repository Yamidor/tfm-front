import React from 'react';

const CodeDisplay = ({ code }) => {
  return (
    <div>
      <h2>Código Mostrado:</h2>
      <pre>{code}</pre>
    </div>
  );
};

export default CodeDisplay;
