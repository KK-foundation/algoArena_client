import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Badge } from "@/components/ui/badge";

const mockActivities = [
  {
    id: 1,
    user: "Alex Chen",
    avatar: "🧑‍💻",
    challenge: "Two Sum",
    time: "1m 23s",
    status: "solved",
    difficulty: "Easy",
  },
  {
    id: 2,
    user: "Sarah Kumar",
    avatar: "👩‍💻",
    challenge: "Binary Tree Inorder",
    time: "8m 45s",
    status: "solved",
    difficulty: "Medium",
  },
  {
    id: 3,
    user: "Mike Rodriguez",
    avatar: "👨‍💻",
    challenge: "Merge K Lists",
    time: "ongoing",
    status: "attempting",
    difficulty: "Hard",
  },
  {
    id: 4,
    user: "Emma Thompson",
    avatar: "👩‍💻",
    challenge: "Valid Parentheses",
    time: "2m 56s",
    status: "solved",
    difficulty: "Easy",
  },
  {
    id: 5,
    user: "David Park",
    avatar: "🧑‍💻",
    challenge: "Longest Substring",
    time: "12m 34s",
    status: "solved",
    difficulty: "Medium",
  },
];

const LiveFeed = () => {
  const [activities, setActivities] = useState(mockActivities);
  const [newActivity, setNewActivity] = useState<
    (typeof mockActivities)[0] | null
  >(null);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new activity
      const randomActivity = {
        id: Date.now(),
        user: ["Jordan Lee", "Taylor Swift", "Chris Wilson", "Luna Zhang"][
          Math.floor(Math.random() * 4)
        ],
        avatar: ["🧑‍💻", "👩‍💻", "👨‍💻"][Math.floor(Math.random() * 3)],
        challenge: [
          "Maximum Subarray",
          "Reverse Linked List",
          "Climbing Stairs",
          "House Robber",
        ][Math.floor(Math.random() * 4)],
        time: `${Math.floor(Math.random() * 15) + 1}m ${Math.floor(
          Math.random() * 60
        )}s`,
        status: Math.random() > 0.3 ? "solved" : "attempting",
        difficulty: ["Easy", "Medium", "Hard"][Math.floor(Math.random() * 3)],
      };

      setNewActivity(randomActivity);

      setTimeout(() => {
        setActivities((prev) => [randomActivity, ...prev.slice(0, 4)]);
        setNewActivity(null);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    return status === "solved" ? "🟢" : "🟡";
  };

  const getDifficultyClass = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "difficulty-easy";
      case "medium":
        return "difficulty-medium";
      case "hard":
        return "difficulty-hard";
      default:
        return "difficulty-easy";
    }
  };

  return (
    <div className="glass-card p-6 rounded-xl h-96 overflow-hidden text-white">
      <div className="space-y-4 h-full overflow-y-auto scrollbar-hide">
        <AnimatePresence>
          {newActivity && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="p-3 rounded-lg bg-neon-green/10 border border-neon-green/30"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{newActivity.avatar}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">
                      {newActivity.user}
                    </span>
                    <Badge
                      variant="neon"
                      className={`${getDifficultyClass(
                        newActivity.difficulty
                      )} text-xs`}
                    >
                      {newActivity.difficulty}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {getStatusIcon(newActivity.status)}{" "}
                    {newActivity.status === "solved" ? "solved" : "attempting"}{" "}
                    "{newActivity.challenge}"
                    {newActivity.status === "solved" &&
                      ` in ${newActivity.time}`}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center gap-3 p-3 rounded-lg transition-colors"
          >
            <span className="text-xl">{activity.avatar}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm">{activity.user}</span>
                <Badge
                  variant="neon"
                  className={`${getDifficultyClass(
                    activity.difficulty
                  )} text-xs`}
                >
                  {activity.difficulty}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {getStatusIcon(activity.status)}{" "}
                {activity.status === "solved" ? "solved" : "attempting"} "
                {activity.challenge}"
                {activity.status === "solved" && ` in ${activity.time}`}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LiveFeed;
