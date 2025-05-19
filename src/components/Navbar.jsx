
const Navbar = () => {
  return (
    <nav className="w-full flex justify-between px-12 py-4 items-center bg-[#2f3136]">
      <div className="flex justify-center items-center gap-2">
        <img src="/logo.png" alt="logo" className="w-10 cursor-pointer" />
        <span className="uppercase font-bold">Algo Arena</span>
      </div>
      <div></div>
      <div>
        <button className="px-4 py-2 border rounded-2xl cursor-pointer font-semibold hover:text-white">
          Sign in
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
