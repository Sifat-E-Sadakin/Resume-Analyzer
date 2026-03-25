import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Briefcase,
  GraduationCap,
  FolderOpen,
  Award,
  ExternalLink,
  MapPin,
  Mail,
  ArrowUp,
} from "lucide-react";
import { type TemplateProps, getInitials, PLACEHOLDER_AVATAR } from "./types";

export default function MinimalTemplate({ data }: TemplateProps) {
  return (
    <div className="bg-white text-zinc-900 min-h-full">
      {/* ── Hero Section ── */}
      <section className="relative py-20 px-8 bg-gradient-to-b from-zinc-50 to-white">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden ring-4 ring-white shadow-lg">
            <img
              src={PLACEHOLDER_AVATAR}
              alt={data.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
                const fallback = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = "flex";
              }}
            />
            <div className="absolute inset-0 bg-zinc-200 items-center justify-center text-2xl font-bold text-zinc-500" style={{ display: "none" }}>
              {getInitials(data.name)}
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl font-light tracking-tight">{data.name}</h1>
            <p className="text-lg text-zinc-500 font-medium">{data.title}</p>
          </div>

          <Separator className="max-w-24 mx-auto" />

          <p className="text-sm text-zinc-500 leading-relaxed max-w-lg mx-auto">
            {data.bio}
          </p>

          <div className="flex items-center justify-center gap-6 text-xs text-zinc-400">
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              Open to opportunities
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              Remote friendly
            </span>
          </div>
        </div>
      </section>

      {/* ── Skills Banner ── */}
      {data.skills.length > 0 && (
        <section className="border-y border-zinc-100 py-8 px-8">
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Core Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <Badge key={i} variant="outline" className="font-normal text-xs rounded-full px-3">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Experience Section ── */}
      {data.experience.length > 0 && (
        <section className="py-14 px-8">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-zinc-400" />
              <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                Professional Experience
              </h2>
            </div>

            <div className="space-y-10">
              {data.experience.map((exp, i) => (
                <div key={i} className="relative pl-6 border-l-2 border-zinc-100 space-y-1">
                  <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-zinc-300" />
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-medium text-zinc-900">{exp.role}</h3>
                    <span className="text-xs text-zinc-400 shrink-0 ml-4">
                      {exp.duration}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500 font-medium">{exp.company}</p>
                  {exp.description && (
                    <p className="text-sm text-zinc-600 leading-relaxed pt-1">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Education Section ── */}
      {data.education.length > 0 && (
        <section className="py-14 px-8 bg-zinc-50/50">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-zinc-400" />
              <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                Education
              </h2>
            </div>

            <div className="space-y-6">
              {data.education.map((edu, i) => (
                <div key={i} className="flex items-baseline justify-between">
                  <div>
                    <h3 className="font-medium text-zinc-900">{edu.degree}</h3>
                    <p className="text-sm text-zinc-500">{edu.institution}</p>
                  </div>
                  <span className="text-xs text-zinc-400 shrink-0 ml-4">{edu.year}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Projects Section ── */}
      {data.projects && data.projects.length > 0 && (
        <section className="py-14 px-8">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4 text-zinc-400" />
              <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                Projects
              </h2>
            </div>

            <div className="space-y-6">
              {data.projects.map((proj, i) => (
                <div key={i} className="space-y-1 group">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-zinc-900">{proj.name}</h3>
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-zinc-700 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Certificates Section ── */}
      {data.certificates && data.certificates.length > 0 && (
        <section className="py-14 px-8 bg-zinc-50/50">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-zinc-400" />
              <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                Certifications
              </h2>
            </div>

            <div className="space-y-4">
              {data.certificates.map((cert, i) => (
                <div key={i} className="flex items-baseline justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-zinc-900">{cert.name}</h3>
                      {cert.link && (
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-400 hover:text-zinc-700 transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-zinc-500">{cert.issuer}</p>
                  </div>
                  {cert.year && (
                    <span className="text-xs text-zinc-400 shrink-0 ml-4">{cert.year}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Footer ── */}
      <footer className="border-t border-zinc-100 py-10 px-8">
        <div className="max-w-3xl mx-auto flex items-center justify-between text-xs text-zinc-400">
          <p>&copy; {new Date().getFullYear()} {data.name}. All rights reserved.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-1 hover:text-zinc-600 transition-colors"
          >
            <ArrowUp className="w-3 h-3" />
            Back to top
          </button>
        </div>
      </footer>
    </div>
  );
}
