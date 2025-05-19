import Card from "../components/Card";
import list from "../assets/features/list.png";
import progressBar from "../assets/features/progress_bar.png";
import streak from "../assets/features/streak.png";
import Playground from "../components/Playground";
const HomePage = () => {
  return (
    <div className="w-[90%] lg:w-[80%] m-auto">
      {/* Hero section  */}
      <section className="flex flex-col justify-center items-center h-[70vh]">
        <h1 className="text-3xl font-bold tracking-tighter">
          Enter the Arena. Conquer the code
        </h1>
        <p className="text-center mt-4 leading-7 tracking-widest">
          AlgoArena is the best platform to help you enhance your skills, expand
          your knowledge and prepare for technical interviews.
        </p>
        <button className="border px-4 py-2 rounded-lg bg-white text-black mt-4">
          Create account
        </button>
      </section>
      {/* features  */}
      <section className="mb-20">
        <div className="flex flex-col justify-center items-center h-[150px]">
          <h3 className="text-2xl font-bold tracking-tighter">
            More then just solve problem
          </h3>
          <p className="tracking-widest">Explore what else we can do for you</p>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <Card
            icon={list}
            heading="Create your own list of question"
            description="Here you can create your own list of question that mostly asked in company and make the list public people will and appreciate your work"
          />
          <Card
            icon={progressBar}
            heading="Track your progress"
            description="We have your daily contribution data on how much question you solve how many days you expand here in a year in a month and you can shear your profile"
          />
          <Card
            icon={streak}
            heading="Make Streak"
            description="Here you can check your consistency of your effort and this will appreciate your to consistence people have very good consistency make new record"
          />
        </div>
      </section>
      <section className="mb-8">
        <div className="flex flex-col justify-center items-center h-[150px]">
          <h3 className="text-2xl font-bold tracking-tighter">Playground</h3>
          <p className="tracking-widest">
            We only support 4 languages but most liked one
          </p>
        </div>
        <Playground />
      </section>
    </div>
  );
};

export default HomePage;
