import Header from "@/components/Header";
import ProblemCard from "@/components/ProblemCard";
import XPProgressBar from "@/components/XPProgressBar";
import StatsCard from "@/components/StatsCard";
import FilterBar from "@/components/FilterBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Target, Trophy, TrendingUp, Code, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useProblemStore } from "@/store/useProblemStore";
import { useState } from "react";
import { useQueryStore } from "@/store/useQueryStore";

const Index = () => {
  
  // const problems = [
  //   {
  //     id: 1,
  //     title: "Two Sum",
  //     difficulty: "Easy" as const,
  //     topics: ["Array", "Hash Table"],
  //     solved: true,
  //     acceptanceRate: 49.2,
  //   },
  //   {
  //     id: 2,
  //     title: "Add Two Numbers",
  //     difficulty: "Medium" as const,
  //     topics: ["Linked List", "Math", "Recursion"],
  //     solved: false,
  //     acceptanceRate: 37.8,
  //   },
  //   {
  //     id: 3,
  //     title: "Longest Substring Without Repeating Characters",
  //     difficulty: "Medium" as const,
  //     topics: ["Hash Table", "String", "Sliding Window"],
  //     solved: true,
  //     acceptanceRate: 33.1,
  //   },
  //   {
  //     id: 4,
  //     title: "Median of Two Sorted Arrays",
  //     difficulty: "Hard" as const,
  //     topics: ["Array", "Binary Search", "Divide and Conquer"],
  //     solved: false,
  //     acceptanceRate: 35.4,
  //   },
  // ];
  const {problems,isProblemsLoading} = useProblemStore();
  
  const getRandomProblemId = () => {
    return Math.floor(Math.random() * 1000) + 1;
  };

  return (
    <div className="min-h-screen bg-craft-bg">
      <Header />

      <div className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Zap className="w-6 h-6 text-craft-accent animate-glow-pulse" />
            <h1 className="text-3xl font-bold text-craft-text-primary">
              Welcome back, Coder!
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
            value="156"
            subtitle="12 this week"
            badge="+3"
            icon={<Target className="w-5 h-5" />}
            glowColor="craft-success"
          />
          <StatsCard
            title="Current Streak"
            value="7"
            subtitle="days in a row"
            badge="🔥"
            icon={<TrendingUp className="w-5 h-5" />}
            glowColor="craft-accent-secondary"
          />
          <StatsCard
            title="Contest Rating"
            value="1,847"
            subtitle="Guardian rank"
            badge="⭐"
            icon={<Trophy className="w-5 h-5" />}
            glowColor="craft-accent"
          />
          <StatsCard
            title="Code Reviews"
            value="23"
            subtitle="This month"
            badge="New"
            icon={<Code className="w-5 h-5" />}
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
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-gradient-to-br from-craft-accent to-craft-accent-secondary rounded-full flex items-center justify-center">
                <span className="text-craft-bg font-bold">12</span>
              </div>
            </div>
          </div>
          <XPProgressBar
            currentXP={247}
            levelXP={500}
            level={12}
            animate={true}
          />
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Link to={`/problem/${getRandomProblemId()}`}>
            <Button className="bg-craft-accent hover:bg-craft-accent/80 text-craft-bg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-craft-accent/25">
              <Zap className="w-4 h-4 mr-2" />
              Random Problem
            </Button>
          </Link>
          <Link to="/problem/1">
            <Button className="bg-craft-accent hover:bg-craft-accent/80 text-craft-bg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-craft-accent/25">
              <Target className="w-4 h-4 mr-2" />
              Daily Challenge
            </Button>
          </Link>
          <Link to="/contests">
            <Button className="bg-craft-accent hover:bg-craft-accent/80 text-craft-bg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-craft-accent/25">
              <Users className="w-4 h-4 mr-2" />
              Join Contest
            </Button>
          </Link>
        </div>

        {/* Filter Bar */}
        <FilterBar />

        {/* Problems List */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-craft-text-primary">
              Problems
            </h2>
            <div className="flex items-center space-x-2 text-sm text-craft-text-secondary">
              <span>{problems ? problems.pagination.message : ""}</span>
            </div>
          </div>

          <div className="grid gap-4">
            {/* {problems.map((problem) => (
              <ProblemCard key={problem.id} {...problem} />
            ))} */}
            {isProblemsLoading ? (
              <div className="flex items-center justify-center text-white">
                Loading...
              </div>
            ) : (
              problems?.problems?.map((problem) => (
                <ProblemCard key={problem.id} problem={problem} />
              ))
            )}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Link to="/problems">
            <Button
              variant="outline"
              className="border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent transition-all duration-200"
              
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
