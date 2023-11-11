import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

const CodeRenderer = ({ logEntry, language, showLineNumbers, wrapLongLines }) => {
  return (
    <SyntaxHighlighter 
      language={language} 
      showLineNumbers={showLineNumbers} 
      style={github}
      wrapLongLines={wrapLongLines}
      >
      {logEntry}
    </SyntaxHighlighter>
  );
};

export default CodeRenderer;