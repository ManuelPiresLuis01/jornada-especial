import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Clock } from "lucide-react";
import ConfettiEffect from "./ConfettiEffect";

const PHONE = "244929004469";

const ActFinal = () => {
  const [chosen, setChosen] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const sendWhatsApp = (message: string) => {
    const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleAccept = () => {
    setChosen("accept");
    setShowConfetti(true);
    sendWhatsApp("Aceito começar uma história contigo ❤️");
  };




  const handleThink = () => {
    setChosen("think");
    sendWhatsApp("Vamos dar um tempo");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative">
      <ConfettiEffect trigger={showConfetti} />
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />

      {!chosen ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg w-full text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="inline-block mb-8"
          >
            <Heart className="w-14 h-14 text-primary fill-primary" />
          </motion.div>

          <h2 className="font-mono text-lg text-muted-foreground mb-2">
            Atualização disponível:
          </h2>
          <p className="text-2xl md:text-3xl font-bold text-foreground mb-10 text-glow">
            relationshipStatus = <span className="text-primary">?</span>
          </p>

          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAccept}
              className="w-full p-4 rounded-lg bg-primary text-primary-foreground font-semibold text-lg hover:shadow-lg transition-shadow box-glow flex items-center justify-center gap-3"
            >
              <Heart className="w-5 h-5" />
              Eu estou apaixonado por você, aceitas começar uma história comigo?
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleThink}
              className="w-full p-4 rounded-lg bg-secondary text-secondary-foreground font-semibold border border-border hover:border-primary/50 transition-colors flex items-center justify-center gap-3"
            >
              <Clock className="w-5 h-5" />
              Vou pensar como resolver esse bug, e depois te contacto
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg w-full text-center"
        >
          {chosen === "accept" && (
            <>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="inline-block mb-6"
              >
                <Heart className="w-16 h-16 text-primary fill-primary" />
              </motion.div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 text-glow">
                Status atualizado com sucesso ❤️
              </h2>
              <p className="text-foreground/80 text-lg leading-relaxed">
                Obrigado por transformar um simples currículo na melhor história que eu já comecei.
              </p>
            </>
          )}
          {chosen === "think" && (
            <>
              <Clock className="w-12 h-12 text-accent mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Tudo bem, sem pressa.
              </h2>
              <p className="text-muted-foreground text-lg">
                Vou estar aqui quando você estiver pronta. Alguns sentimentos não têm prazo de validade.
              </p>
            </>
          )}


        </motion.div>
      )}
    </div>
  );
};

export default ActFinal;
