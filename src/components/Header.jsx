import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import NewChallenge from "./NewChallenge.jsx";

export default function Header() {
  const [isCreatingNewChallenge, setIsCreatingNewChallenge] = useState();

  function handleStartAddNewChallenge() {
    setIsCreatingNewChallenge(true);
  }

  function handleDone() {
    setIsCreatingNewChallenge(false);
  }

  return (
    <>
      <AnimatePresence>
        {isCreatingNewChallenge && <NewChallenge onDone={handleDone} />}
      </AnimatePresence>

      <header id="main-header">
        <div className="import-export">
          <h1>Your Challenges</h1>
          <motion.button
            whileTap={{ scale: 0.5 }}
            transition={{
              type: "tween",
              stiffness: 200,
            }}
            className="button"
          >
            Export Data
          </motion.button>
          <span>
            <motion.button
              whileTap={{ scale: 0.5 }}
              transition={{
                type: "tween",
                stiffness: 200,
              }}
              className="button"
            >
              Import Data
            </motion.button>
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 500 }}
          onClick={handleStartAddNewChallenge}
          className="button"
        >
          Add Challenge
        </motion.button>
      </header>
    </>
  );
}
