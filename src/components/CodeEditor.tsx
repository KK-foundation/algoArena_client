
import { useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
}

const CodeEditor = ({ value, onChange, language }: CodeEditorProps) => {
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    
    // Configure Monaco theme to match our dark theme
    editor.updateOptions({
      fontSize: 14,
      fontFamily: 'Fira Code, JetBrains Mono, monospace',
      lineNumbers: 'on',
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      wordWrap: 'on',
      tabSize: 4,
    });
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      onChange(value);
    }
  };

  return (
    <div className="h-full bg-craft-bg">
      <Editor
        height="100%"
        language={language}
        value={value}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        theme="vs-dark"
        options={{
          fontSize: 14,
          fontFamily: 'Fira Code, JetBrains Mono, monospace',
          lineNumbers: 'on',
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          tabSize: 4,
          automaticLayout: true,
          padding: { top: 16, bottom: 16 },
        }}
      />
    </div>
  );
};

export default CodeEditor;
