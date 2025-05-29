import React, { useEffect, useState } from "react";
import SheetCard from "./SheetCard";
import CreateSheetForm from "./CreateSheetForm";
import { useSheetStore } from "../store/useSheetStore";
import { Trash } from "lucide-react";

const MySheet = () => {
  const { getSheetCreatedByUser, sheetCreatedByUser, deleteSheet } =
    useSheetStore();
  const [newSheetAdd, setNewSheetAdd] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [show, setShow] = useState(false);

  const handleHover = () => {
    setShow(true);
  };
  const handleDeleteSheet = async (e, sheetId) => {
    e.stopPropagation();
    const res = await deleteSheet(sheetId);
    if (res.data.success) {
      getSheetCreatedByUser();
    }
  };
  const handleRemoveHover = () => {
    setShow(false);
  };

  useEffect(() => {
    getSheetCreatedByUser();
  }, [newSheetAdd]);
  return (
    <div className="bg-[#2f3136] p-4">
      <div className="flex flex-col justify-between bg-[#2f3136]">
        <div className="flex justify-end w-full">
          <button
            className="border px-4 py-1 rounded-lg bg-white text-black cursor-pointer"
            onClick={() => document.getElementById("my_modal_4").showModal()}
          >
            Create
          </button>
        </div>
        <hr className="mt-2" />
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
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={handleHover}
                  onMouseLeave={handleRemoveHover}
                >
                  <SheetCard sheet={sheet} />
                  {show && sheet.userId === userInfo.id && (
                    <span
                      className="text-red-500 absolute right-4 top-2 cursor-pointer"
                      onClick={(e) => handleDeleteSheet(e, sheet.id)}
                    >
                      <Trash />
                    </span>
                  )}
                </div>
              ))}
            </div>
            <br />
          </>
        )}
      </div>
    </div>
  );
};

export default MySheet;

{
  /* <div className="flex justify-between">
  <button className="border px-4 py-1 rounded-lg">Prev</button>
  <button className="border px-4 py-1 rounded-lg">Next</button>
</div>; */
}

{/* <input
  type="text"
  placeholder="Enter title or number"
  className="w-[50%] flex px-2 py-1 bg-[#13181c] outline-none rounded-lg"
/>; */}
