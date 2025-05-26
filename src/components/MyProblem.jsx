import React from "react";
import ProblemCard from "./ProblemCard";
import CreateProblemForm from "./CreateProblemForm";

const MyProblem = () => {
  return (
    <div className="bg-[#2f3136] p-4">
      <div className="flex justify-between">
        <input
          type="text"
          placeholder="Enter title or number"
          className="w-[50%] flex px-2 py-1 bg-[#13181c] outline-none rounded-lg"
        />
        <button
          className="border px-4 py-1 rounded-lg bg-white text-black cursor-pointer"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          Create
        </button>
      </div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box max-w-full max-h-[90vh]">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <CreateProblemForm />
          <h1>Kunal Kumar</h1>
        </div>
      </dialog>
      <br />
      <div className="flex flex-col gap-4">
        {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(() => (
          <ProblemCard />
        ))}
      </div>
      <br />
      <div className="flex justify-between">
        <button className="border px-4 py-1 rounded-lg cursor-pointer">Prev</button>
        <button className="border px-4 py-1 rounded-lg cursor-pointer">Next</button>
      </div>
    </div>
  );
};

export default MyProblem;
