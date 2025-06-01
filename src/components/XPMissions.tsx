import React, { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle, Circle, Award } from "lucide-react";

const missions = [
  { id: 1, title: "Solve 2 Easy", reward: 50, completed: true, type: "daily" },
  {
    id: 2,
    title: "Complete 1 Medium",
    reward: 100,
    completed: false,
    type: "daily",
  },
  {
    id: 3,
    title: "Review 1 Solution",
    reward: 25,
    completed: false,
    type: "daily",
  },
  {
    id: 4,
    title: "Solve in < 30 min",
    reward: 75,
    completed: false,
    type: "bonus",
  },
  {
    id: 5,
    title: "First Try Success",
    reward: 150,
    completed: false,
    type: "bonus",
  },
];

const XPMissions = () => {
  const [completedMissions, setCompletedMissions] = useState(
    missions.filter((m) => m.completed).map((m) => m.id)
  );

  const handleClaimXP = (missionId: number) => {
    if (!completedMissions.includes(missionId)) {
      setCompletedMissions([...completedMissions, missionId]);
    }
  };

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-4 min-w-max">
        {missions.map((mission, index) => (
          <motion.div
            key={mission.id}
            className={`glass-card rounded-lg p-4 min-w-[200px] border transition-all duration-300 ${
              completedMissions.includes(mission.id)
                ? "border-neon-green/50 bg-neon-green/10"
                : "border-border hover:border-neon-green/30"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {completedMissions.includes(mission.id) ? (
                  <CheckCircle className="w-5 h-5 text-neon-green" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground" />
                )}
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    mission.type === "bonus"
                      ? "bg-purple-500/20 text-purple-400"
                      : "bg-neon-green/20 text-neon-green"
                  }`}
                >
                  {mission.type === "bonus" ? "BONUS" : "DAILY"}
                </span>
              </div>
            </div>

            <h3 className="font-semibold text-foreground mb-2">
              {mission.title}
            </h3>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 font-semibold">
                  +{mission.reward} XP
                </span>
              </div>

              {completedMissions.includes(mission.id) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-xs text-neon-green font-semibold"
                >
                  CLAIMED
                </motion.div>
              )}
            </div>

            {!completedMissions.includes(mission.id) && mission.completed && (
              <motion.button
                onClick={() => handleClaimXP(mission.id)}
                className="w-full mt-3 bg-neon-gradient text-black px-4 py-2 rounded font-semibold hover:shadow-neon transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Claim XP
              </motion.button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default XPMissions;
