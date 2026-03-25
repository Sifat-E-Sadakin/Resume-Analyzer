import { Badge } from "@/components/ui/badge";
import {
  Terminal,
  Code2,
  ExternalLink,
  Award,
  Github,
  ChevronRight,
  ArrowUp,
} from "lucide-react";
import { type TemplateProps, getInitials, PLACEHOLDER_AVATAR } from "./types";

export default function TechnicalTemplate({ data }: TemplateProps) {
  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-full font-mono">
      {/* ── Hero Section ── */}
      <section className="relative border-b border-zinc-800 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent" />

        <div className="relative max-w-4xl mx-auto px-8 py-16">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative shrink-0">
              <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-emerald-400/30 shadow-lg shadow-emerald-400/10">
                <img
                  src={PLACEHOLDER_AVATAR}
                  alt={data.name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                    const fallback = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
                <div className="absolute inset-0 bg-zinc-800 items-center justify-center text-2xl font-bold text-emerald-400" style={{ display: "none" }}>
                  {getInitials(data.name)}
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-zinc-950 animate-pulse" />
            </div>

            <div className="space-y-3 text-center md:text-left">
              <div className="flex items-center gap-2 text-emerald-400 text-sm justify-center md:justify-start">
                <Terminal className="w-4 h-4" />
                <span>~/portfolio</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                {data.name}
              </h1>
              <p className="text-emerald-400 text-lg">
                <span className="text-zinc-500">{">"}</span> {data.title}
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl font-sans">
                {data.bio}
              </p>
              <div className="flex items-center gap-4 text-xs text-zinc-500 pt-2 justify-center md:justify-start">
                <span className="flex items-center gap-1">
                  <Github className="w-3.5 h-3.5" />
                  Available for hire
                </span>
                <span className="text-emerald-400/50">|</span>
                <span className="text-emerald-400/70">
                  status: <span className="text-emerald-400">active</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills Banner ── */}
      {data.skills.length > 0 && (
        <section className="border-b border-zinc-800 py-6 px-8 bg-zinc-900/50">
          <div className="max-w-4xl mx-auto space-y-3">
            <p className="text-xs text-zinc-500">
              <span className="text-emerald-400">$</span> cat skills.json
            </p>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <Badge
                  key={i}
                  className="bg-zinc-800 text-emerald-400 border-zinc-700 hover:bg-zinc-700 hover:border-emerald-400/30 font-mono text-xs transition-colors"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="max-w-4xl mx-auto px-8">
        {/* ── Experience Section ── */}
        {data.experience.length > 0 && (
          <section className="py-12 space-y-6">
            <div className="flex items-center gap-2">
              <p className="text-sm text-zinc-500">
                <span className="text-emerald-400">$</span> git log --experience
              </p>
            </div>

            <div className="space-y-4">
              {data.experience.map((exp, i) => (
                <div
                  key={i}
                  className="border border-zinc-800 rounded-lg p-5 hover:border-emerald-400/30 transition-all duration-300 group bg-zinc-900/30"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h3 className="font-semibold text-lg">{exp.role}</h3>
                      </div>
                      <p className="text-emerald-400 text-sm ml-6">{exp.company}</p>
                    </div>
                    <span className="text-xs text-zinc-500 shrink-0 ml-4 bg-zinc-800 px-2 py-1 rounded">
                      {exp.duration}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-sm text-zinc-400 mt-3 leading-relaxed font-sans ml-6">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Education Section ── */}
        {data.education.length > 0 && (
          <section className="py-12 border-t border-zinc-800 space-y-6">
            <p className="text-sm text-zinc-500">
              <span className="text-emerald-400">$</span> cat education.md
            </p>

            <div className="space-y-3">
              {data.education.map((edu, i) => (
                <div
                  key={i}
                  className="border border-zinc-800 rounded-lg p-5 bg-zinc-900/30"
                >
                  <div className="flex items-baseline justify-between">
                    <div>
                      <h3 className="font-semibold">{edu.degree}</h3>
                      <p className="text-sm text-zinc-500 mt-1">{edu.institution}</p>
                    </div>
                    <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded">
                      {edu.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Projects Section ── */}
        {data.projects && data.projects.length > 0 && (
          <section className="py-12 border-t border-zinc-800 space-y-6">
            <p className="text-sm text-zinc-500">
              <span className="text-emerald-400">$</span> ls projects/
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {data.projects.map((proj, i) => (
                <div
                  key={i}
                  className="border border-zinc-800 rounded-lg p-5 hover:border-emerald-400/30 transition-all duration-300 group bg-zinc-900/30"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-emerald-400" />
                      <h3 className="font-semibold">{proj.name}</h3>
                    </div>
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-emerald-400 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Certificates Section ── */}
        {data.certificates && data.certificates.length > 0 && (
          <section className="py-12 border-t border-zinc-800 space-y-6">
            <p className="text-sm text-zinc-500">
              <span className="text-emerald-400">$</span> ls certificates/
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {data.certificates.map((cert, i) => (
                <div
                  key={i}
                  className="border border-zinc-800 rounded-lg p-5 bg-zinc-900/30 hover:border-emerald-400/30 transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Award className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                      <div>
                        <h3 className="font-semibold text-sm group-hover:text-emerald-400 transition-colors">
                          {cert.name}
                        </h3>
                        <p className="text-xs text-zinc-500 mt-1">{cert.issuer}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {cert.year && (
                        <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded">
                          {cert.year}
                        </span>
                      )}
                      {cert.link && (
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-600 hover:text-emerald-400 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-zinc-800 mt-4">
        <div className="max-w-4xl mx-auto px-8 py-8 flex items-center justify-between">
          <p className="text-zinc-500 text-xs">
            <span className="text-emerald-400">$</span> echo "Built with Resume Analyzer"
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-1 text-xs text-zinc-500 hover:text-emerald-400 transition-colors"
          >
            <ArrowUp className="w-3 h-3" />
            scroll to top
          </button>
        </div>
        <div className="border-t border-zinc-900 py-4 text-center">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} {data.name}
          </p>
        </div>
      </footer>
    </div>
  );
}
