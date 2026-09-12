import { Link } from '@tanstack/react-router';
import { harmonicModes, type Explanation, type HarmonicModeId, type Progression } from './data/harmonicModes';

function Header({ title }: { title: string }) {
  return (
    <header className="hero-header border-b border-cyanbrand/80">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="hero-title">{title}</h1>
        <nav aria-label="Campo harmônico" className="flex shrink-0 gap-2 pb-1 text-sm font-black tracking-widest sm:text-base">
          <Link
            to="/"
            activeProps={{ className: 'border-cyanbrand bg-cyanbrand text-black', 'aria-current': 'page' }}
            className="rounded-full border border-white/25 px-4 py-2 text-white transition hover:border-cyanbrand hover:text-cyanbrand"
          >
            MAIOR
          </Link>
          <Link
            to="/menor"
            activeProps={{ className: 'border-cyanbrand bg-cyanbrand text-black', 'aria-current': 'page' }}
            className="rounded-full border border-white/25 px-4 py-2 text-white transition hover:border-cyanbrand hover:text-cyanbrand"
          >
            MENOR
          </Link>
        </nav>
      </div>
    </header>
  );
}

function SectionHeading({ number, title }: { number: number; title: string }) {
  return (
    <div className="flex items-center gap-3 pt-4 sm:gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-cyanbrand bg-black/40 text-2xl font-black text-white sm:h-14 sm:w-14 sm:text-3xl">
        {number}
      </div>
      <h2 className="section-title">{title}</h2>
    </div>
  );
}

function NashvilleOverview({ mode }: { mode: ReturnType<typeof getMode> }) {
  return (
    <section className="mt-8">
      <SectionHeading number={1} title="Sistema Nashville de Comunicação" />
      <div className="mt-6 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <article className="rounded-3xl border border-white/15 bg-[#091117]/95 p-6 shadow-glow">
          <div className="grid grid-cols-7 gap-1 text-center text-xl font-black leading-none sm:gap-3 sm:text-4xl">
            {mode.degrees.map((degree) => <span key={degree}>{degree}</span>)}
          </div>
          <p className="body-copy mt-6 max-w-2xl sm:text-xl">
            Os números representam os graus da tonalidade e facilitam a transposição para qualquer tom.
          </p>
        </article>
        <article className="relative rounded-3xl border border-amberbrand/70 bg-[#0b1117]/95 p-6 shadow-glow">
          <div className="absolute -left-3 -top-3 flex h-12 w-12 items-center justify-center rounded-full border-2 border-amberbrand bg-[#0b1117] text-2xl text-amberbrand shadow-glow sm:-left-5 sm:-top-5 sm:h-16 sm:w-16 sm:text-4xl">★</div>
          <div className="pl-6 sm:pl-10">
            <h3 className="title-wrap text-xl font-extrabold uppercase leading-tight text-amberbrand sm:text-3xl">Tripé Harmônico</h3>
            <div className="mt-6 flex justify-between gap-2 text-center text-3xl font-black sm:mt-8 sm:gap-4 sm:text-5xl">
              {mode.triplet.map((degree) => (
                <div className="flex-1" key={degree}>
                  <div>{degree}</div>
                  <div className="mx-auto mt-3 h-1 w-16 bg-amberbrand" />
                </div>
              ))}
            </div>
            <p className="body-copy mt-5 max-w-md sm:mt-7">{mode.tripletDescription}</p>
          </div>
        </article>
      </div>
    </section>
  );
}

function ProgressionCard({ progression }: { progression: Progression }) {
  return (
    <article className="rounded-3xl border border-white/15 bg-[#091117]/95 p-4 shadow-glow sm:p-5">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-cyanbrand text-2xl text-cyanbrand sm:h-16 sm:w-16 sm:text-3xl">🎸</div>
        <div className="min-w-0 flex-1">
          <h3 className="card-title">{progression.title}</h3>
          <div className="mt-3 border-t border-dashed border-white/30" />
          <div className="mt-4 space-y-2 text-lg font-black leading-snug sm:mt-5 sm:space-y-3 sm:text-3xl">
            {progression.lines.map((line) => <p key={line}>{line}</p>)}
          </div>
          {progression.note ? <p className="body-copy mt-5 max-w-md sm:mt-6">{progression.note}</p> : null}
        </div>
      </div>
    </article>
  );
}

function Progressions({ mode }: { mode: ReturnType<typeof getMode> }) {
  return (
    <section className="mt-10">
      <SectionHeading number={2} title="Progressões Mais Comuns" />
      <div className="mt-6 grid gap-4 sm:gap-5 xl:grid-cols-2">
        {mode.progressions.map((progression) => <ProgressionCard key={progression.title} progression={progression} />)}
      </div>
    </section>
  );
}

function ExplanationCard({ explanation }: { explanation: Explanation }) {
  return (
    <article className="rounded-3xl border border-white/15 bg-[#091117]/95 p-4 shadow-glow sm:p-5">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-cyanbrand text-2xl text-cyanbrand sm:h-16 sm:w-16 sm:text-3xl">{explanation.icon}</div>
        <div>
          <h3 className="card-title">{explanation.title}</h3>
          <p className="body-copy mt-3">{explanation.copy}</p>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        <div>
          <p className="mb-2 text-base font-bold text-cyanbrand sm:text-lg">Exemplo</p>
          <div className="space-y-1 text-left text-lg font-black leading-snug sm:text-3xl">
            {explanation.example.map((line) => <p key={line}>{line}</p>)}
          </div>
        </div>
        <div>
          <p className="mb-2 text-base font-bold text-cyanbrand sm:text-lg">Legenda</p>
          {explanation.legend.map((line) => <p className="body-copy" key={line}>{line}</p>)}
        </div>
        {explanation.details.length > 0 ? (
          <div>
            <p className="mb-2 text-base font-bold text-cyanbrand sm:text-lg">Detalhes</p>
            {explanation.details.map((line) => <p className="body-copy font-bold text-white" key={line}>{line}</p>)}
          </div>
        ) : null}
      </div>
    </article>
  );
}

function Patterns({ mode }: { mode: ReturnType<typeof getMode> }) {
  return (
    <section className="mt-10">
      <SectionHeading number={3} title="Como as Músicas Escondem os Padrões" />
      <div className="mt-6 grid gap-4 sm:gap-5 xl:grid-cols-3">
        {mode.explanations.map((explanation) => <ExplanationCard key={explanation.title} explanation={explanation} />)}
      </div>
    </section>
  );
}

function getMode(mode: HarmonicModeId) {
  return harmonicModes[mode];
}

export function HarmonicPage({ mode }: { mode: HarmonicModeId }) {
  const content = getMode(mode);

  return (
    <main className="grain min-h-screen">
      <div className="mx-auto w-full max-w-[1280px] px-3 py-4 sm:px-6 lg:px-8 lg:py-8">
        <Header title={content.title} />
        <NashvilleOverview mode={content} />
        <Progressions mode={content} />
        <Patterns mode={content} />
      </div>
    </main>
  );
}
