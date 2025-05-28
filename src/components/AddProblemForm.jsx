import React, { useEffect, useState } from "react";
import { useProblemStore } from "../store/useProblemStore";
import { Loader } from "lucide-react";
import ProblemCard from "./ProblemCard";
import { useParams } from "react-router-dom";
import { useSheetStore } from "../store/useSheetStore";

const AddProblemForm = ({ existingSheetProblems}) => {
  const { isProblemsLoading, getAllProblems, problems } = useProblemStore();
  
  
  const { insertProblems,getSheetById } = useSheetStore();
  const { sheetId } = useParams();

  const [sheetProblems, setSheetProblems] = useState([]);

  const handleCheckboxChange = (problemId) => {
    setSheetProblems((prev) =>
      prev.includes(problemId)
        ? prev.filter((id) => id !== problemId)
        : [...prev, problemId]
    );
  };
  const handleSubmit = async () => {
    const res = await insertProblems(sheetId, sheetProblems);
    if(res.data.success){
      getSheetById(sheetId);
    }
  };
  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);
  return (
    <div>
      <h1 className="text-2xl font-bold">Problems</h1>
      <hr className="mt-3" />
      {isProblemsLoading ? (
        <Loader className="animate-spin" />
      ) : (
        <div className="flex flex-col gap-4 mt-4">
          {problems &&
            problems
              .filter(
                (problem) =>
                  !existingSheetProblems.some(
                    (p) => p.problem.id === problem.id
                  )
              )
              .map((problem) => (
                <div key={problem.id} className="flex gap-4 w-full">
                  <input
                    type="checkbox"
                    checked={sheetProblems.includes(problem.id)}
                    className="w-6"
                    onChange={() => handleCheckboxChange(problem.id)}
                  />
                  <div className="w-full">
                    <ProblemCard problem={problem} />
                  </div>
                </div>
              ))}
          <div className="w-full">
            <button
              className="border bg-white text-black py-1 rounded-lg w-full cursor-pointer"
              onClick={() => handleSubmit()}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProblemForm;
