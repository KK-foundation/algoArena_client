import React, { useState } from "react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const leaderboardData = {
  daily: [
    { rank: 1, name: "Alex Chen", avatar: "🧑‍💻", xp: 2840, badges: 12 },
    { rank: 2, name: "Sarah Kumar", avatar: "👩‍💻", xp: 2750, badges: 11 },
    { rank: 3, name: "Mike Rodriguez", avatar: "👨‍💻", xp: 2680, badges: 10 },
    { rank: 4, name: "Emma Thompson", avatar: "👩‍💻", xp: 2590, badges: 9 },
    { rank: 5, name: "David Park", avatar: "🧑‍💻", xp: 2520, badges: 8 },
  ],
  weekly: [
    { rank: 1, name: "Jordan Lee", avatar: "🧑‍💻", xp: 15840, badges: 45 },
    { rank: 2, name: "Taylor Swift", avatar: "👩‍💻", xp: 14750, badges: 42 },
    { rank: 3, name: "Chris Wilson", avatar: "👨‍💻", xp: 13680, badges: 38 },
    { rank: 4, name: "Luna Zhang", avatar: "👩‍💻", xp: 12590, badges: 35 },
    { rank: 5, name: "Sam Johnson", avatar: "🧑‍💻", xp: 11520, badges: 32 },
  ],
  allTime: [
    { rank: 1, name: "Code Master", avatar: "👑", xp: 98450, badges: 156 },
    { rank: 2, name: "Algorithm Queen", avatar: "👸", xp: 87320, badges: 142 },
    { rank: 3, name: "Binary Beast", avatar: "🦄", xp: 76890, badges: 128 },
    { rank: 4, name: "Logic Lord", avatar: "🧙‍♂️", xp: 65430, badges: 115 },
    { rank: 5, name: "Data Diva", avatar: "💫", xp: 54320, badges: 98 },
  ],
};

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState<"daily" | "weekly" | "allTime">(
    "daily"
  );

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return "👑";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return `#${rank}`;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-yellow-400";
      case 2:
        return "text-gray-300";
      case 3:
        return "text-amber-600";
      default:
        return "text-muted-foreground";
    }
  };

  const tabs = [
    { key: "daily", label: "Daily" },
    { key: "weekly", label: "Weekly" },
    { key: "allTime", label: "All Time" },
  ];

  return (
    <div className="glass-card p-6 rounded-xl">
      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-secondary p-1 rounded-lg">
        {tabs.map((tab) => (
          <Button
            key={tab.key}
            variant={activeTab === tab.key ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`flex-1 ${
              activeTab === tab.key
                ? "bg-neon-green text-black font-semibold"
                : "text-muted-foreground"
            }`}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Leaderboard List */}
      <div className="space-y-3">
        {leaderboardData[activeTab].map((user, index) => (
          <motion.div
            key={`${activeTab}-${user.rank}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-300 text-white ${
              user.rank <= 3
                ? "bg-gradient-to-r from-neon-green/5 to-transparent border border-neon-green/20"
                : ""
            }`}
          >
            {/* Rank */}
            <div
              className={`text-lg font-bold w-8 text-center ${getRankColor(
                user.rank
              )}`}
            >
              {user.rank <= 3 ? getRankIcon(user.rank) : user.rank}
            </div>

            {/* Avatar & Name */}
            <div className="flex items-center gap-3 flex-1">
              <span className="text-2xl">{user.avatar}</span>
              <div>
                <div className="font-medium text-sm">{user.name}</div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="border-neon-green/30 text-neon-green text-xs"
                  >
                    🏆 {user.badges}
                  </Badge>
                </div>
              </div>
            </div>

            {/* XP */}
            <div className="text-right">
              <div className="font-bold text-neon-green font-orbitron">
                {user.xp.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">XP</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View Profile Button */}
      <motion.div
        className="mt-6 pt-4 border-t border-border"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          variant="outline"
          className="w-full border-neon-green/30 hover:border-neon-green hover:shadow-neon"
        >
          View Full Rankings
        </Button>
      </motion.div>
    </div>
  );
};

export default Leaderboard;
