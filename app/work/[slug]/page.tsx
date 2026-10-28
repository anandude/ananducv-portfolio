import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import YouTubeEmbed from "@/components/youtube-embed"
import { caseStudies, getCaseStudy, EMPLOYER } from "@/lib/case-studies"

export const dynamicParams = false

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const study = getCaseStudy((await params).slug)
  if (!study) return {}
  return {
    title: `${study.name} — Case Study · Anandakrishnan CV`,
    description: study.oneLiner,
  }
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-sm text-muted-foreground font-mono tracking-wider uppercase">{children}</div>
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) notFound()

  const index = caseStudies.findIndex((c) => c.slug === slug)
  const prev = caseStudies[(index - 1 + caseStudies.length) % caseStudies.length]
  const next = caseStudies[(index + 1) % caseStudies.length]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 py-12 sm:py-20 space-y-16 sm:space-y-20">
        <Link
          href="/#case-studies"
          className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
        >
          <svg
            className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          All case studies
        </Link>

        <header className="space-y-6">
          <div className="text-sm text-muted-foreground font-mono tracking-wider">
            CASE STUDY / {study.year}
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight">{study.name}</h1>
            <div className="text-lg text-muted-foreground">{study.kind}</div>
          </div>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">{study.oneLiner}</p>

          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-border">
            <div className="space-y-1">
              <dt className="text-xs text-muted-foreground font-mono">CLIENT</dt>
              <dd className="text-sm">{study.sector}</dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs text-muted-foreground font-mono">MY ROLE</dt>
              <dd className="text-sm">Sole engineer — requirements to production</dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs text-muted-foreground font-mono">BUILT AT</dt>
              <dd className="text-sm">{EMPLOYER}</dd>
            </div>
          </dl>

          <div className="flex flex-wrap gap-2">
            {study.stack.map((tech) => (
              <span key={tech} className="px-3 py-1 text-xs border border-border rounded-full text-muted-foreground">
                {tech}
              </span>
            ))}
          </div>
        </header>

        <section className="space-y-4">
          <YouTubeEmbed id={study.youtubeId} title={`${study.name} walkthrough`} poster={`/case-studies/${study.slug}.jpg`} />
          <p className="text-xs text-muted-foreground">
            Recorded on a copy of the production system with all client data replaced by fictional demo data.
          </p>
        </section>

        <section className="grid lg:grid-cols-3 gap-6 lg:gap-12">
          <SectionLabel>The problem</SectionLabel>
          <ul className="lg:col-span-2 space-y-4">
            {study.problem.map((p) => (
              <li key={p} className="flex gap-4 text-muted-foreground leading-relaxed">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid lg:grid-cols-3 gap-6 lg:gap-12">
          <SectionLabel>What I built</SectionLabel>
          <p className="lg:col-span-2 text-lg text-foreground/90 leading-relaxed">{study.solution}</p>
        </section>

        <section className="space-y-8">
          <SectionLabel>Key features</SectionLabel>
          <div className="grid sm:grid-cols-2 gap-6">
            {study.features.map((f) => (
              <div key={f.group} className="p-6 border border-border rounded-lg space-y-4">
                <h3 className="font-medium">{f.group}</h3>
                <ul className="space-y-3">
                  {f.items.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <div className="space-y-2">
            <SectionLabel>Engineering decisions</SectionLabel>
            <p className="text-muted-foreground">The choices that shaped the system, and what each one cost.</p>
          </div>
          <div className="space-y-0">
            {study.decisions.map((d, i) => (
              <div key={d.title} className="grid lg:grid-cols-12 gap-4 py-8 border-b border-border/50">
                <div className="lg:col-span-1 font-mono text-sm text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="lg:col-span-11 space-y-3">
                  <h3 className="text-lg sm:text-xl font-medium">{d.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{d.why}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <span className="font-mono text-xs text-foreground/80">TRADE-OFF · </span>
                    {d.tradeoff}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <SectionLabel>Scope at a glance</SectionLabel>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-border border border-border rounded-lg overflow-hidden">
            {study.scope.map((s) => (
              <div key={s.label} className="bg-background p-5 sm:p-6 space-y-1">
                <div className={s.value.length > 6 ? "text-sm sm:text-base" : "text-2xl sm:text-3xl font-light"}>
                  {s.value}
                </div>
                <div className="text-xs text-muted-foreground font-mono">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {study.impact && study.impact.length > 0 && (
          <section className="grid lg:grid-cols-3 gap-6 lg:gap-12">
            <SectionLabel>Outcomes</SectionLabel>
            <ul className="lg:col-span-2 space-y-4">
              {study.impact.map((item) => (
                <li key={item} className="text-lg leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="grid lg:grid-cols-3 gap-6 lg:gap-12">
          <SectionLabel>What I&apos;d do differently</SectionLabel>
          <ul className="lg:col-span-2 space-y-4">
            {study.reflection.map((r) => (
              <li key={r} className="flex gap-4 text-muted-foreground leading-relaxed">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </section>

        <nav className="grid sm:grid-cols-2 gap-4 pt-8 border-t border-border">
          <Link
            href={`/work/${prev.slug}`}
            className="group p-6 border border-border rounded-lg hover:border-muted-foreground/50 transition-colors duration-300"
          >
            <div className="text-xs text-muted-foreground font-mono">PREVIOUS</div>
            <div className="mt-2 group-hover:text-muted-foreground transition-colors duration-300">{prev.name}</div>
          </Link>
          <Link
            href={`/work/${next.slug}`}
            className="group p-6 border border-border rounded-lg hover:border-muted-foreground/50 transition-colors duration-300 sm:text-right"
          >
            <div className="text-xs text-muted-foreground font-mono">NEXT</div>
            <div className="mt-2 group-hover:text-muted-foreground transition-colors duration-300">{next.name}</div>
          </Link>
        </nav>
      </main>
    </div>
  )
}
