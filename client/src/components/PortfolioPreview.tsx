import { Card } from "@/components/ui/card";
import {
  MinimalTemplate,
  CreativeTemplate,
  TechnicalTemplate,
} from "@/components/portfolio";
import type { PortfolioData } from "@/components/portfolio";

interface PortfolioPreviewProps {
  templateId: string;
  data: PortfolioData;
}

const templateRenderers: Record<
  string,
  React.FC<{ data: PortfolioData }>
> = {
  minimal: MinimalTemplate,
  creative: CreativeTemplate,
  technical: TechnicalTemplate,
};

export default function PortfolioPreview({ templateId, data }: PortfolioPreviewProps) {
  const Renderer = templateRenderers[templateId] ?? MinimalTemplate;
  return (
    <Card className="overflow-hidden">
      <Renderer data={data} />
    </Card>
  );
}
