import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

interface ActFiveProps {
  onNext: () => void;
}

const lines = [
  "Eu admiro a sua inteligência.",
  "A forma como você pensa grande.",
  "Como você fala do futuro com convicção.",
  "Você é diferente.",
  "Não é comum encontrar alguém que quer crescer e construir algo sério.",
  "A sua energia é leve.",
  "E seus olhos realmente desarmam qualquer resistência que eu tento manter.",
  "Em algum momento, pensar em você virou parte da minha rotina.",
];

const ActFive = ({ onNext }: ActFiveProps) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [allDone, setAllDone] = useState(false);

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setVisibleLines(count);
      if (count >= lines.length) {
        clearInterval(interval);
        setTimeout(() => setAllDone(true), 800);
      }
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative">
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-lg w-full"
      >
        <Sparkles className="w-8 h-8 text-primary mb-8 mx-auto" />

        <div className="space-y-4">
          {lines.slice(0, visibleLines).map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`text-lg md:text-xl leading-relaxed ${
                i === lines.length - 1
                  ? "text-primary font-semibold text-glow"
                  : "text-foreground/90"
              }`}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {allDone && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onClick={onNext}
            className="mt-12 flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:scale-105 transition-transform mx-auto"
          >
            Continuar
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default ActFive;
