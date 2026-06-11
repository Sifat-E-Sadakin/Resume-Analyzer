export default function Footer() {
  return (
    <footer className="border-t border-foreground/15 bg-accent/60">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h3 className="font-serif text-2xl leading-none text-foreground mb-3">
              Resume <span className="italic text-primary">Analyzer</span>
            </h3>
            <p className="text-[15px] text-muted-foreground max-w-sm" style={{ lineHeight: 1.6 }}>
              A careful read of your resume — and a portfolio that reads like
              it was written for you.
            </p>
          </div>
          <p className="text-[13px] text-muted-foreground">© 2026 Resume Analyzer — made with care.</p>
        </div>
      </div>
    </footer>
  );
}
