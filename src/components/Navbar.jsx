import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { authUser } = useAuthStore();
  return (
    <nav className="w-full flex justify-between px-12 py-4 items-center bg-[#2f3136]">
      <Link to={"/"}>
        <div className="flex justify-center items-center gap-2">
          <img src="/logo.png" alt="logo" className="w-10 cursor-pointer" />
          <span className="uppercase font-bold">Algo Arena</span>
        </div>
      </Link>
      <div></div>
      <div>
        {authUser ? (
          <img
            src={authUser.image ? authUser.image : "/user.png"}
            alt="user"
            className="w-10 bg-white rounded-full object-contain"
          />
        ) : (
          <Link to="/login">
            <button className="px-4 py-2 border rounded-2xl cursor-pointer font-semibold hover:text-white">
              Sign in
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
