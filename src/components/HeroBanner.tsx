import React from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroBanner = () => {
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-hero-gradient"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-neon-green rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-orbitron font-black mb-6">
            <span className="hero-text">EXPLORE</span>
          </h1>
          <h2 className="text-2xl md:text-4xl font-orbitron font-bold mb-4">
            <span className="hero-text">SOLVE & LEVEL UP</span>
          </h2>
          <p className="text-xl text-[rgb(160,160,160)] mb-8 max-w-2xl mx-auto">
            Dive into the neon-powered coding universe. Master algorithms,
            conquer challenges, and become the developer you've always dreamed
            of being.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Link to="/signin">
            <Button
              className="btn-primary animate-glow-pulse text-lg px-8 py-4 group text-[rgb(13,13,13)] rounded-none"
              size="lg"
            >
              Start a Challenge
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {[
            { label: "Active Coders", value: "50K+" },
            { label: "Challenges", value: "2.5K+" },
            { label: "Companies", value: "100+" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-orbitron font-bold text-neon-green mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HeroBanner;
