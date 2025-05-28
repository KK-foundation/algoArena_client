import { Trash } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSheetStore } from "../store/useSheetStore";

const SheetCard = ({ sheet }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [show, setShow] = useState(false);
  const { getSheetCreatedByUser, deleteSheet } = useSheetStore();
  const handleHover = () => {
    setShow(true);
  };
  const handleDeleteSheet = async (e) => {
    e.stopPropagation();
    const res = await deleteSheet(sheet.id);
    if (res.data.success) {
      getSheetCreatedByUser();
    }
  };
  const handleRemoveHover = () => {
    setShow(false);
  };
  return (
    <div
      className="hover:bg-[#13181c] relative rounded-lg"
      onMouseEnter={handleHover}
      onMouseLeave={handleRemoveHover}
    >
      {show && sheet.userId === userInfo.id && (
        <span
          className="text-red-500 absolute right-4 top-2 cursor-pointer"
          onClick={(e) => handleDeleteSheet(e)}
        >
          <Trash />
        </span>
      )}
      <Link to={`/sheet/${sheet.id}`}>
        <div className="flex flex-col gap-3  p-4  rounded-lg bg-[#303133] shadow-lg cursor-pointer hover:bg-[#13181c]">
          <h2 className="font-bold text-2xl">{sheet.name}</h2>
          <span className="bg-[#13181c] w-fit px-4 py-1 rounded-lg capitalize">
            {sheet.visibility}
          </span>
          <p className="text-sm tracking-wide line-clamp-3 overflow-hidden text-ellipsis w-full font-semibold">
            {sheet.description}
          </p>
          <span className="font-bold">Total : {sheet?.problems.length}</span>
        </div>
      </Link>
    </div>
  );
};

export default SheetCard;
