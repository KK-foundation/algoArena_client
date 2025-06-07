import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import CodeEditor from "@/components/CodeEditor";
import ProblemDescription from "@/components/ProblemDescription";
import TestResults, { TestResultsT } from "@/components/TestResults";
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
import LoadingAnimation from "@/components/LoadingAnimation";
import CelebrationPopup from "@/components/CelebrationPopup";
import { useAuthCheck } from "@/hooks/useAuth";
import { times } from "@/constants/achivements";

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
  const [testResults, setTestResults] = useState<TestResultsT | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const { data: authUser, refetch } = useAuthCheck();

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
  
     

    try {
      // Validate inputs
      if (!code.trim()) {
        toast.error("Please write some code before running");
        setIsRunning(false);
        return;
      }

      if (!id) {
        toast.error("Problem ID not found");
        setIsRunning(false);
        return;
      }

      // Get language ID for the API
      const languageId = CodeFormatter.getJudge0LanguageId(langMap[language]);
      if (!languageId) {
        toast.error(`Unsupported language: ${language}`);
        setIsRunning(false);
        return;
      }

      // Prepare the API call data
      const runData = {
        source_code: code,
        language_id: languageId,
        problemId: id,
      };

      console.log("Running code with data:", runData);

      // Make the actual API call
      const response = await problemsAPI.runCode(runData);
      console.log("Run code response:", response);

      // Process the response and format for TestResults component
      if (response && response.data) {
        const results = response.data;
        console.log({ results });

        // Format the results to match TestResults component expectations
        const formattedCases = (results || []).map((testCase) => ({
          input: testCase.stdin,
          expected: testCase.expected,
          actual: testCase.actual || testCase.stdout || "No output",
          passed: testCase.passed,
          time: testCase.time || "0ms",
        }));

        const passedCount = formattedCases.filter(
          (tc: any) => tc.passed
        ).length;

        console.log({ formattedCases });
        setTestResults({
          passed: passedCount,
          total: formattedCases.length,
          cases: formattedCases,
        });

        toast.success("Code execution completed");
      } else {
        toast.error("Invalid response from server");
      }
    } catch (error: any) {
      console.error("Error running code:", error);
      toast.error(error.message || "Failed to run code");
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    setIsRunning(true);
    toast("Submitting solution...");

    try {
      // Validate inputs
      if (!code.trim()) {
        toast.error("Please write some code before submitting");
        setIsRunning(false);
        return;
      }

      if (!id) {
        toast.error("Problem ID not found");
        setIsRunning(false);
        return;
      }

      // Get language ID for the API
      const languageId = CodeFormatter.getJudge0LanguageId(langMap[language]);
      if (!languageId) {
        toast.error(`Unsupported language: ${language}`);
        setIsRunning(false);
        return;
      }

      // Prepare the API call data
      const submitData = {
        source_code: code,
        language_id: languageId,
        problemId: id,
      };

      console.log("Submitting solution with data:", submitData);

      // Make the actual API call
      const response = await problemsAPI.submitSolution(submitData);
      console.log("Submit solution response:", response);

      // Handle successful submission
      if (response && response.data) {
        const { testCases, stdin } = response.data;
        console.log({ testCases });
        // split the stdin string into an array of lines
        const lines = stdin.split("\n");

        // Format the results to match TestResults component expectations
        const formattedCases = (testCases || []).map((testCase, index) => ({
          input: testCase.stdin || lines[index],
          expected: testCase.expected,
          actual: testCase.actual || testCase.stdout || "No output",
          passed: testCase.passed,
          time: testCase.time || "0ms",
        }));

        const passedCount = formattedCases.filter(
          (tc: any) => tc.passed
        ).length;

        console.log({ formattedCases });
        setTestResults({
          passed: passedCount,
          total: formattedCases.length,
          cases: formattedCases,
        });
        setShowCelebration(true)
        refetch();
      }
    } catch (error: any) {
      console.error("Error submitting solution:", error);
      // Error toast is already handled in the API function
    } finally {
      setIsRunning(false);
    }
  };
  // isProblemLoading = true;
  if (isProblemLoading) return <LoadingAnimation size="4xl" />;

  const handleFormat = () => {
    const formattedCode = CodeFormatter.formatForJudge0(code, language);
    setCode(formattedCode);
  };

  const handleCelebrationClose = () => {
    setShowCelebration(false);
  };

  return (
    <div className="min-h-screen bg-craft-bg">
      <Header />
      <div className="flex h-[calc(100vh-80px)] container mx-auto px-6">
        <ResizablePanelGroup direction="horizontal">
          {/* Left Panel - Problem Description */}
          <ResizablePanel>
            <div className="bg-craft-panel border-r border-craft-border overflow-y-auto [scrollbar-gutter:stable] h-[calc(100vh-80px)]">
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
              {testResults ? (
                <ResizablePanel>
                  <TestResults results={testResults} />
                </ResizablePanel>
              ) : (
                <ResizablePanel>
                  <div className="bg-craft-panel border-t border-craft-border p-4 h-full flex items-center justify-center">
                    <div className="text-craft-text-secondary text-center">
                      <p className="mb-2">Run your code to see test results</p>
                      <p className="text-sm">
                        Click the "Run" button to execute your code against the
                        test cases
                      </p>
                    </div>
                  </div>
                </ResizablePanel>
              )}
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      {/* Celebration Popup */}
      <CelebrationPopup
        isOpen={showCelebration}
        onClose={handleCelebrationClose}
        xpGained={Number(times[problem?.difficulty?.toLowerCase()])}
        currentXP={Number(authUser?.xp)}
        newXP={Number(times[problem?.difficulty?.toLowerCase()] + authUser?.xp)}
      />
    </div>
  );
};

export default ProblemSolvePage;
