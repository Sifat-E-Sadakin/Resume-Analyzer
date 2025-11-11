import ScoreCard from '../ScoreCard';
import { Award, FileText, Target, Zap } from 'lucide-react';

export default function ScoreCardExample() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      <ScoreCard 
        title="Overall Score" 
        score={85} 
        icon={Award}
        description="Strong resume quality"
      />
      <ScoreCard 
        title="Content" 
        score={72} 
        icon={FileText}
        description="Good but needs improvement"
      />
      <ScoreCard 
        title="Skills Match" 
        score={90} 
        icon={Target}
        description="Excellent alignment"
      />
      <ScoreCard 
        title="Impact" 
        score={55} 
        icon={Zap}
        description="Could be stronger"
      />
    </div>
  );
}
