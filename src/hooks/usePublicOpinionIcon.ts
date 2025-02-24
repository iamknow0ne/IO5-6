import { TrendingDown, TrendingUp, ThumbsUp } from 'lucide-react';

export default function usePublicOpinionIcon(state: any) {
  const publicOpinionIcon = () => {
    if (state.publicOpinion >= 75) {
      return <ThumbsUp className="w-6 h-6 text-green-500" />;
    } else if (state.publicOpinion >= 25) {
      return <TrendingUp className="w-6 h-6 text-yellow-500" />;
    } else {
      return <TrendingDown className="w-6 h-6 text-red-500" />;
    }
  };

  return publicOpinionIcon;
}
