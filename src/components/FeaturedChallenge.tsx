import React from "react";
import { motion } from "motion/react";
import { ChevronRight, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FeaturedChallenge = () => {
  return (
    <motion.div
      className="relative overflow-hidden rounded-xl bg-gradient-to-r from-neon-green/20 to-neon-blue/20 border border-neon-green/30 p-8"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Animated border pulse */}
      <motion.div
        className="absolute inset-0 border-2 border-neon-green rounded-xl opacity-50"
        animate={{
          borderColor: [
            "rgba(0, 255, 163, 0.5)",
            "rgba(77, 255, 223, 0.5)",
            "rgba(0, 255, 163, 0.5)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-neon-gradient text-black px-3 py-1 rounded-full text-sm font-semibold">
                🔥 FEATURED
              </span>
              <span className="difficulty-medium px-2 py-1 rounded text-xs">
                Medium
              </span>
            </div>

            <h3 className="text-2xl font-orbitron font-bold text-foreground mb-2">
              Binary Tree Maximum Path Sum
            </h3>

            <p className="text-muted-foreground mb-4 max-w-2xl">
              A challenging tree problem that tests your understanding of
              recursion and dynamic programming. Perfect for preparing for top
              tech interviews.
            </p>

            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-neon-green" />
                <span className="text-neon-green font-semibold">+150 XP</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span className="text-foreground">~45 min</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Solved by 12.4K developers
              </div>
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/signin">
              <Button className="btn-primary text-lg px-6 py-3 group">
                Start Challenge
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedChallenge;
