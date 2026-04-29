import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-foreground/15 bg-accent/60">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr] gap-10 lg:gap-12 items-start mb-12">
          <div>
            <h3 className="font-serif text-2xl leading-none text-foreground mb-4">
              Resume <span className="italic text-primary">Analyzer</span>
            </h3>
            <p className="text-[15px] text-muted-foreground max-w-sm" style={{ lineHeight: 1.6 }}>
              A careful read of your resume — and a portfolio that reads like
              it was written for you.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-5">Product</h4>
            <ul className="space-y-2.5 text-[15px] text-foreground/80">
              <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Templates</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-5">Studio</h4>
            <ul className="space-y-2.5 text-[15px] text-foreground/80">
              <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-5">Stay in touch</h4>
            <p className="text-[15px] text-muted-foreground mb-4" style={{ lineHeight: 1.6 }}>
              Occasional notes on resumes, portfolios, and careers.
            </p>
            <form
              className="flex gap-2"
              onSubmit={(e) => e.preventDefault()}
              data-testid="form-newsletter"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="your@email.com"
                className="flex-1 min-w-0 h-11 rounded-full border border-foreground/20 bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-shadow"
                data-testid="input-newsletter-email"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center h-11 px-5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                data-testid="button-subscribe"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-foreground/15 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[13px] text-muted-foreground">© 2025 Resume Analyzer — made with care.</p>
          <div className="flex items-center gap-1">
            {[
              { href: "#", label: "GitHub", Icon: Github, testId: "button-github" },
              { href: "#", label: "LinkedIn", Icon: Linkedin, testId: "button-linkedin" },
              { href: "#", label: "Twitter", Icon: Twitter, testId: "button-twitter" },
            ].map(({ href, label, Icon, testId }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                data-testid={testId}
                className="group inline-flex items-center justify-center w-10 h-10 rounded-full text-muted-foreground hover:text-primary hover:bg-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
