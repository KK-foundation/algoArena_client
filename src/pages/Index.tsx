import React, { useState } from "react";
import { motion } from "motion/react";
import HeroBanner from "../components/HeroBanner";
import SearchAndFilters from "../components/SearchAndFilters";
import FeaturedChallenge from "../components/FeaturedChallenge";
import XPMissions from "../components/XPMissions";
import TopicGrid from "../components/TopicGrid";
import TagExplorer from "../components/TagExplorer";
import TrendingCarousel from "../components/TrendingCarousel";
import CompanyZone from "../components/CompanyZone";
import WeeklyPick from "../components/WeeklyPick";
import LiveFeed from "../components/LiveFeed";
import Leaderboard from "../components/Leaderboard";
import CodePreviewPanel from "../components/CodePreviewPanel";
import FloatingChallengeCard from "../components/FloatingChallengeCard";
import AnimatedTabs from "../components/AnimatedTabs";
import CodeRainBackground from "../components/CodeRainBackground";

const Index = () => {
  const [isCodePanelOpen, setIsCodePanelOpen] = useState(false);

  // Sample challenges data
  const sampleChallenges = [
    {
      id: "1",
      title: "Two Sum",
      difficulty: "easy" as const,
      xp: 50,
      timeEstimate: "15 min",
      solvedBy: 15420,
      tags: ["array", "hash-table"],
    },
    {
      id: "2",
      title: "Merge Intervals",
      difficulty: "medium" as const,
      xp: 120,
      timeEstimate: "30 min",
      solvedBy: 8340,
      tags: ["array", "sorting"],
    },
    {
      id: "3",
      title: "Word Ladder",
      difficulty: "hard" as const,
      xp: 200,
      timeEstimate: "45 min",
      solvedBy: 3210,
      tags: ["bfs", "string"],
    },
  ];

  const tabsData = [
    {
      id: "trending",
      label: "🔥 Trending",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleChallenges.map((challenge) => (
            <FloatingChallengeCard
              key={challenge.id}
              challenge={challenge}
              onPreview={() => setIsCodePanelOpen(true)}
            />
          ))}
        </div>
      ),
    },
    {
      id: "daily",
      label: "📅 Daily",
      content: <XPMissions />,
    },
    {
      id: "sheets",
      label: "📋 Problem Sheets",
      content: <CompanyZone />,
    },
  ];

  return (
    <>
      <CodeRainBackground />

      <motion.div
        className="min-h-screen bg-[#0D0D0D] relative z-10 hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section with enhanced animations */}
        <motion.section
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <HeroBanner />
        </motion.section>

        {/* Main Content */}
        <div className="container mx-auto px-4 space-y-12 pb-16">
          {/* Search & Filters */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SearchAndFilters />
          </motion.section>

          {/* Featured Challenge */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <FeaturedChallenge />
          </motion.section>

          {/* Animated Tabs Section */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-orbitron font-bold mb-8 text-center">
              <span className="hero-text">Explore Challenges</span>
            </h2>
            <AnimatedTabs tabs={tabsData} defaultTab="trending" />
          </motion.section>

          {/* Topics to Explore */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-3xl font-orbitron font-bold mb-8 text-center">
              <span className="hero-text">Topics to Explore</span>
            </h2>
            <TopicGrid />
          </motion.section>

          {/* Explore by Tags */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="text-2xl font-orbitron font-bold mb-6">
              <span className="hero-text">Explore by Tags</span>
            </h2>
            <TagExplorer />
          </motion.section>

          {/* Trending Challenges */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl font-orbitron font-bold mb-8 text-center">
              <span className="hero-text">Trending Challenges</span>
            </h2>
            <TrendingCarousel />
          </motion.section>

          {/* Weekly Pick */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <WeeklyPick />
          </motion.section>

          {/* Live Feed & Leaderboard */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.section
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h2 className="text-2xl font-orbitron font-bold mb-6">
                <span className="hero-text">Live Solving</span>
              </h2>
              <LiveFeed />
            </motion.section>

            <motion.section
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h2 className="text-2xl font-orbitron font-bold mb-6">
                <span className="hero-text">Leaderboard</span>
              </h2>
              <Leaderboard />
            </motion.section>
          </div>
        </div>

        {/* VS Code-like Code Preview Panel */}
        <CodePreviewPanel
          isOpen={isCodePanelOpen}
          onClose={() => setIsCodePanelOpen(false)}
        />
      </motion.div>
    </>
  );
};

export default Index;
