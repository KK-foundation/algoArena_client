import QuestionDescription from "../components/QuestionDescription";
import Solution from "../components/Solution";
import Accepted from "../components/Accepted";
import { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import { RotateCcw, Expand, AlignLeft } from "lucide-react";

const languageOptions = [
  { label: "JavaScript", value: "javascript" },
  { label: "C++", value: "cpp" },
  { label: "Java", value: "java" },
  { label: "Python", value: "python" },
];

const ProblemDetail = () => {
  const [activeCard, setActiveCard] = useState("1");
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("// Start coding...");
  const editorRef = useRef(null);
  const [showConsole, setShowConsole] = useState(false);
  const [inputs, setInputs] = useState("1");

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const handleFormat = () => {
    editorRef.current?.getAction("editor.action.formatDocument")?.run();
  };

  const handleReset = () => {
    setCode("// Start coding...");
  };

  const handleRun = () => {
    console.log("Run code:", code);
  };

  const handleSubmit = () => {
    console.log("Submit code:", code);
  };

  return (
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
            </ul>
          </div>
          <div>
            {activeCard === "1" && <QuestionDescription />}
            {activeCard === "2" && <Solution />}
            {activeCard === "3" && <Accepted />}
          </div>
        </div>
        {/* Code editor */}
        <div className="border rounded-lg overflow-hidden w-full h-[600px] flex flex-col bg-[#1e1f22] relative">
          {/* Top Bar */}
          <div className="flex justify-between items-center bg-[#2f3136] p-2 border-b border-gray-700">
            {/* Language Dropdown */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-[#3a3d42] text-white px-3 py-1 rounded focus:outline-none"
            >
              {languageOptions.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>

            {/* Action Icons */}
            <div className="flex gap-3 text-white">
              <button onClick={handleReset} title="Reset">
                <RotateCcw size={18} />
              </button>
              <button onClick={handleFormat} title="Format">
                <AlignLeft size={18} />
              </button>
              <button title="Fullscreen (not functional)">
                <Expand size={18} />
              </button>
            </div>
          </div>

          {/* Editor */}
          <div className="flex-1">
            <Editor
              height="100%"
              language={language}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value)}
              onMount={handleEditorDidMount}
            />
          </div>
          {/* {showConsole && (
            <div
              className="h-20 w-full cursor-row-resize bg-gray-700 hover:bg-blue-600"
              onDrag={() => (
                setConsoleHeight(prve => prve++)
              )}
            > hlllll</div>
          )} */}
          {/* console panel */}
          {showConsole && (
            <div className="bg-[#1e1f22] text-white p-3 overflow-auto border-t border-gray-700 absolute bottom-11.5 left-0 right-0 h-[50%] w-[100%] z-50">
              <div className="">
                <div className="border rounded-lg bg-[#303133] h-[600px] overflow-scroll overflow-x-hidden">
                  <div>
                    <ul className="flex gap-4 border-b-1">
                      <li
                        className={`text-lg font-semibold cursor-pointer ${
                          activeCard === "1" ? "border-b-2" : ""
                        } px-4 py-1`}
                        onClick={() => setActiveCard("1")}
                      >
                        Inputs
                      </li>
                      <li
                        className={`text-lg font-semibold cursor-pointer px-4 py-1 ${
                          activeCard === "2" ? "border-b-2" : ""
                        }`}
                        onClick={() => setActiveCard("2")}
                      >
                        Outputs
                      </li>
                    </ul>
                  </div>
                  <div className="p-4">
                    {activeCard === "1" && (
                      <div>
                        <div className="flex gap-8">
                          {[0, 0].map((i, index) => (
                            <div>
                              <p
                                className="bg-[#212326] w-fit px-4 py-1 rounded-lg cursor-pointer"
                                onClick={() => setInputs(index)}
                              >
                                Case {index + 1}
                              </p>
                            </div>
                          ))}
                        </div>
                        <div className="flex mt-4  bg-[#212326] px-4 py-2 rounded-lg">
                          <code className="w-full ">nums = [1,4,5,6]</code>
                        </div>
                      </div>
                    )}
                    {activeCard === "2" && (
                      <div>
                        <div className="flex justify-between items-center">
                          <h1 className="text-green-500 font-bold text-2xl">
                            Accepted
                          </h1>
                          <span>Passed test cases: 2/2</span>
                        </div>
                        <br />
                        <div className="flex gap-8">
                          {[0, 0].map((i, index) => (
                            <div>
                              <p
                                className="bg-[#212326] w-fit px-4 py-1 rounded-lg cursor-pointer"
                                onClick={() => setInputs(index)}
                              >
                                Case {index + 1}
                              </p>
                            </div>
                          ))}
                        </div>
                        <br />
                        <div className="flex flex-col gap-4">
                          {["Input","Output","Expected Output"].map((item) => (
                            <div>
                              <p className="font-semibold text-lg">{item} :</p>
                              <div className=" px-4 py-8 mt-2 bg-[#212326] rounded-lg">
                                nums=[1,4,5,6]
                              </div>
                            </div>
                          ))}
                        </div>
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
              >
                Run
              </button>
              <button
                onClick={handleSubmit}
                className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-500 text-sm"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
};

export default ProblemDetail;
