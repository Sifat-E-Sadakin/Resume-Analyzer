import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Resume Analyzer</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI-powered resume analysis and portfolio generation to help you stand out in your job search.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Templates</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Get resume tips and career insights
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Email address"
                className="text-sm"
                data-testid="input-newsletter-email"
              />
              <Button data-testid="button-subscribe">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Resume Analyzer. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Button variant="ghost" size="icon" data-testid="button-github">
              <Github className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" data-testid="button-linkedin">
              <Linkedin className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" data-testid="button-twitter">
              <Twitter className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
