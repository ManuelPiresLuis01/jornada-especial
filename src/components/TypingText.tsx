import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypingTextProps {
  texts: string[];
  speed?: number;
  delayBetween?: number;
  onComplete?: () => void;
  className?: string;
}

const TypingText = ({ texts, speed = 40, delayBetween = 800, onComplete, className = "" }: TypingTextProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [completedTexts, setCompletedTexts] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentTextIndex >= texts.length) {
      setIsTyping(false);
      onComplete?.();
      return;
    }

    const currentText = texts[currentTextIndex];

    if (currentCharIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setCurrentCharIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCompletedTexts((prev) => [...prev, currentText]);
        setCurrentTextIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, delayBetween);
      return () => clearTimeout(timeout);
    }
  }, [currentTextIndex, currentCharIndex, texts, speed, delayBetween, onComplete]);

  return (
    <div className={`font-mono space-y-2 ${className}`}>
      {completedTexts.map((text, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 1 }}
          className="text-terminal-green"
        >
          <span className="text-muted-foreground mr-2">{">"}</span>
          {text}
        </motion.p>
      ))}
      {isTyping && currentTextIndex < texts.length && (
        <p className="text-terminal-green">
          <span className="text-muted-foreground mr-2">{">"}</span>
          {texts[currentTextIndex].substring(0, currentCharIndex)}
          <span className="animate-pulse">▊</span>
        </p>
      )}
    </div>
  );
};

export default TypingText;
