import React, { useEffect } from "react";
import SheetCard from "../components/SheetCard";
import { useSheetStore } from "../store/useSheetStore";
import { Loader } from "lucide-react";

const Sheets = () => {
  const { sheets, getAllSheets, isLoading } = useSheetStore();

  useEffect(() => {
    getAllSheets();
  }, [getAllSheets]);

  if (isLoading && !sheets) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  return (
    <div className="w-[90%] lg:w-[80%] m-auto mt-4">
      <div>
        <h1 className="text-2xl font-bold">All Sheets</h1>
        <hr />
        <br />
        <div>
          <br />
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            {sheets.map((sheet) => (
              <div key={sheet.id}>
                <SheetCard sheet={sheet} />
              </div>
            ))}
          </div>

          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default Sheets;

//  <div className="flex justify-end">
//             <input
//               type="text"
//               placeholder="Enter title or number"
//               className="w-[60%] flex px-4 py-2 bg-[#13181c] outline-none rounded-lg shadow-lg border"
//             />
//           </div>

//  <div className="w-full flex justify-center items-center mt-3">
//             <span className="font-bold cursor-pointer hover:underline">
//               see more
//             </span>
//           </div>
