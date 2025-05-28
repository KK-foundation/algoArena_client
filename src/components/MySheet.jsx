import React, { useEffect, useState } from "react";
import SheetCard from "./SheetCard";
import CreateSheetForm from "./CreateSheetForm";
import { useSheetStore } from "../store/useSheetStore";

const MySheet = () => {
  const { getSheetCreatedByUser, sheetCreatedByUser } = useSheetStore();
  const [newSheetAdd, setNewSheetAdd] = useState(false);
  useEffect(() => {
    getSheetCreatedByUser();
  }, [getSheetCreatedByUser, newSheetAdd]);
  return (
    <div className="bg-[#2f3136] p-4">
      <div className="flex flex-col justify-between bg-[#2f3136]">
        <div className="flex justify-between w-full">
          <input
            type="text"
            placeholder="Enter title or number"
            className="w-[50%] flex px-2 py-1 bg-[#13181c] outline-none rounded-lg"
          />
          <button
            className="border px-4 py-1 rounded-lg bg-white text-black cursor-pointer"
            onClick={() => document.getElementById("my_modal_4").showModal()}
          >
            Create
          </button>
        </div>
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box max-w-full max-h-[90vh]">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <CreateSheetForm setNewSheetAdd={setNewSheetAdd} />
          </div>
        </dialog>
        <br />
        {sheetCreatedByUser.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sheetCreatedByUser.map((sheet, index) => (
                <div key={index}>
                  <SheetCard sheet={sheet} />
                </div>
              ))}
            </div>
            <br />
            <div className="flex justify-between">
              <button className="border px-4 py-1 rounded-lg">Prev</button>
              <button className="border px-4 py-1 rounded-lg">Next</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MySheet;
