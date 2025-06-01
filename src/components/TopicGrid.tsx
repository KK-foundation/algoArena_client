import React from "react";
import { motion } from "motion/react";

const topics = [
  { name: "Arrays", icon: "🔢", count: 342, progress: 65 },
  { name: "Strings", icon: "📝", count: 256, progress: 45 },
  { name: "Trees", icon: "🌳", count: 189, progress: 78 },
  { name: "Graphs", icon: "🕸️", count: 167, progress: 32 },
  { name: "Dynamic Programming", icon: "⚡", count: 145, progress: 23 },
  { name: "Sorting", icon: "📊", count: 134, progress: 89 },
  { name: "Searching", icon: "🔍", count: 123, progress: 67 },
  { name: "Linked Lists", icon: "🔗", count: 98, progress: 54 },
  { name: "Hash Tables", icon: "🗂️", count: 87, progress: 43 },
  { name: "Stacks & Queues", icon: "📚", count: 76, progress: 71 },
];

const TopicGrid = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {topics.map((topic, index) => (
        <motion.div
          key={topic.name}
          className="topic-card neon-glow group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="text-center">
            <motion.div
              className="text-4xl mb-3 group-hover:animate-float"
              whileHover={{ scale: 1.2, rotate: 10 }}
            >
              {topic.icon}
            </motion.div>
            <h3 className="font-semibold text-sm mb-2 text-foreground group-hover:text-neon-green transition-colors">
              {topic.name}
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              {topic.count} challenges
            </p>

            {/* Progress Bar */}
            <div className="progress-bar">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${topic.progress}%` }}
                transition={{ duration: 1.5, delay: index * 0.1 + 0.5 }}
              />
            </div>
            <p className="text-xs text-neon-green mt-1 font-medium">
              {topic.progress}% complete
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TopicGrid;
