import { useState } from "react";
import Editor from "@monaco-editor/react";
import { useExecutionStore } from "../store/useExecutionStore";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";

const languageTemplates = {
  cpp: `#include <iostream>
  using namespace std;

int main() {
    // your code goes here
    return 0;
}
`,

  java: `public class Main {
    public static void main(String[] args) {
        // your code goes here
    }
}
`,

  python: `# your code goes here
print("Hello, World!")
`,

  javascript: `// your code goes here
console.log("Hello, World!");
`,
};
const langMap = {
  CPP: "cpp",
  JAVA: "java",
  PYTHON: "python",
  JAVASCRIPT: "javascript",
};
const languageIdMap = {
  CPP: 54,
  JAVA: 62,
  PYTHON: 71,
  JAVASCRIPT: 63,
};

export default function Playground() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [language, setLanguage] = useState("CPP");
  const [code, setCode] = useState(languageTemplates[langMap[language]]);

  const {
    playgroundResult,
    isPlaygroundCodeExecuting,
    playground,
    playgroundWrong,
  } = useExecutionStore();

  const handleLanguageChange = (e) => {
    const selected = e.target.value;
    setLanguage(selected);
    setCode(languageTemplates[langMap[selected]]);
  };

  const handleRun = async () => {
    const data = {
      language_id: languageIdMap[language],
      code: code,
    };

    if (data) {
      console.log(data);
      playground(data);
    }
  };

  return (
    <div className="p-4 bg-[#2f3136]">
      <div className="mb-4 flex justify-between">
        <select
          value={language}
          onChange={handleLanguageChange}
          className="p-2 border rounded cursor-pointer"
        >
          <option className="bg-[#13181c] cursor-pointer" value="CPP">
            CPP
          </option>
          <option className="bg-[#13181c] cursor-pointer" value="JAVA">
            JAVA
          </option>
          <option className="bg-[#13181c] cursor-pointer" value="PYTHON">
            PYTHON
          </option>
          <option className="bg-[#13181c] cursor-pointer" value="JAVASCRIPT">
            JAVASCRIPT
          </option>
        </select>
        {userInfo ? (
          <button
            onClick={handleRun}
            className="ml-4 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
            disabled={isPlaygroundCodeExecuting}
          >
            {isPlaygroundCodeExecuting ? (
              <Loader className="animate-spin" />
            ) : (
              "Run"
            )}
          </button>
        ) : (
          <Link to="/login">
            <button className="ml-4 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">
              Run
            </button>
          </Link>
        )}
      </div>

      <Editor
        height="400px"
        language={langMap[language]}
        value={code}
        onChange={(value) => setCode(value)}
      />

      <div
        className={`mt-4 bg-[#13181c] p-4 rounded h-48 overflow-auto font-mono`}
      >
        <strong>Output:</strong>
        {playgroundResult && (
          <pre
            className={`${
              !playgroundResult ? "text-red-500" : "text-green-400"
            }`}
          >
            {playgroundResult.stdout}
          </pre>
        )}
        {playgroundResult && (
          <pre className={`${"text-red-500"}`}>
            {playgroundResult.compile_output}
          </pre>
        )}
        {playgroundWrong && (
          <pre
            className={`${playgroundWrong ? "text-red-500" : "text-green-400"}`}
          >
            {playgroundWrong}
          </pre>
        )}
      </div>
    </div>
  );
}
