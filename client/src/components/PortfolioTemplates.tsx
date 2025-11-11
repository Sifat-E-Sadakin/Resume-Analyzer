import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import minimalTemplate from "@assets/generated_images/Minimal_portfolio_template_0d23bb84.png";
import creativeTemplate from "@assets/generated_images/Creative_portfolio_template_cc9acddf.png";

const templates = [
  {
    id: "minimal",
    name: "Minimal Professional",
    description: "Clean, single-page layout perfect for traditional industries",
    image: minimalTemplate,
    tags: ["Professional", "ATS-Friendly", "Traditional"],
  },
  {
    id: "creative",
    name: "Creative Grid",
    description: "Bold typography and project showcase for creative professionals",
    image: creativeTemplate,
    tags: ["Creative", "Modern", "Portfolio"],
  },
  {
    id: "technical",
    name: "Technical Developer",
    description: "Code-inspired aesthetic ideal for software engineers",
    image: minimalTemplate,
    tags: ["Developer", "Tech", "Dark Mode"],
  },
];

export default function PortfolioTemplates() {
  const [selected, setSelected] = useState<string>("minimal");

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2" data-testid="text-templates-heading">
          Choose Your Portfolio Template
        </h2>
        <p className="text-muted-foreground">
          Select a template that best represents your professional style
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card 
            key={template.id}
            className={`overflow-hidden hover-elevate transition-all cursor-pointer ${
              selected === template.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => {
              setSelected(template.id);
              console.log("Template selected:", template.id);
            }}
            data-testid={`card-template-${template.id}`}
          >
            <div className="relative aspect-[4/3] bg-muted">
              <img 
                src={template.image} 
                alt={template.name}
                className="w-full h-full object-cover"
                data-testid={`img-template-${template.id}`}
              />
              {selected === template.id && (
                <div className="absolute top-3 right-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-primary-foreground" />
                </div>
              )}
            </div>
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold mb-1" data-testid={`text-template-name-${template.id}`}>
                  {template.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {template.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {template.tags.map((tag, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-center pt-4">
        <Button size="lg" data-testid="button-use-template">
          Use {templates.find(t => t.id === selected)?.name} Template
        </Button>
      </div>
    </div>
  );
}
