import React from "react";
import { motion } from "framer-motion";

const BingoWin = () => {
  return (
    <motion.div
      className="absolute inset-0 z-50 top-28 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.3,
        },
      }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-background/90 rounded-3xl p-8 md:p-12 shadow-2xl max-w-xl w-full text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          transition: {
            duration: 0.5,
            type: "spring",
            stiffness: 150,
          },
        }}
      >
        <motion.div
          initial={{ rotate: -10, scale: 0.8 }}
          animate={{
            rotate: [0, 10, -10, 0],
            scale: 1,
            transition: {
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            },
          }}
        >
          <h3 className="text-[4rem] md:text-[6rem] font-extrabold tracking-tight leading-tight mb-4 bg-gradient-to-r from-pink-500 to-purple-800 text-transparent bg-clip-text">
            BINGO! <span className="text-background">🎉</span>
          </h3>
          <p className="text-xl md:text-2xl font-semibold mb-4">
            Congratulations on Your Victory!
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default BingoWin;
