import { useState, useEffect, useRef, useMemo } from 'react';
import { Representative } from '../types/game';

export default function useRepresentatives(state: any) {
  const [representatives, setRepresentatives] = useState<Representative[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const maxReps = 20;
    const currentIReps = representatives.filter(r => r.type === 'I').length;
    const currentOReps = representatives.filter(r => r.type === 'O').length;
    const targetIReps = Math.min(state.I / 10, maxReps);
    const targetOReps = Math.min(state.O / 10, maxReps);

    let newReps = [...representatives];

    const iDiff = targetIReps - currentIReps;
    if (iDiff > 0) {
      for (let i = 0; i < iDiff; i++) {
        newReps.push({
          id: `I-${Date.now()}-${i}`,
          type: 'I',
          top: Math.random() * 100,
          left: Math.random() * 100,
          dx: (Math.random() * 2) - 1,
          dy: (Math.random() * 2) - 1,
          size: Math.min(2 + (state.I / 10) * 0.2, 10),
        });
      }
    } else if (iDiff < 0) {
      let iCount = 0;
      newReps = newReps.filter(rep => {
        if (rep.type === 'I') {
          iCount++;
          return iCount <= targetIReps;
        }
        return true;
      });
    }

    const oDiff = targetOReps - currentOReps;
    if (oDiff > 0) {
      for (let i = 0; i < oDiff; i++) {
        newReps.push({
          id: `O-${Date.now()}-${i}`,
          type: 'O',
          top: Math.random() * 100,
          left: Math.random() * 100,
          dx: (Math.random() * 2) - 1,
          dy: (Math.random() * 2) - 1,
          size: Math.min(2 + (state.O / 10) * 0.2, 10),
        });
      }
    } else if (oDiff < 0) {
      let oCount = 0;
      newReps = newReps.filter(rep => {
        if (rep.type === 'O') {
          oCount++;
          return oCount <= targetOReps;
        }
        return true;
      });
    }

    setRepresentatives(newReps);
  }, [state.I, state.O]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    let animationFrameId: number;

    const updatePositions = () => {
      setRepresentatives(prevReps =>
        prevReps.map(rep => {
          let { top, left, dx, dy, size, type, id } = rep;

          let newTop = top + dy * 0.5;
          let newLeft = left + dx * 0.5;

          if (newTop < 0) {
            newTop = 0;
            dy = -dy;
          } else if (newTop > (100 - (size / containerHeight) * 100)) {
            newTop = 100 - (size / containerHeight) * 100;
            dy = -dy;
          }

          if (newLeft < 0) {
            newLeft = 0;
            dx = -dx;
          } else if (newLeft > (100 - (size / containerWidth) * 100)) {
            newLeft = 100 - (size / containerWidth) * 100;
            dx = -dx;
          }

          if (state.events.active && (state.events.type === 'civil war' || state.events.type === 'pay raise')) {
            for (const otherRep of prevReps) {
              if (otherRep.id === rep.id) continue;

              const repLeft = (newLeft / 100) * containerWidth;
              const repTop = (newTop / 100) * containerHeight;
              const otherRepLeft = (otherRep.left / 100) * containerWidth;
              const otherRepTop = (otherRep.top / 100) * containerHeight;

              if (
                repLeft < otherRepLeft + otherRep.size &&
                repLeft + rep.size > otherRepLeft &&
                repTop < otherRepTop + otherRep.size &&
                repTop + rep.size > otherRepTop
              ) {
                if (state.events.type === 'civil war') {
                  decreasePopulation(rep.type, 10);
                  decreasePopulation(otherRep.type, 10);
                  return null;
                } else if (state.events.type === 'pay raise' && rep.type === "O" && otherRep.type === "I") {
                  convertPopulation();
                  return { ...rep, type: "I", dx: otherRep.dx, dy: otherRep.dy, size: otherRep.size, id: rep.id }
                } else {
                  return { ...rep, top: newTop, left: newLeft, dx, dy };
                }
              }
            }
          }

          return { ...rep, top: newTop, left: newLeft, dx, dy };
        }).filter(rep => rep !== null) as Representative[]
      );

      animationFrameId = requestAnimationFrame(updatePositions);
    };

    animationFrameId = requestAnimationFrame(updatePositions);

    return () => cancelAnimationFrame(animationFrameId);
  }, [state.events.active, state.events.type, decreasePopulation, convertPopulation]);

  const representativeElements = useMemo(() => {
    return representatives.map((rep) => (
      <div
        key={rep.id}
        className={`w-2 h-2 rounded-full absolute ${rep.type === 'I' ? 'bg-blue-500' : 'bg-red-500'}`}
        style={{
          top: `${rep.top}%`,
          left: `${rep.left}%`,
          transform: `translate(${rep.translateX}px, ${rep.translateY}px)`,
          transition: 'transform 0.016s linear',
          width: `${rep.size}px`,
          height: `${rep.size}px`,
          opacity: rep.type === 'I' ? Math.min(1, 0.3 + (rep.size / 10) * 0.7) : Math.min(1, 0.3 + (rep.size / 10) * 0.7),
        }}
      />
    ));
  }, [representatives]);

  return { representatives, containerRef, representativeElements };
}
