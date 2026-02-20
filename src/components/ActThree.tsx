import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ArrowRight, X } from "lucide-react";

interface ActThreeProps {
  onNext: () => void;
}

const timeline = [
  {
    date: "14/04/2025",
    title: "O início de algo",
    text: "Foi nesse dia que algo mudou. Uma conversa que parecia simples, mas que plantou uma semente que eu não esperava.",
  },
  {
    date: "21/04/2025",
    title: "A conexão cresceu",
    text: "Cada conversa ia ficando mais natural, mais profunda. Eu percebi que não era só interesse — era algo que crescia por dentro.",
  },
  {
    date: "Junho 2025",
    title: "Pensamentos constantes",
    text: "Nesse mês, percebi que pensar em você já tinha virado rotina. Não por hábito, mas porque você simplesmente aparecia nos meus pensamentos.",
  },
  {
    date: "13/12/2025",
    title: "Um marco silencioso",
    text: "Esse dia ficou guardado. Talvez você nem saiba o quanto ele significou para mim, mas foi ali que entendi a profundidade do que sentia.",
  },
  {
    date: "13/02/2026",
    title: "O primeiro encontro",
    text: "Finalmente te vi de perto. E foi diferente de tudo que eu imaginava — foi melhor. Ali percebi que a realidade superava qualquer expectativa.",
  },
  {
    date: "15/02/2026",
    title: "A confirmação",
    text: "Foi ali que percebi que o que sinto por você não é passageiro.",
  },
];

const ActThree = ({ onNext }: ActThreeProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [visited, setVisited] = useState<Set<number>>(new Set());

  const handleOpen = (idx: number) => {
    setOpenIndex(idx);
    setVisited((prev) => new Set(prev).add(idx));
  };

  const allVisited = visited.size === timeline.length;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative">
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg w-full"
      >
        <div className="flex items-center gap-3 mb-2">
          <Calendar className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-semibold">Linha do Tempo</h2>
        </div>
        <p className="text-muted-foreground text-sm mb-8">
          Toque em cada data para reviver o momento.
        </p>

        <div className="space-y-3">
          {timeline.map((item, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => handleOpen(i)}
              className={`w-full text-left p-4 rounded-lg border transition-all duration-300 flex items-center gap-4 ${
                visited.has(i)
                  ? "border-primary/40 bg-primary/5"
                  : "border-border bg-secondary/50 hover:border-primary/50"
              }`}
            >
              <Calendar className={`w-5 h-5 shrink-0 ${visited.has(i) ? "text-primary" : "text-muted-foreground"}`} />
              <span className="font-mono text-sm">{item.date}</span>
              {visited.has(i) && (
                <span className="ml-auto text-xs text-primary">✓</span>
              )}
            </motion.button>
          ))}
        </div>

        {allVisited && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onNext}
            className="mt-10 flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:scale-105 transition-transform mx-auto"
          >
            Continuar
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        )}
      </motion.div>

      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-6"
            onClick={() => setOpenIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-xl p-6 max-w-md w-full box-glow"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-primary text-sm">
                  {timeline[openIndex].date}
                </span>
                <button
                  onClick={() => setOpenIndex(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <h3 className="text-lg font-semibold mb-3">
                {timeline[openIndex].title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {timeline[openIndex].text}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ActThree;
