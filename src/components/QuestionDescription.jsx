import { useAuthStore } from "../store/useAuthStore";

const QuestionDescription = ({ problem }) => {
  const { authUser } = useAuthStore();
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          {problem?.solvedBy?.includes[authUser.id] && <span>✅</span>}
          {problem.title}
        </h1>
        <div>
          <span className="px-4 py-1 border rounded-full text-green-500 font-bold border-gray-500">
            {problem.difficulty}
          </span>
        </div>
      </div>
      <br />

      <div className="flex gap-4">
        {problem.tags.map((tag, index) => (
          <div key={index}>
            <span className="px-4 py-1 border rounded-full font-bold bg-[#212326] border-gray-500">
              {tag}
            </span>
          </div>
        ))}
      </div>
      <br />
      <div>
        <p>{problem.description}</p>
      </div>
      <br />
      <div className="flex flex-col gap-8">
        {Object.entries(problem.examples).map(([example, details], index) => (
          <div key={index}>
            <h3 className="font-bold mb-2 capitalize">
              {example} {index + 1} :
            </h3>
            <div className="bg-[#212326] px-2 py-4 rounded-md flex flex-col">
              <code>Input: {details.input}</code>
              <br />
              <code>Output: {details.output}</code>
              <br />
              <pre style={{ whiteSpace: "pre-wrap" }}>
                Explanation: {details.explanation}
              </pre>
            </div>
          </div>
        ))}
      </div>
      <br />
      <div>
        <h3 className="font-bold mb-2">Constraints :</h3>
        <pre className="px-4 py-1 w-fit rounded-lg bg-[#212326]">
          {problem.constraints}
        </pre>
      </div>
      <br />
      {problem.hints && (
        <div>
          <h3 className="font-bold mb-2">Hints :</h3>
          <pre className="px-4 py-1 w-fit rounded-lg bg-[#212326]">
            {problem.hints}
          </pre>
        </div>
      )}
    </div>
  );
};

export default QuestionDescription;
