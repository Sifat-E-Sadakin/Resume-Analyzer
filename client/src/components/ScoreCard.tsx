import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ScoreCardProps {
  title: string;
  score: number;
  icon: LucideIcon;
  description?: string;
}

export default function ScoreCard({ title, score, icon: Icon, description }: ScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-chart-3";
    if (score >= 60) return "text-chart-4";
    return "text-destructive";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-chart-3/10";
    if (score >= 60) return "bg-chart-4/10";
    return "bg-destructive/10";
  };

  return (
    <Card className="p-6" data-testid="card-score">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-lg ${getScoreBg(score)} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${getScoreColor(score)}`} />
        </div>
        <div className={`text-3xl font-bold ${getScoreColor(score)}`} data-testid="text-score-value">
          {score}%
        </div>
      </div>
      <h3 className="font-semibold mb-1" data-testid="text-score-title">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </Card>
  );
}
