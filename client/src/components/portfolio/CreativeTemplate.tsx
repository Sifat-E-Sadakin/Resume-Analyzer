import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  GraduationCap,
  Code2,
  Award,
  ExternalLink,
  Mail,
  Globe,
  Sparkles,
  Heart,
  ArrowUpRight,
} from "lucide-react";
import { type TemplateProps, getInitials, PLACEHOLDER_AVATAR } from "./types";

export default function CreativeTemplate({ data }: TemplateProps) {
  return (
    <div className="bg-white text-zinc-900 min-h-full">
      {/* ── Hero Section ── */}
      <section className="relative bg-gradient-to-br from-primary/90 via-primary to-violet-700 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-8 py-20">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="relative shrink-0">
              <div className="w-40 h-40 rounded-2xl overflow-hidden ring-4 ring-white/20 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
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
                <div className="absolute inset-0 bg-white/20 items-center justify-center text-3xl font-bold" style={{ display: "none" }}>
                  {getInitials(data.name)}
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-yellow-900" />
              </div>
            </div>

            <div className="space-y-4 text-center md:text-left">
              <div className="flex items-center gap-3 text-primary-foreground/70 text-sm justify-center md:justify-start">
                <Mail className="w-4 h-4" />
                <span>Available for opportunities</span>
                <span className="mx-1">·</span>
                <Globe className="w-4 h-4" />
                <span>Open to remote</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">{data.name}</h1>
              <p className="text-xl font-medium text-primary-foreground/90">
                {data.title}
              </p>
              <p className="text-sm text-primary-foreground/75 max-w-xl leading-relaxed">
                {data.bio}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills Banner ── */}
      {data.skills.length > 0 && (
        <section className="bg-zinc-50 border-b border-zinc-100 py-8 px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap gap-2 justify-center">
              {data.skills.map((skill, i) => (
                <Badge
                  key={i}
                  className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors rounded-full px-4 py-1"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Experience Section ── */}
      {data.experience.length > 0 && (
        <section className="py-16 px-8">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Experience</h2>
            </div>

            <div className="grid gap-4">
              {data.experience.map((exp, i) => (
                <Card
                  key={i}
                  className="p-6 hover:shadow-lg transition-all duration-300 border-zinc-100 hover:border-primary/20 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-primary font-medium text-sm">{exp.company}</p>
                    </div>
                    <Badge variant="secondary" className="shrink-0 rounded-full">
                      {exp.duration}
                    </Badge>
                  </div>
                  {exp.description && (
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Education Section ── */}
      {data.education.length > 0 && (
        <section className="py-16 px-8 bg-zinc-50/80">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Education</h2>
            </div>

            <div className="grid gap-4">
              {data.education.map((edu, i) => (
                <Card key={i} className="p-6 border-zinc-100">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{edu.degree}</h3>
                      <p className="text-sm text-zinc-500">{edu.institution}</p>
                    </div>
                    <Badge variant="outline" className="shrink-0 rounded-full">
                      {edu.year}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Projects Section ── */}
      {data.projects && data.projects.length > 0 && (
        <section className="py-16 px-8">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Projects</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {data.projects.map((proj, i) => (
                <Card
                  key={i}
                  className="p-6 hover:shadow-lg transition-all duration-300 border-zinc-100 hover:border-primary/20 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {proj.name}
                    </h3>
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-primary/10 transition-colors"
                      >
                        <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-primary transition-colors" />
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {proj.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Certificates Section ── */}
      {data.certificates && data.certificates.length > 0 && (
        <section className="py-16 px-8 bg-zinc-50/80">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Certifications</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {data.certificates.map((cert, i) => (
                <Card key={i} className="p-5 border-zinc-100 group hover:shadow-md transition-all">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {cert.name}
                      </h3>
                      <p className="text-sm text-zinc-500">{cert.issuer}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {cert.year && (
                        <Badge variant="outline" className="rounded-full text-xs">
                          {cert.year}
                        </Badge>
                      )}
                      {cert.link && (
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-400 hover:text-primary transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Footer ── */}
      <footer className="bg-zinc-900 text-zinc-300 py-12 px-8">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <p className="text-lg font-semibold text-white">{data.name}</p>
          <p className="text-sm text-zinc-400">{data.title}</p>
          <div className="flex items-center justify-center gap-1 text-xs text-zinc-500">
            <span>Built with</span>
            <Heart className="w-3 h-3 text-red-400 fill-red-400" />
            <span>using Resume Analyzer</span>
          </div>
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} {data.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
