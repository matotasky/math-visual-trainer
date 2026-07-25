"use client";

/* eslint-disable @next/next/no-html-link-for-pages -- Global error UI must work without the app router. */

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="sk">
      <body className="bg-slate-50 p-4 font-sans text-slate-950">
        <main className="mx-auto flex min-h-screen max-w-xl items-center">
          <section className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-black uppercase text-sky-700">Math Visual Trainer</p>
            <h1 className="mt-2 text-3xl font-black">Niečo sa nepodarilo</h1>
            <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">
              Skús stránku načítať znova. Lokálny profil a ukážkový progres zostávajú iba v tomto prehliadači.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button className="min-h-12 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white" onClick={reset} type="button">
                Skúsiť znova
              </button>
              <a className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-800" href="/">
                Späť na domov
              </a>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
