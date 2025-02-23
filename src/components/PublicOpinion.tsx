import React from 'react';
import { TrendingDown, TrendingUp, BookOpen, ThumbsUp, ThumbsDown, AlertTriangle } from 'lucide-react';

interface PublicOpinionProps {
  state: any;
}

const PublicOpinion: React.FC<PublicOpinionProps> = ({
  state
}) => {

  const publicOpinionIcon = () => {
    if (state.publicOpinion >= 75) {
      return <ThumbsUp className="w-6 h-6 text-green-500" />;
    } else if (state.publicOpinion >= 25) {
      return <TrendingUp className="w-6 h-6 text-yellow-500" />;
    } else {
      return <TrendingDown className="w-6 h-6 text-red-500" />;
    }
  };

  return (
    state.discoveredFeatures.publicRelations && (
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 mb-6 flex items-center justify-between">
        <div className='flex items-center gap-2'>
          {publicOpinionIcon()}
          <h2 className="text-lg font-semibold">Public Opinion:</h2>
        </div>

        <span className="text-xl">{state.publicOpinion}</span>
      </div>
    )
  );
};

export default PublicOpinion;
