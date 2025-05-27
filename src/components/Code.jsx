import React, { useState } from "react";
import { Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const langMap = {
  CPP: "cpp",
  JAVA: "java",
  PYTHON: "python",
  JAVASCRIPT: "javascript",
};

const Code = ({ solution }) => {
  const [selected, setSelected] = useState("CPP");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(solution[selected]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className="w-full mx-auto border rounded-lg shadow-lg overflow-hidden">
      {/* Header Tabs */}
      <div className="flex">
        {Object.entries(solution).map(([lang]) => (
          <button
            key={lang}
            onClick={() => setSelected(lang)}
            className={`px-4 py-2 font-medium capitalize cursor-pointer ${
              selected === lang ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Code Block */}
      <div className="relative group bg-[#212326] text-white text-sm overflow-x-auto">
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 hidden group-hover:block bg-gray-700 text-white px-2 py-1 rounded text-xs hover:bg-gray-600"
        >
          {copied ? "Copied!" : <Copy size={16} />}
        </button>

        <SyntaxHighlighter
          language={langMap[selected]}
          style={oneDark}
          customStyle={{ margin: 0, padding: "1rem" }}
        >
          {solution[selected]}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default Code;
