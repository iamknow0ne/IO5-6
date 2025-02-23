import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface EventsProps {
  state: any;
}

const Events: React.FC<EventsProps> = ({
  state
}) => {
  return (
    state.events.active && state.discoveredFeatures.events && (
      <div className="bg-red-900/50 p-4 rounded-lg mb-6 text-center border border-red-700 transition-all animate-pulse">
        <p className="text-lg flex items-center justify-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          {state.events.type === 'resistance' && "Resistance Attack: Doses destroyed!"}
          {state.events.type === 'outcry' && "Public Outcry: Harvesting efficiency halved!"}
          {state.events.type === 'equipment' && "Equipment Failure: Automation disabled!"}
          {state.events.type === 'supply' && "Supply Disruption: Production costs doubled!"}
        </p>
      </div>
    )
  );
};

export default Events;
