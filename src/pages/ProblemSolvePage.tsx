import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import CodeEditor from "@/components/CodeEditor";
import ProblemDescription from "@/components/ProblemDescription";
import TestResults from "@/components/TestResults";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Send, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { problemsAPI } from "@/api/problems";
import { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { CodeFormatter } from "@/utils/codeFormatter";
import { useProblem } from "@/hooks/useProblems";

const langMap = {
  CPP: "cpp",
  JAVA: "java",
  PYTHON: "python",
  JAVASCRIPT: "javascript",
};

const ProblemSolvePage = () => {
  const { id } = useParams();
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("PYTHON");
  const [testResults, setTestResults] = useState({
    passed: 2,
    total: 4,
    cases: [
      {
        input: "1 2",
        expected: "3",
        actual: "3",
        passed: true,
        time: "12ms",
      },
      {
        input: "10 15",
        expected: "25",
        actual: "20",
        passed: false,
        time: "8ms",
      },
      {
        input: "0 0",
        expected: "0",
        actual: "0",
        passed: true,
        time: "5ms",
      },
      {
        input: "-5 -5",
        expected: "-10",
        actual: "-9",
        passed: false,
        time: "9ms",
      },
    ],
  });
  const [isRunning, setIsRunning] = useState(false);

  const { getProblemById } = problemsAPI;
  const { data: problem, isLoading: isProblemLoading } = useProblem(id);

  useEffect(() => {
    getProblemById(id);
  }, [getProblemById, id]);

  useEffect(() => {
    if (problem && problem.codeSnippets) {
      setCode(problem.codeSnippets[language]);
    }
  }, [problem, language]);

  const handleRunCode = async () => {
    setIsRunning(true);
    toast("Running code...");

    // Simulate API call
    setTimeout(() => {
      setTestResults({
        passed: 2,
        total: 3,
        cases: [
          {
            input: "[2,7,11,15], 9",
            expected: "[0,1]",
            actual: "[0,1]",
            passed: true,
            time: "1ms",
          },
          {
            input: "[3,2,4], 6",
            expected: "[1,2]",
            actual: "[1,2]",
            passed: true,
            time: "1ms",
          },
          {
            input: "[3,3], 6",
            expected: "[0,1]",
            actual: "Time Limit Exceeded",
            passed: false,
            time: ">1000ms",
          },
        ],
      });
      setIsRunning(false);
      toast("Code execution completed");
    }, 2000);
  };

  const handleSubmit = async () => {
    setIsRunning(true);
    toast("Submitting solution...");

    // Simulate submission
    setTimeout(() => {
      toast.success("Solution accepted! +15 XP");
      setIsRunning(false);
    }, 3000);
  };

  if (isProblemLoading) return <div>Loading...</div>;

  const handleFormat = () => {
    const formattedCode = CodeFormatter.formatForJudge0(code, language);
    setCode(formattedCode);
  };

  return (
    <div className="min-h-screen bg-craft-bg">
      <Header />
      <div className="flex h-[calc(100vh-80px)] container mx-auto px-6">
        <ResizablePanelGroup direction="horizontal">
          {/* Left Panel - Problem Description */}
          <ResizablePanel>
            <div className="bg-craft-panel border-r border-craft-border overflow-y-auto [scrollbar-gutter:stable]">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <h1 className="text-xl font-bold text-craft-text-primary">
                      {problem?.title}
                    </h1>
                    <Badge className="bg-craft-success/20 text-craft-success border-craft-success/30">
                      {problem?.difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-craft-text-secondary hover:text-craft-accent"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-craft-text-secondary hover:text-craft-accent"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <ProblemDescription problem={problem} />
              </div>
            </div>
          </ResizablePanel>

          {/* Resize Handle */}
          <ResizableHandle />

          {/* Right Panel - Code Editor */}
          <ResizablePanel>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel>
                <div className="flex flex-col h-full">
                  {/* Editor Header */}
                  <div className="bg-craft-panel border-b border-craft-border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <select
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          className="bg-craft-bg border px-2 border-craft-border rounded py-1 text-craft-text-primary focus:border-craft-accent"
                        >
                          <option value="PYTHON">Python</option>
                          <option value="JAVASCRIPT">Javascript</option>
                          <option value="JAVA">Java</option>
                          <option value="CPP">C++</option>
                        </select>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-craft-text-secondary hover:text-craft-accent"
                            >
                              <Settings className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-craft-bg border-craft-border text-craft-text-primary hover:bg-craft-bg/80">
                            <DropdownMenuLabel>Settings</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleFormat}>
                              Format
                            </DropdownMenuItem>
                            <DropdownMenuItem>Reset</DropdownMenuItem>
                            <DropdownMenuItem>FullScreen</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          onClick={handleRunCode}
                          disabled={isRunning}
                          variant="outline"
                          className="border-craft-border text-black hover:border-craft-bg"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Run
                        </Button>
                        <Button
                          onClick={handleSubmit}
                          disabled={isRunning}
                          className="bg-craft-accent hover:bg-craft-accent/80 text-craft-bg"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Code Editor */}
                  <div className="h-full">
                    <CodeEditor
                      value={code}
                      onChange={(value) => setCode(value)}
                      language={langMap[language]}
                    />
                  </div>

                  {/* Test Results */}
                </div>
              </ResizablePanel>
              <ResizableHandle />
              {testResults && (
                <ResizablePanel>
                  <TestResults results={testResults} />
                </ResizablePanel>
              )}
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default ProblemSolvePage;
