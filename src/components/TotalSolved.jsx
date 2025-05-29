import React, { useEffect } from "react";
import { useUserStore } from "../store/useUserStore";
import { useProblemStore } from "../store/useProblemStore";

const TotalSolved = () => {
  const { totalSolved, getTotal } = useUserStore();
  const {getAllProblems,problems} = useProblemStore();

  useEffect(() => {
    getTotal();
    if(problems.length <= 0){
      getAllProblems();
    }
  }, [getTotal]);
  return (
    <div>
      {totalSolved && (
        <div className="bg-[#2f3136] flex flex-col justify-center items-center p-4 gap-4 shadow-md">
          <div className="w-28 border rounded-full h-28 flex justify-center items-center">
            <span className="text-2xl font-bold p-2">
              <span className="text-[#2041dc]">{totalSolved.total}</span>/
              <span className="text-[#00ad5f]">{problems.length}</span>
            </span>
          </div>
          <div className="flex gap-5">
            <span className="bg-[#7eb99f] uppercase font-bold px-2 rounded-full py-1 text-green-900">
              easy : {totalSolved.easy}
            </span>
            <span className="bg-[#d5c28e] uppercase font-bold px-2 rounded-full py-1 text-yellow-800">
              medium : {totalSolved.medium}
            </span>
            <span className="bg-[#ce8d9a] uppercase font-bold px-2 rounded-full py-1 text-red-500">
              hard : {totalSolved.hard}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TotalSolved;
