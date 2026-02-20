import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, ArrowRight } from "lucide-react";
import TypingText from "./TypingText";

interface ActOneProps {
  onNext: () => void;
}

const ActOne = ({ onNext }: ActOneProps) => {
  const [typingDone, setTypingDone] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative">
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="mb-10"
      >
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </motion.div>

      <TypingText
        texts={[
          "Carregando histórico…",
          "Detectando conexão recorrente…",
          "Usuária reconhecida.",
        ]}
        speed={50}
        delayBetween={1000}
        onComplete={() => setTypingDone(true)}
        className="text-lg md:text-xl max-w-lg"
      />

      {typingDone && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onClick={onNext}
          className="mt-12 flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:scale-105 transition-transform animate-pulse box-glow"
        >
          <ArrowRight className="w-5 h-5" />
          Iniciar Jornada
        </motion.button>
      )}
    </div>
  );
};

export default ActOne;
