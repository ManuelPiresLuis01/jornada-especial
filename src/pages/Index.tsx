import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ActOne from "@/components/ActOne";
import ActTwo from "@/components/ActTwo";
import ActThree from "@/components/ActThree";
import ActFour from "@/components/ActFour";
import ActFive from "@/components/ActFive";
import ActFinal from "@/components/ActFinal";

const Index = () => {
  const [act, setAct] = useState(1);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={act}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {act === 1 && <ActOne onNext={() => setAct(2)} />}
          {act === 2 && <ActTwo onNext={() => setAct(3)} />}
          {act === 3 && <ActThree onNext={() => setAct(4)} />}
          {act === 4 && <ActFour onNext={() => setAct(5)} />}
          {act === 5 && <ActFive onNext={() => setAct(6)} />}
          {act === 6 && <ActFinal />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Index;
