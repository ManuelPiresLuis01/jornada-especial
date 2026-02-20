import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import TypingText from "./TypingText";

interface ActTwoProps {
  onNext: () => void;
}

interface Question {
  question: string;
  options: string[];
  correct: number;
  rightMsg: string;
  wrongMsg: string;
}

const questions: Question[] = [
  {
    question: "O que mais me move todos os dias?",
    options: ["Competição", "Vaidade", "Vontade de crescer e mudar a realidade atual", "Pressão social"],
    correct: 2,
    rightMsg: "Exato. Meu propósito é maior que eu.",
    wrongMsg: "Talvez nem sempre eu fale sobre isso… Mas o que realmente me move é a vontade de crescer e mudar a realidade da minha família.",
  },
  {
    question: "Quando eu te envio reels e músicas, isso significa que:",
    options: ["Estou entediado", "Quero preencher tempo", "Quero compartilhar o que penso e sinto", "Não tinha mais nada para fazer"],
    correct: 2,
    rightMsg: "Você entende minha linguagem.",
    wrongMsg: "Para mim nunca foi só entretenimento. Sempre foi uma forma de compartilhar o que penso e sinto.",
  },
  {
    question: "Depois do nosso primeiro encontro (13 de fevereiro), eu fiquei:",
    options: ["Indiferente", "Confuso", "Diferente", "Cansado"],
    correct: 2,
    rightMsg: "Sim. Diferente. Porque ali percebi algo especial.",
    wrongMsg: "A verdade? Eu fiquei diferente. Porque ali percebi algo especial.",
  },
  {
    question: "Depois do cinema (15 de fevereiro), eu entendi que:",
    options: ["Foi só um filme", "Era apenas empolgação", "O que eu sentia era real", "Era só o clima do momento"],
    correct: 2,
    rightMsg: "Exato. Ali eu confirmei que meus sentimentos eram verdadeiros.",
    wrongMsg: "Não foi só o clima. Ali eu confirmei que meus sentimentos eram reais.",
  },
];

const ActTwo = ({ onNext }: ActTwoProps) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const [resultTypingDone, setResultTypingDone] = useState(false);

  const handleSelect = (idx: number) => {
    if (showFeedback) return;
    setSelected(idx);
    setShowFeedback(true);

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ((prev) => prev + 1);
        setSelected(null);
        setShowFeedback(false);
      } else {
        setAllDone(true);
      }
    }, 3000);
  };

  const q = questions[currentQ];
  const isCorrect = selected === q.correct;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative">
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />

      {!allDone ? (
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          className="max-w-xl w-full"
        >
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-6 h-6 text-primary" />
            <span className="text-sm text-muted-foreground font-mono">
              Verificação de Conexão — {currentQ + 1}/{questions.length}
            </span>
          </div>

          {currentQ === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-muted-foreground mb-8 text-sm"
            >
              Antes de continuar… quero ver se você me entende como eu imagino.
            </motion.p>
          )}

          <h2 className="text-xl md:text-2xl font-semibold mb-8 text-foreground">
            {q.question}
          </h2>

          <div className="space-y-3">
            {q.options.map((opt, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => handleSelect(i)}
                disabled={showFeedback}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${
                  showFeedback && i === q.correct
                    ? "border-terminal-green bg-terminal-green/10 text-terminal-green"
                    : showFeedback && i === selected && !isCorrect
                    ? "border-destructive bg-destructive/10 text-destructive"
                    : selected === i
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-secondary/50 text-foreground hover:border-primary/50 hover:bg-secondary"
                }`}
              >
                <span className="font-mono text-muted-foreground mr-3 text-sm">
                  {String.fromCharCode(65 + i)})
                </span>
                {opt}
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mt-6 p-4 rounded-lg flex items-start gap-3 ${
                  isCorrect
                    ? "bg-terminal-green/10 border border-terminal-green/30"
                    : "bg-primary/10 border border-primary/30"
                }`}
              >
                {isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-terminal-green mt-0.5 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                )}
                <p className={isCorrect ? "text-terminal-green" : "text-primary"}>
                  {isCorrect ? q.rightMsg : q.wrongMsg}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-lg w-full text-center"
        >
          <BarChart3 className="w-10 h-10 text-primary mx-auto mb-6" />

          <TypingText
            texts={[
              "Resultado da análise:",
              "Sentimento consistente.",
              "Intensidade estável.",
              "Direção clara.",
            ]}
            speed={40}
            delayBetween={600}
            onComplete={() => setResultTypingDone(true)}
            className="text-lg text-center"
          />

          {resultTypingDone && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={onNext}
              className="mt-10 flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:scale-105 transition-transform mx-auto"
            >
              Continuar
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default ActTwo;
