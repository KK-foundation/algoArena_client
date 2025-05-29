import React, { useEffect } from "react";
import ProblemCard from "./ProblemCard";
import { useProblemStore } from "../store/useProblemStore";

const SolvedProblem = () => {
  const { solvedProblems, getSolvedProblemByUser } = useProblemStore();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    getSolvedProblemByUser();
  }, [getSolvedProblemByUser]);

  return (
    <>
      {solvedProblems.length > 0 && (
        <div className="bg-[#2f3136] p-4">
         <div>
          <h1 className="text-2xl font-bold mb-2">Solved Problems</h1>
          <hr />
         </div>
          <br />
          <div className="flex flex-col gap-4">
            {solvedProblems.map((problem, index) => (
              <div key={index} className="hover:bg-[#13181c] rounded-lg shadow-xl flex px-2">
                {problem.solvedBy.some(
                  (sub) => sub.userId === userInfo.id
                ) && (
                  <div className="flex justify-center items-center">
                    <p className="text-green-500">✅</p>
                  </div>
                )}
                <ProblemCard problem={problem} />
              </div>
            ))}
          </div>
          <br />
  
        </div>
      )}
    </>
  );
};

export default SolvedProblem;
