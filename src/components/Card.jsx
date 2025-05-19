const Card = ({ icon, heading, description }) => {
  return (
    <div className="border rounded-lg p-4 flex flex-col justify-center items-center bg-[#2f3136]">
      <div className="border rounded-full p-2">
        <img src={icon} alt="icon" className="w-10" />
      </div>
      <h4 className="text-2xl font-semibold tracking-tighter mt-3">
        {heading}
      </h4>
      <p className="tracking-wider text-center mt-2">{description}</p>
    </div>
  );
};

export default Card;
