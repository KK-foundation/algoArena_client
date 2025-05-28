import { useParams } from "react-router-dom";
import ProblemCard from "../components/ProblemCard";
import { Loader, Minus } from "lucide-react";
import { useEffect, useState } from "react";
import { useSheetStore } from "../store/useSheetStore";
import AddProblemForm from "../components/AddProblemForm";

const SheetDetail = () => {
  const { sheetId } = useParams();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const { currentSheet, isLoadingSheetById, getSheetById, removeProblem } =
    useSheetStore();
  const [removeSheetIds, setRemoveSheetIds] = useState([]);
  const handleClick = () => {};
  useEffect(() => {
    getSheetById(sheetId);
  }, [getSheetById, sheetId]);
  
  const handleCheckboxChange = (problemId) => {
    setRemoveSheetIds((prev) =>
      prev.includes(problemId)
        ? prev.filter((id) => id !== problemId)
        : [...prev, problemId]
    );
  };

  const handleRemove = async () => {
    console.log(removeSheetIds);
    const res = await removeProblem(sheetId, removeSheetIds);
    if (res.data.success) {
      getSheetById(sheetId);
    }
  };
  if (isLoadingSheetById && !currentSheet) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  return (
    <>
      {currentSheet && (
        <div className="w-[90%] lg:w-[80%] m-auto mt-4">
          <div>
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-bold">{currentSheet.name}</h1>
              <p>{currentSheet.description}</p>
              <div className="flex gap-4">
                <span className=" border px-4 py-1 rounded-2xl">
                  {currentSheet.problems.length} question
                </span>
              </div>
            </div>
            <br />
            <hr />
            <br />
            <div className="flex justify-between mb-4">
              <h1 className="text-2xl font-bold ">Problems</h1>
              <div className="flex gap-4">
                {removeSheetIds.length > 0 && (
                  <button
                    className="bg-red-500 text-black px-4 py-1 rounded-lg cursor-pointer"
                    onClick={() => {
                      handleRemove();
                    }}
                  >
                    Remove
                  </button>
                )}
                <button
                  className="bg-white text-black px-4 py-1 rounded-lg cursor-pointer"
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                >
                  Add new
                </button>
              </div>
            </div>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box max-w-full max-h-[90vh]">
                <form method="dialog">
                  <button
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={handleClick}
                  >
                    ✕
                  </button>
                </form>
                <AddProblemForm existingSheetProblems={currentSheet.problems} />
              </div>
            </dialog>
            <div className="flex flex-col gap-4">
              {currentSheet?.problems?.map((problem) => (
                <div
                  className="flex justify-between bg-[#303133] rounded-lg px-2 hover:bg-[#13181c]"
                  key={problem.id}
                >
                  {problem.problem.solvedBy.some(
                    (sub) => sub.userId === userInfo.id
                  ) && (
                    <div className="flex justify-center items-center">
                      <p className="text-green-500">✅</p>
                    </div>
                  )}
                  <>
                    {
                      <div className="w-full">
                        <ProblemCard problem={problem} />
                        {problem.tilte}
                      </div>
                    }
                  </>
                  <span className=" flex items-center justify-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="border w-5 h-5 rounded-full"
                      checked={removeSheetIds.includes(problem.problem.id)}
                      onChange={() => handleCheckboxChange(problem.problem.id)}
                    />
                  </span>
                </div>
              ))}
            </div>
            <br />
            <br />
          </div>
        </div>
      )}
    </>
  );
};

export default SheetDetail;
