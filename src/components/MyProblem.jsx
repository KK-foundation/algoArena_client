import { useEffect } from "react";
import ProblemCard from "./ProblemCard";
import CreateProblemForm from "./CreateProblemForm";
import { useProblemStore } from "../store/useProblemStore";


const MyProblem = () => {
  const { getAllProblemCreatedByUser, createdByUserProblems } =
    useProblemStore();

  useEffect(() => {
    getAllProblemCreatedByUser();
  }, [getAllProblemCreatedByUser]);
  return (
    <div className="bg-[#2f3136] p-4">
      <div className="flex justify-end">
        <button
          className="border px-4 py-1 rounded-lg bg-white text-black cursor-pointer"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          Create
        </button>
      
      </div>
      <hr className="mt-2"/>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box max-w-full max-h-[90vh]">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <CreateProblemForm />
        </div>
      </dialog>
      <br />
      {createdByUserProblems.length > 0 && (
        <>
          <div className="flex flex-col gap-4">
            {createdByUserProblems.map((problem, index) => (
              <div key={index} className="hover:bg-[#13181c] rounded-lg shadow-xl">
                <ProblemCard problem={problem} />
              </div>
            ))}
          </div>
          <br />
        </>
      )}
    </div>
  );
};

export default MyProblem;

{
  /* <div className="w-full flex justify-center items-center mt-3">
  <span className="font-bold cursor-pointer hover:underline">see more</span>
</div>; */
}

{/* <div className="flex justify-between">
  <button className="border px-4 py-1 rounded-lg cursor-pointer">Prev</button>
  <button className="border px-4 py-1 rounded-lg cursor-pointer">Next</button>
</div>; */}
