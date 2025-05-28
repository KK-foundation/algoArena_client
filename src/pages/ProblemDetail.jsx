import QuestionDescription from "../components/QuestionDescription";
import Solution from "../components/Solution";
import { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { RotateCcw, Expand, AlignLeft, Loader } from "lucide-react";
import { useParams } from "react-router-dom";
import { useProblemStore } from "../store/useProblemStore";
import { axiosInstance } from "../libs/axios";
import { useExecutionStore } from "../store/useExecutionStore";

import Submissions from "../components/Submissions";
import Accepted from "./Accepted";

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



const ProblemDetail = () => {
  const { problemId } = useParams();
  const { isProblemLoading, problem, getProblemById } = useProblemStore();
  const {
    isExecutingRun,
    executeRun,
    isExecuting,
    submitResult,
    testCaseResult,
    executeSubmit,
  } = useExecutionStore();

  const [activeCard, setActiveCard] = useState("1");
  const [inputs, setInputs] = useState("1");

  const [language, setLanguage] = useState("JAVA");
  const [code, setCode] = useState(problem?.codeSnippets[language]);
  const editorRef = useRef(null);
  const [showConsole, setShowConsole] = useState(false);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const handleFormat = async () => {
    if (!editorRef.current) return;
    if (langMap[language] === "javascript") {
      editorRef.current.getAction("editor.action.formatDocument").run();
    } else {
      const response = await axiosInstance.post("/format", {
        code: editorRef.current.getValue(),
        language,
      });
      editorRef.current.setValue(response.data.formattedCode);
    }
  };

  const handleReset = () => {
    if (problem) {
      setCode(problem.codeSnippets[language]);
    }
  };

  const handleRun = async () => {
    const language_id = languageIdMap[language];
    executeRun(code, language_id, problemId);
  };

  const handleSubmit = () => {
    const language_id = languageIdMap[language];
    executeSubmit(code, language_id, problemId);
  };

  useEffect(() => {
    getProblemById(problemId);
  }, [getProblemById, problemId]);
  useEffect(() => {
    if (testCaseResult) {
      setInputs("2");
      setShowConsole(true);
    }
    if (submitResult) {
      setActiveCard("4");
    }
  }, [testCaseResult, submitResult]);

  if (isProblemLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      {problem ? (
        <div className="w-[90%] lg:w-[90%] m-auto mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* detail about question */}
            <div className="border rounded-lg bg-[#303133] h-[600px] overflow-scroll overflow-x-hidden">
              <div>
                <ul className="flex gap-4 border-b-1">
                  <li
                    className={`text-lg font-semibold cursor-pointer ${
                      activeCard === "1" ? "border-b-2" : ""
                    } px-4 py-1`}
                    onClick={() => setActiveCard("1")}
                  >
                    Question
                  </li>
                  <li
                    className={`text-lg font-semibold cursor-pointer px-4 py-1 ${
                      activeCard === "2" ? "border-b-2" : ""
                    }`}
                    onClick={() => setActiveCard("2")}
                  >
                    Solution
                  </li>
                  <li
                    className={`text-lg font-semibold cursor-pointer px-4 py-1 ${
                      activeCard === "3" ? "border-b-2" : ""
                    }`}
                    onClick={() => setActiveCard("3")}
                  >
                    Submissions
                  </li>
                  {submitResult && <li
                    className={`text-lg font-semibold cursor-pointer px-4 py-1 ${
                      submitResult.status === "Accepted"
                        ? "text-green-500"
                        : "text-red-500"
                    } ${activeCard === "4" ? "border-b-2" : ""}`}
                    onClick={() => setActiveCard("4")}
                  >
                    Accepted
                  </li>}
                </ul>
              </div>
              <div>
                {activeCard === "1" && (
                  <QuestionDescription problem={problem} />
                )}
                {activeCard === "2" && <Solution problem={problem} />}
                {activeCard === "3" && <Submissions problem={problem} />}
                {activeCard === "4" && <Accepted submitResult={submitResult} />}
              </div>
            </div>
            {/* Code editor */}
            <div className="border rounded-lg overflow-hidden w-full h-[600px] flex flex-col bg-[#1e1f22] relative">
              {/* Top Bar */}
              <div className="flex justify-between items-center bg-[#2f3136] p-2 border-b border-gray-700">
                {/* Language Dropdown */}
                <select
                  value={language}
                  onChange={(e) => {
                    setLanguage(e.target.value);
                    setCode(problem.codeSnippets[e.target.value]);
                  }}
                  className="bg-[#3a3d42] text-white px-3 py-1 rounded focus:outline-none"
                >
                  {Object.entries(problem.codeSnippets).map(
                    ([lang, details]) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    )
                  )}
                </select>

                {/* Action Icons */}
                <div className="flex gap-3 text-white">
                  <button
                    onClick={handleReset}
                    title="Reset"
                    className="cursor-pointer"
                  >
                    <RotateCcw size={18} />
                  </button>
                  <button
                    onClick={handleFormat}
                    title="Format"
                    className="cursor-pointer"
                  >
                    <AlignLeft size={18} />
                  </button>
                  <button
                    title="Fullscreen (not functional)"
                    className="cursor-pointer"
                  >
                    <Expand size={18} />
                  </button>
                </div>
              </div>

              {/* Editor */}
              <div className="flex-1">
                <Editor
                  height="100%"
                  language={langMap[language]}
                  theme="vs-dark"
                  value={code || problem.codeSnippets[language]}
                  onChange={(value) => setCode(value)}
                  onMount={handleEditorDidMount}
                  ref={editorRef}
                />
              </div>

              {/* console panel */}
              {showConsole && (
                <div className="bg-[#1e1f22] text-white p-3 overflow-auto border-t border-gray-700 absolute bottom-11.5 left-0 right-0 h-[50%] w-[100%] z-50">
                  <div className="">
                    <div className="border rounded-lg bg-[#303133] h-[600px] overflow-scroll overflow-x-hidden">
                      <div>
                        <ul className="flex gap-4 border-b-1">
                          <li
                            className={`text-lg font-semibold cursor-pointer ${
                              inputs === "1" ? "border-b-2" : ""
                            } px-4 py-1`}
                            onClick={() => setInputs("1")}
                          >
                            Inputs
                          </li>
                          <li
                            className={`text-lg font-semibold cursor-pointer px-4 py-1 ${
                              inputs === "2" ? "border-b-2" : ""
                            }`}
                            onClick={() => setInputs("2")}
                          >
                            Outputs
                          </li>
                        </ul>
                      </div>
                      <div className="p-4">
                        {inputs === "1" && (
                          <div className="flex flex-col gap-4">
                            {problem.publicTestcases.map((testcase, index) => (
                              <div>
                                <p className="w-fit  rounded-lg">
                                  Case {index + 1} :
                                </p>
                                <br />
                                <code className="w-full bg-[#1e1f22] px-4 py-2 rounded-lg">
                                  Input : {testcase.input}
                                </code>
                                <br />
                                <br />
                                <code className="w-full bg-[#1e1f22] px-4 py-2 rounded-lg">
                                  Expected Output : {testcase.output}
                                </code>
                              </div>
                            ))}
                          </div>
                        )}

                        {inputs === "2" && (
                          <div>
                            {testCaseResult && (
                              <>
                                <div className="flex justify-between items-center">
                                  <h1 className="text-green-500 font-bold text-2xl">
                                    {testCaseResult.status}
                                  </h1>
                                  <span>
                                    Passed test cases:{" "}
                                    {
                                      testCaseResult.testCases.filter(
                                        (tc) => tc.status === "Accepted"
                                      ).length
                                    }
                                    /{testCaseResult.testCases.length}
                                  </span>
                                </div>
                                <br />
                                <div className="flex flex-col gap-8">
                                  {testCaseResult.testCases.map(
                                    (testcase, index) => (
                                      <div className="flex flex-col bg-[#212326] w-full px-4 py-2 rounded-lg cursor-pointer">
                                        <p
                                          className={`font-bold ${
                                            testcase.status === "Accepted"
                                              ? "text-green-500"
                                              : "text-red-500"
                                          }`}
                                          onClick={() => setInputs(index)}
                                        >
                                          Case {index + 1} :
                                        </p>
                                        <br />
                                        {testcase.status === "Accepted" ? (
                                          <>
                                            <p className="text-green-500">
                                              Your Output :{testcase.stdout}
                                            </p>
                                            <br />
                                            <p className="text-green-500">
                                              Expected Output :
                                              {testcase.expected}
                                            </p>
                                          </>
                                        ) : (
                                          <p className="text-red-500">
                                            {testcase.compileOutput}
                                          </p>
                                        )}
                                      </div>
                                    )
                                  )}
                                </div>
                                <br />
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Bar */}
              <div className="flex justify-between items-center bg-[#2f3136] p-2 border-t border-gray-700">
                {/* Console Button */}
                <button
                  className="bg-blue-600 text-white px-4 py-1 rounded font-semibold text-sm hover:bg-blue-500"
                  onClick={() => setShowConsole((prev) => !prev)}
                >
                  {showConsole ? "Hide Console" : "Console"}
                </button>

                {/* Run & Submit */}
                <div className="flex gap-2">
                  <button
                    onClick={handleRun}
                    className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-500 text-sm"
                    disabled={isExecutingRun}
                  >
                    {isExecutingRun ? (
                      <Loader className="animate-spin" />
                    ) : (
                      "Run"
                    )}
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-500 text-sm"
                    disabled={isExecuting}
                  >
                    {isExecuting ? (
                      <Loader className="animate-spin" />
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <br />
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default ProblemDetail;

{
  /* {showConsole && (
            <div
              className="h-20 w-full cursor-row-resize bg-gray-700 hover:bg-blue-600"
              onDrag={() => (
                setConsoleHeight(prve => prve++)
              )}
            > hlllll</div>
          )} */
}

// {
//             "id": "b5963ce3-81a5-48a5-947c-a7a9d144628f",
//             "title": "Climbing Stairs",
//             "description": "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
//             "difficulty": "EASY",
//             "tags": [
//                 "Dynamic Programming",
//                 "Math",
//                 "Memoization"
//             ],
//             "userId": "78f38ea9-6a1b-4b2f-8a02-f5b3694c1a55",
//             "examples": {
//                 "CPP": {
//                     "input": "n = 4",
//                     "output": "5",
//                     "explanation": "There are five ways to climb to the top:\n1. 1 step + 1 step + 1 step + 1 step\n2. 1 step + 1 step + 2 steps\n3. 1 step + 2 steps + 1 step\n4. 2 steps + 1 step + 1 step\n5. 2 steps + 2 steps"
//                 },
//                 "JAVA": {
//                     "input": "n = 4",
//                     "output": "5",
//                     "explanation": "There are five ways to climb to the top:\n1. 1 step + 1 step + 1 step + 1 step\n2. 1 step + 1 step + 2 steps\n3. 1 step + 2 steps + 1 step\n4. 2 steps + 1 step + 1 step\n5. 2 steps + 2 steps"
//                 },
//                 "PYTHON": {
//                     "input": "n = 3",
//                     "output": "3",
//                     "explanation": "There are three ways to climb to the top:\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step"
//                 },
//                 "JAVASCRIPT": {
//                     "input": "n = 2",
//                     "output": "2",
//                     "explanation": "There are two ways to climb to the top:\n1. 1 step + 1 step\n2. 2 steps"
//                 }
//             },
//             "constraints": "1 <= n <= 45",
//             "hints": null,
//             "editorial": null,
//             "testcases": [
//                 {
//                     "input": "2",
//                     "output": "2"
//                 },
//                 {
//                     "input": "3",
//                     "output": "3"
//                 },
//                 {
//                     "input": "4",
//                     "output": "5"
//                 }
//             ],
//             "codeSnippets": {
//                 "CPP": "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Main {\npublic:\nint climbStairs(int n) {\n    // Write your code here\n                       return 0;\n                     }\n                 };\n\n                 int main() {\n                    string input;\n                     getline(cin, input);\n                     int n = stoiinput);\n\n                     Main mainObj; // Use Main class instead of Solution\n                     int result = mainObj.climbStairs(n);\n\n                     cout << result << endl;\n                     return 0;\n                 };",
//                 "JAVA": "import java.util.Scanner;\n\nclass Main {\n  public int climbStairs(int n) {\n      // Write your code here\n      return 0;\n  }\n  \n  public static void main(String[] args) {\n      Scanner scanner = new Scanner(System.in);\n      int n = Integer.parseInt(scanner.nextLine().trim());\n      \n      // Use Main class instead of Solution\n      Main main = new Main();\n      int result = main.climbStairs(n);\n      \n      System.out.println(result);\n      scanner.close();\n  }\n}",
//                 "PYTHON": "class Solution:\n  def climbStairs(self, n: int) -> int:\n      # Write your code here\n      pass\n\n# Input parsing\nif __name__ == \"__main__\":\n  import sys\n  \n  # Parse input\n  n = int(sys.stdin.readline().strip())\n  \n  # Solve\n  sol = Solution()\n  result = sol.climbStairs(n)\n  \n  # Print result\n  print(result)",
//                 "JAVASCRIPT": "/**\n* @param {number} n\n* @return {number}\n*/\nfunction climbStairs(n) {\n// Write your code here\n}\n\n// Parse input and execute\nconst readline = require('readline');\nconst rl = readline.createInterface({\ninput: process.stdin,\noutput: process.stdout,\nterminal: false\n});\n\nrl.on('line', (line) => {\nconst n = parseInt(line.trim());\nconst result = climbStairs(n);\n\nconsole.log(result);\nrl.close();\n});"
//             },
//             "referenceSolutions": {
//                 "CPP": "#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nclass Main {\npublic:\n    int climbStairs(int n) {\n        // Base cases\n        if (n <= 2) {\n            return n;\n        }\n\n        // Dynamic programming approach\n        vector<int> dp(n + 1);\n        dp[1] = 1;\n        dp[2] = 2;\n\n        for (int i = 3; i <= n; i++) {\n            dp[i] = dp[i - 1] + dp[i - 2];\n        }\n\n        return dp[n];\n\n        /* Alternative approach with O(1) space\n        int a = 1; // ways to climb 1 step\n        int b = 2; // ways to climb 2 steps\n\n        for (int i = 3; i <= n; i++) {\n            int temp = a + b;\n            a = b;\n            b = temp;\n        }\n\n        return n == 1 ? a : b;\n        */\n    }\n};\n\nint main() {\n    string input;\n    getline(cin, input);\n    int n = stoi(input);\n\n    // Use Main class instead of Solution\n    Main mainObj;\n    int result = mainObj.climbStairs(n);\n\n    cout << result << endl;\n    return 0;\n}\n",
//                 "JAVA": "import java.util.Scanner;\n\nclass Main {\n  public int climbStairs(int n) {\n      // Base cases\n      if (n <= 2) {\n          return n;\n      }\n      \n      // Dynamic programming approach\n      int[] dp = new int[n + 1];\n      dp[1] = 1;\n      dp[2] = 2;\n      \n      for (int i = 3; i <= n; i++) {\n          dp[i] = dp[i - 1] + dp[i - 2];\n      }\n      \n      return dp[n];\n      \n      /* Alternative approach with O(1) space\n      int a = 1; // ways to climb 1 step\n      int b = 2; // ways to climb 2 steps\n      \n      for (int i = 3; i <= n; i++) {\n          int temp = a + b;\n          a = b;\n          b = temp;\n      }\n      \n      return n == 1 ? a : b;\n      */\n  }\n  \n  public static void main(String[] args) {\n      Scanner scanner = new Scanner(System.in);\n      int n = Integer.parseInt(scanner.nextLine().trim());\n      \n      // Use Main class instead of Solution\n      Main main = new Main();\n      int result = main.climbStairs(n);\n      \n      System.out.println(result);\n      scanner.close();\n  }\n}",
//                 "PYTHON": "class Solution:\n  def climbStairs(self, n: int) -> int:\n      # Base cases\n      if n <= 2:\n          return n\n      \n      # Dynamic programming approach\n      dp = [0] * (n + 1)\n      dp[1] = 1\n      dp[2] = 2\n      \n      for i in range(3, n + 1):\n          dp[i] = dp[i - 1] + dp[i - 2]\n      \n      return dp[n]\n      \n      # Alternative approach with O(1) space\n      # a, b = 1, 2\n      # \n      # for i in range(3, n + 1):\n      #     a, b = b, a + b\n      # \n      # return a if n == 1 else b\n\n# Input parsing\nif __name__ == \"__main__\":\n  import sys\n  \n  # Parse input\n  n = int(sys.stdin.readline().strip())\n  \n  # Solve\n  sol = Solution()\n  result = sol.climbStairs(n)\n  \n  # Print result\n  print(result)",
//                 "JAVASCRIPT": "/**\n* @param {number} n\n* @return {number}\n*/\nfunction climbStairs(n) {\n// Base cases\nif (n <= 2) {\n  return n;\n}\n\n// Dynamic programming approach\nlet dp = new Array(n + 1);\ndp[1] = 1;\ndp[2] = 2;\n\nfor (let i = 3; i <= n; i++) {\n  dp[i] = dp[i - 1] + dp[i - 2];\n}\n\nreturn dp[n];\n\n/* Alternative approach with O(1) space\nlet a = 1; // ways to climb 1 step\nlet b = 2; // ways to climb 2 steps\n\nfor (let i = 3; i <= n; i++) {\n  let temp = a + b;\n  a = b;\n  b = temp;\n}\n\nreturn n === 1 ? a : b;\n*/\n}\n\n// Parse input and execute\nconst readline = require('readline');\nconst rl = readline.createInterface({\ninput: process.stdin,\noutput: process.stdout,\nterminal: false\n});\n\nrl.on('line', (line) => {\nconst n = parseInt(line.trim());\nconst result = climbStairs(n);\n\nconsole.log(result);\nrl.close();\n});"
//             },
//             "createdAt": "2025-05-27T05:06:33.996Z",
//             "updatedAt": "2025-05-27T05:06:33.996Z"
//         }
