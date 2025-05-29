import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { authUser,logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
  }
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
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="cursor-pointer">
              <img
                src={authUser.image ? authUser.image : "/user.png"}
                alt="user"
                className="w-10 h-10 bg-white rounded-full object-cover"
              />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li className="font-bold text-lg hover:underline">
                <Link to={`/profile/${authUser.username}`}>Profile</Link>
              </li>
              <hr />
              <li className="font-bold text-lg hover:underline">
                <Link to={'/problems'}>Problems</Link>
              </li>
              <hr />
              <li className="font-bold text-lg hover:underline">
                <Link to={'/sheets'}>Sheets</Link>
              </li>
              <hr />
              <li className="font-bold text-lg hover:underline">
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
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
