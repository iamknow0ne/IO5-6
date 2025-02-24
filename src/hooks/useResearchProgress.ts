import { useState } from 'react';

export default function useResearchProgress() {
  const [researchProgress, setResearchProgress] = useState<{ [key: string]: number }>({});

  const startResearchProgress = (researchKey: string, duration: number) => {
    setResearchProgress(prev => ({ ...prev, [researchKey]: 0 }));
    const interval = setInterval(() => {
      setResearchProgress(prev => {
        const currentProgress = prev[researchKey] || 0;
        if (currentProgress >= 100) {
          clearInterval(interval);
          return prev;
        }
        return { ...prev, [researchKey]: currentProgress + (100 / (duration / 100)) };
      });
    }, 100);
  };

  return { researchProgress, startResearchProgress };
}
