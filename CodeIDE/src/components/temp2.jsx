 import React from 'react'
 import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
const temp2 = () => {
  return (
    <div>
      <Editor height="90vh" defaultLanguage="cpp" defaultValue="// some comment" />;
    </div>
  )
}

export default temp2
