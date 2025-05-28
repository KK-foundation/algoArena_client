import { Copy, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useSubmissionStore } from "../store/useSubmissionStore";
import { useParams } from "react-router-dom";

const Submissions = ({ problem }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const { problemId } = useParams();

  const langMap = {
    CPP: "cpp",
    JAVA: "java",
    PYTHON: "python",
    JAVASCRIPT: "javascript",
  };

  const handleOpen = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // toggle off
    } else {
      setOpenIndex(index);
    }
  };

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeSamples[selected]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const { getSubmissionForProblem, submissionByUser, isLoading } =
    useSubmissionStore();

  useEffect(() => {
    getSubmissionForProblem(problemId);
  }, [getSubmissionForProblem, problemId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  console.log(submissionByUser);
  return (
    <>
      {submissionByUser && submissionByUser.length > 0 ? (
        <div className="p-4">
          <div className="flex flex-col gap-2">
            {submissionByUser.map((submission) => (
              <div key={submission.id}>
                <div
                  className="bg-[#212326] flex justify-between p-3 rounded-lg hover:bg-[#2f3136] cursor-pointer"
                  onClick={() => handleOpen(submission.id)}
                >
                  <h4
                    className={`font-bold ${
                      submission?.status === "Accepted"
                        ? "text-green-500"
                        : "text-red-600"
                    }`}
                  >
                    {submission.status}
                  </h4>
                  <div className="flex gap-8 text-white">
                    <span>{submission.language}</span>
                    <span>
                      {format(
                        submission.createdAt,
                        "MMMM dd, yyyy 'at' hh:mm a"
                      )}
                    </span>
                  </div>
                </div>

                {openIndex === submission.id && (
                  <div className="mt-2 border-l-4 border-green-500 p-4 bg-[#1e1f22] rounded">
                    <div className="relative group bg-[#212326] text-white text-sm overflow-x-auto">
                      <button
                        onClick={handleCopy}
                        className="absolute top-2 right-2 hidden group-hover:block bg-gray-700 text-white px-2 py-1 rounded text-xs hover:bg-gray-600"
                      >
                        {copied ? "Copied!" : <Copy size={16} />}
                      </button>

                      <SyntaxHighlighter
                        language={langMap[submission.language] || submission.language}
                        style={oneDark}
                        customStyle={{ margin: 0, padding: "1rem" }}
                      >
                        {submission.sourceCode}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center relative">
          <p className="text-2xl font-bold absolute mt-[50%]">
            No submission yet...
          </p>
        </div>
      )}
    </>
  );
};

export default Submissions;
