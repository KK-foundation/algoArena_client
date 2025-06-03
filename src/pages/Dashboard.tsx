import Header from "@/components/Header";
import ProblemCard from "@/components/ProblemCard";
import XPProgressBar from "@/components/XPProgressBar";
import StatsCard from "@/components/StatsCard";
import FilterBar from "@/components/FilterBar";
import { Button } from "@/components/ui/button";
import { Zap, Target, Trophy, Users, TrendingUp } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProblemStore } from "@/store/useProblemStore";
import { useQueryStore } from "@/store/useQueryStore";
import { useAuthStore } from "@/store/useAuthStore";
import { levels } from "@/constents/achivements";
import { useContestStore } from "@/store/useContestStore";
import { toast } from "sonner";
import { usePotdStore } from "@/store/usePotdStore";

const Index = () => {
  const navigate = useNavigate();
  const { problems, isProblemsLoading,randomProblem,getRandomProblem } = useProblemStore();
  const { authUser } = useAuthStore();
  const { latestRating } = useContestStore();
  const {potd,getPotd} = usePotdStore();

  // const { query } = useQueryStore();

  const [nextLevelXp, setNextLevelXp] = useState(0);

  useEffect(() => {
    if (authUser?.level != null) {
      const levelData = levels.find((level) => level.level === Number(authUser.level) + 1);
      if (levelData) setNextLevelXp(levelData.requiredXP);
    }
    if(!randomProblem){
      getRandomProblem();
    }
    if(!potd){
      getPotd();
    }
    console.log(nextLevelXp);
  }, [authUser]);

  const handleRandomProblemClick = async () => {
    try {
      if(!randomProblem){
        await getRandomProblem();
        navigate(`/problem/${randomProblem.id}`);
      }
      else{
        navigate(`/problem/${randomProblem.id}`)
      }
    } catch (err) {
      console.error("Error fetching random problem:", err);
      alert("Something went wrong. Try again later.");
    }
  };

  const handleDailyChallengeClick = async () => {
    if(!potd){
      await getPotd();
      navigate(`/problem/${potd.problemId}`)
    }
    else{
      navigate(`/problem/${potd.problemId}`);
    }
  };

  const handleJoinContestClick = () => {
    navigate("/contests");
  };

  // const handleQuerySearch = () => {
   
  // };

  return (
    <div className="min-h-screen bg-craft-bg">
      <Header />

      <div className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Zap className="w-6 h-6 text-craft-accent animate-glow-pulse" />
            <h1 className="text-3xl font-bold text-craft-text-primary">
              Welcome back, {authUser?.name || "Coder"}!
            </h1>
          </div>
          <p className="text-craft-text-secondary text-lg">
            Continue your coding journey and level up your skills.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Problems Solved"
            value={authUser?.problemSolved || 0}
            subtitle="Great progress!"
            badge={`+${authUser?.submission?.length || 0}`}
            icon={<Target className="w-5 h-5" />}
            glowColor="craft-success"
          />
          <StatsCard
            title="Current Streak"
            value={authUser?.currentStreak || 0}
            subtitle="days in a row"
            badge="🔥"
            icon={<TrendingUp className="w-5 h-5" />}
            glowColor="craft-accent-secondary"
          />
          <StatsCard
            title="Contest Rating"
            value={latestRating || 0}
            subtitle="Latest Contest"
            badge="⭐"
            icon={<Trophy className="w-5 h-5" />}
            glowColor="craft-accent"
          />
        </div>

        {/* XP Progress */}
        <div className="bg-craft-panel border border-craft-border rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-craft-text-primary font-semibold text-lg">
                Level Progress
              </h3>
              <p className="text-craft-text-secondary">
                Keep coding to reach the next level!
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-craft-accent to-craft-accent-secondary rounded-full flex items-center justify-center">
              <span className="text-craft-bg font-bold">{authUser?.level || 0}</span>
            </div>
          </div>
          <XPProgressBar
            currentXP={Number(authUser?.xp) || 0}
            levelXP={nextLevelXp}
            level={Number(authUser?.level) || 0}
            animate={true}
          />
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button
            onClick={handleRandomProblemClick}
            className="bg-craft-accent hover:bg-craft-accent/80 text-craft-bg font-semibold"
          >
            <Zap className="w-4 h-4 mr-2" />
            Random Problem
          </Button>

          <Button
            onClick={handleDailyChallengeClick}
            className="bg-craft-accent hover:bg-craft-accent/80 text-craft-bg font-semibold"
          >
            <Target className="w-4 h-4 mr-2" />
            Daily Challenge
          </Button>

          <Button
            onClick={handleJoinContestClick}
            className="bg-craft-accent hover:bg-craft-accent/80 text-craft-bg font-semibold"
          >
            <Users className="w-4 h-4 mr-2" />
            Join Contest
          </Button>
        </div>

        {/* Filter Bar */}
        {/* <FilterBar /> */}

        {/* Problems List */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-craft-text-primary">Problems</h2>
            <span className="text-sm text-craft-text-secondary">
              {problems?.pagination?.message || ""}
            </span>
          </div>

          <div className="grid gap-4">
            {isProblemsLoading ? (
              <div className="flex items-center justify-center text-white">
                Loading...
              </div>
            ) : problems?.problems?.length > 0 ? (
              problems.problems.map((problem) => (
                <ProblemCard key={problem.id} problem={problem} />
              ))
            ) : (
              <div className="text-craft-text-secondary text-center">No problems found.</div>
            )}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Link to="/problems">
            <Button
              variant="outline"
              className="border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent"
            >
              Load More Problems
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
