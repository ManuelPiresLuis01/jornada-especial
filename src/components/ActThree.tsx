import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ArrowRight, X } from "lucide-react";

interface ActThreeProps {
  onNext: () => void;
}

const timeline = [
  {
    date: "14/04/2025",
    title: "Primeira conversa",
    text: "Foi quando trocamos mensagens pela primeira vez no WhatsApp. Naquele dia você me ajudou a enviar meu currículo para a Mamboo. Uma conexão inesperada começou ali.",
  },
  {
    date: "21/04/2025",
    title: "Primeiro encontro no trabalho",
    text: "Dia em que te vi pela primeira vez pessoalmente, quando comecei a trabalhar na Mamboo. Lembro de como sua presença ficou marcada naquele dia.",
  },
  {
    date: "Depois do início na Mamboo",
    title: "Rotina juntos",
    text: "Voltávamos sempre juntos para pegar o mesmo táxi. Pequenos momentos que se tornaram rotina.",
  },
  {
    date: "Junho de 2025",
    title: "Você saiu da Mamboo e me abandonou lá kkk",
    text: "Você sumiu por uns tempos, mas mantivemos contato. Continuavas a ver os reels e músicas que eu mandava no Instagram e WhatsApp.",
  },
  {
    date: "13/12/2025",
    title: "DevFest",
    text: "Voltamos a nos encontrar no DevFest. Um reencontro que trouxe lembranças e boas conversas.",
  },
  {
    date: "13/02/2026",
    title: "Primeiro date oficial (eu considero um date kkkk)",
    text: "Nosso primeiro date real: comemos gelado e caminhamos pela cidade de Luanda. Foi um momento leve, divertido e que me fez perceber algo diferente em mim e gostar ainda mais de ti.",
  },
  {
    date: "15/02/2026",
    title: "Cinema romântico",
    text: "Fomos ao cinema ver um filme de romance. Foi ali que percebi diretamente o quanto estou apaixonado por você.\n\nFoi ali que percebi que o que sinto por você não é passageiro.",
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
