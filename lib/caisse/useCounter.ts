/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";

/**
 * Anime un nombre de 0 à `target` sur une durée donnée.
 * @param target Valeur finale
 * @param duration Durée de l'animation en ms (défaut: 1000)
 * @returns Valeur courante (arrondie à l'entier)
 */
export function useCounter(target: number, duration: number = 1000): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (target === 0) {
      setCount(0);
      return;
    }

    let startTime: number | null = null;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Arrondi pour éviter les décimales
      const current = Math.round(progress * target);
      setCount(current);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      } else {
        // Assure que la valeur finale est exacte
        setCount(target);
      }
    };

    animationFrame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  return count;
}
