import ProblemCard from "../components/ProblemCard";
import { Minus } from "lucide-react";

const SheetDetail = () => {
  return (
    <div className="w-[90%] lg:w-[80%] m-auto mt-4">
      <div>
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Top 200 interview questions</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            placeat, porro quibusdam laudantium dolorem neque quisquam illo cum
            harum corrupti minima, ipsam recusandae ipsum consectetur molestias
            doloribus iusto, explicabo in?
          </p>
          <div className="flex gap-4">
            <span className=" border px-4 py-1 rounded-2xl">250 question</span>
            <span className=" border px-4 py-1 rounded-2xl">google</span>
            <span className=" border px-4 py-1 rounded-2xl">amazon</span>
          </div>
        </div>
        <br />
        <hr />
        <br />
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold ">Problems</h1>
          <button className="bg-white text-black px-4 py-1 rounded-lg cursor-pointer">
            Add new
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {[0, 0, 0, 0, 0, 0, 0].map(() => (
            <div className="flex justify-between bg-[#303133] rounded-lg px-2 hover:bg-[#13181c]">
              <div className="w-[80%]">
                <ProblemCard />
              </div>
              <span className=" flex items-center justify-center cursor-pointer">
                <Minus className="border w-5 h-5 rounded-full" />
              </span>
            </div>
          ))}
        </div>
        <br />
        <br />
      </div>
    </div>
  );
};

export default SheetDetail;
