import React, { useEffect, useState } from "react";
import SheetCard from "../components/SheetCard";
import ProblemCard from "../components/ProblemCard";
import { useProblemStore } from "../store/useProblemStore";
import { Loader } from "lucide-react";
import { useSheetStore } from "../store/useSheetStore";
import { Link } from "react-router-dom";

const Problems = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const { isProblemsLoading, getAllProblems, problems } = useProblemStore();
  const { isLoading, getTopThreeSheets } = useSheetStore();
  const [sheet, setSheet] = useState([]);

  useEffect(() => {
    getAllProblems();
    const res = getTopThreeSheets();
    res.then((res) => {
      if (res.message) {
        setSheet(res.data);
      }
    });
  }, [getAllProblems, getTopThreeSheets]);

  if (isProblemsLoading || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  console.log(sheet);
  return (
    <div className="w-[90%] lg:w-[80%] m-auto mt-4">
      <h3 className="text-2xl font-bold">Sheets</h3>
      <hr />
      {/* Playlist */}
      <br />
      {sheet.length > 0 ? (
        <div className="flex flex-col gap-4">
          {sheet.length > 0 && <div className="hover:bg-[#13181c] rounded-lg"><SheetCard sheet={sheet[0]} /></div>}
          <div className="grid lg:grid-cols-2 gap-4">
            {sheet.length === 3 && (
              <div>
                <SheetCard sheet={sheet[1]} />
                <SheetCard sheet={sheet[2]} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <p className="text-2xl font-bold tracking-widest mt-10">
            Sheet not found...
          </p>
        </div>
      )}
      <br />
      <br />
      {/* Problems */}
      <h3 className="text-2xl font-bold mb-2">Problems</h3>
      <hr />
      {problems.length > 0 ? (
        <div>
          <br />
          <div className="flex flex-col gap-4">
            {problems.map((problem, index) => (
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
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <p className="text-2xl font-bold tracking-widest mt-10">
            Problem not found...
          </p>
        </div>
      )}
      <br />
      <br />
      <br />
    </div>
  );
};

export default Problems;

{
  /* {sheet.length > 0 && (
        <div className="flex justify-end">
          <p className="hover:underline cursor-pointer">See all</p>
        </div>
      )} */
}

{
  /* <div>
            <div className="flex justify-end">
              <input
                type="text"
                placeholder="Enter title or number"
                className="w-[60%] flex px-4 py-2 bg-[#13181c] outline-none rounded-lg shadow-lg border"
              />
            </div>
          </div> */
}
{
  /* {problems.length > 10 && (
            <div className="w-full flex justify-center items-center">
              <span className="font-bold cursor-pointer hover:underline">
                see more
              </span>
            </div>
          )} */
}
