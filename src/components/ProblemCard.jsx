import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const ProblemCard = ({ problem }) => {
  const { authUser } = useAuthStore();
  return (
    <Link to={`/problem/${problem?.problem?.id || problem?.id}`} className="w-full">
      <div className="flex justify-between bg-inherit px-4 py-2 rounded-lg">
        <div className="flex gap-2 w-[80%] ">
          {((problem?.solvedBy?.includes(authUser.id)) || (problem?.problem?.solvedBy?.includes(authUser.id))) && (
            <p className="font-semibold">✅</p>
          )}
          <p className="whitespace-nowrap overflow-hidden text-ellipsis w-full font-semibold">
            {problem.title || problem.problem.title}
          </p>
        </div>
        <span className="text-green-400 font-bold">{problem.difficulty || problem.problem.difficulty}</span>
      </div>
    </Link>
  );
};

export default ProblemCard;


