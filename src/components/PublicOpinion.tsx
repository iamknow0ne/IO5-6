import React from 'react';
import { TrendingDown, TrendingUp, BookOpen, ThumbsUp, ThumbsDown, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

import { GameState } from '../types/game';

interface PublicOpinionProps {
  state: GameState;
  publicOpinionIcon: () => React.ReactNode;
}

const PublicOpinion: React.FC<PublicOpinionProps> = ({
  state,
  publicOpinionIcon
}) => {
  return (
    state.discoveredFeatures.publicRelations && (
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 mb-6 flex items-center justify-between transition duration-300 ease-in-out transform hover:scale-105">
        <div className='flex items-center gap-2'>
          {publicOpinionIcon()}
          <h2 className="text-lg font-semibold text-white">Public Opinion:</h2>
        </div>

        <motion.span
  className="text-xl"
  animate={{ scale: [1, 1.1, 1] }}
  transition={{ duration: 1, repeat: Infinity }}
>
  {state.publicOpinion}
</motion.span>
      </div>
    )
  );
};

export default PublicOpinion;
