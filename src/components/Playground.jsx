import { useState } from "react";
import Editor from "@monaco-editor/react";

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

export default function Playground() {
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(languageTemplates[language]);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const handleLanguageChange = (e) => {
    const selected = e.target.value;
    setLanguage(selected);
    setCode(languageTemplates[selected]);
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput("Running...");
    const data = {
      languageName: language,
      code: code,
    };
    console.log(data);
    // try {
    //   const encodedCode = btoa(code); // Encode to base64
    //   const response = await axios.post(
    //     "https://judge0-ce.p.rapidapi.com/submissions",
    //     {
    //       source_code: encodedCode,
    //       language_id: languageMap[language],
    //       stdin: "", // optional input
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         "X-RapidAPI-Key": "YOUR_RAPIDAPI_KEY", // Replace with your key
    //         "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    //       },
    //     }
    //   );

    //   const token = response.data.token;

    //   // Polling for result
    //   let result = null;
    //   while (!result || result.status.id <= 2) {
    //     const resultResponse = await axios.get(
    //       `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
    //       {
    //         headers: {
    //           "X-RapidAPI-Key": "YOUR_RAPIDAPI_KEY",
    //           "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    //         },
    //       }
    //     );
    //     result = resultResponse.data;
    //     await new Promise((r) => setTimeout(r, 1000)); // wait 1s
    //   }

    //   const outputText =
    //     result.stdout || result.stderr || result.compile_output || "No output";

    //   setOutput(atob(outputText)); // decode from base64
    // } catch (error) {
    //   setOutput("Error: " + error.message);
    // }

    // setIsRunning(false);
  };

  return (
    <div className="p-4 bg-[#2f3136]">
      <div className="mb-4 flex justify-between">
        <select
          value={language}
          onChange={handleLanguageChange}
          className="p-2 border rounded cursor-pointer"
        >
          <option className="bg-[#13181c] cursor-pointer" value="cpp">
            C++
          </option>
          <option className="bg-[#13181c] cursor-pointer" value="java">
            Java
          </option>
          <option className="bg-[#13181c] cursor-pointer" value="python">
            Python
          </option>
          <option className="bg-[#13181c] cursor-pointer" value="javascript">
            JavaScript
          </option>
        </select>
        <button
          onClick={handleRun}
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
          disabled={isRunning}
        >
          {isRunning ? "Running..." : "Run"}
        </button>
      </div>

      <Editor
        height="400px"
        language={language}
        value={code}
        onChange={(value) => setCode(value)}
      />

      <div className="mt-4 bg-[#13181c] text-green-400 p-4 rounded h-48 overflow-auto font-mono">
        <strong>Output:</strong>
        <pre>{output}</pre>
      </div>
    </div>
  );
}
