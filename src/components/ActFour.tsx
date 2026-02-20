import { motion } from "framer-motion";
import { AlertTriangle, Wrench } from "lucide-react";

interface ActFourProps {
  onNext: () => void;
}

const ActFour = ({ onNext }: ActFourProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative">
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-lg w-full"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="flex items-center gap-3 mb-8"
        >
          <AlertTriangle className="w-8 h-8 text-accent" />
          <span className="font-mono text-accent text-sm font-semibold tracking-wide">
            BUG REPORT
          </span>
        </motion.div>

        <div className="bg-card border border-border rounded-xl p-6 font-mono text-sm space-y-4 box-glow">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-muted-foreground">Variável:</span>{" "}
            <span className="text-primary font-semibold">relationshipStatus</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span className="text-muted-foreground">Estado atual:</span>{" "}
            <span className="text-accent font-semibold">undefined</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <span className="text-muted-foreground">Severidade:</span>{" "}
            <span className="text-destructive font-semibold">Alta</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="pt-2 border-t border-border"
          >
            <p className="text-muted-foreground mb-2">Sintomas detectados:</p>
            <ul className="space-y-1 text-foreground">
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.7 }}
              >
                • Pensamentos constantes
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.0 }}
              >
                • Admiração crescente
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.3 }}
              >
                • Emoções não oficialmente declaradas
              </motion.li>
            </ul>
          </motion.div>
        </div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8 }}
          onClick={onNext}
          className="mt-10 flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground rounded-lg font-semibold text-lg hover:scale-105 transition-transform mx-auto animate-pulse"
        >
          <Wrench className="w-5 h-5" />
          Corrigir Erro
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ActFour;
