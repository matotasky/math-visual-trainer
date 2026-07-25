import type { Metadata } from "next";
import Link from "next/link";
import { MVP_RELEASE } from "@/data/launch/mvp-release";
import { mvpSmokeTestItems, type MvpSmokeTestStatus } from "@/data/launch/mvp-smoke-test";

export const metadata: Metadata = {
  title: "MVP Smoke Test | Math Visual Trainer"
};

const statusLabels: Record<MvpSmokeTestStatus, string> = {
  blocked: "blocked",
  manual_check: "manual check",
  ready: "ready"
};

const statusClasses: Record<MvpSmokeTestStatus, string> = {
  blocked: "border-rose-200 bg-rose-50 text-rose-800",
  manual_check: "border-amber-200 bg-amber-50 text-amber-800",
  ready: "border-emerald-200 bg-emerald-50 text-emerald-800"
};

export default function MvpSmokeTestPage() {
  const statusCounts = mvpSmokeTestItems.reduce<Record<MvpSmokeTestStatus, number>>(
    (counts, item) => ({
      ...counts,
      [item.status]: counts[item.status] + 1
    }),
    {
      blocked: 0,
      manual_check: 0,
      ready: 0
    }
  );

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-950 md:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <p className="text-sm font-black uppercase tracking-wide text-sky-700">Internal</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">MVP Smoke Test</h1>
          <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-slate-700">
            Read-only manual launch checklist. This page does not write data or change child progress.
          </p>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-3">
              <dt className="font-black text-slate-600">Version</dt>
              <dd className="mt-1 font-mono font-bold text-slate-950">{MVP_RELEASE.version}</dd>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <dt className="font-black text-slate-600">Stage</dt>
              <dd className="mt-1 font-mono font-bold text-slate-950">{MVP_RELEASE.stage}</dd>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 sm:col-span-1">
              <dt className="font-black text-slate-600">Release</dt>
              <dd className="mt-1 font-bold text-slate-950">{MVP_RELEASE.title}</dd>
            </div>
          </dl>
          <Link
            className="mt-4 inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-black text-slate-800 transition hover:border-sky-300 hover:bg-sky-50"
            href="/internal/preview-paths"
          >
            Back to preview path index
          </Link>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-2">
          <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-950">
            <h2 className="text-xl font-black">Released in this candidate</h2>
            <ul className="mt-3 grid list-disc gap-2 pl-5 text-sm font-bold leading-6">
              {MVP_RELEASE.releasedFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </article>
          <article className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-rose-950">
            <h2 className="text-xl font-black">Blocked claims</h2>
            <ul className="mt-3 grid list-disc gap-2 pl-5 text-sm font-bold leading-6">
              {MVP_RELEASE.blockedClaims.map((claim) => (
                <li key={claim}>{claim}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {(["ready", "manual_check", "blocked"] as const).map((status) => (
            <article className={`rounded-2xl border p-5 shadow-sm ${statusClasses[status]}`} key={status}>
              <p className="text-sm font-black uppercase">{statusLabels[status]}</p>
              <p className="mt-2 text-4xl font-black">{statusCounts[status]}</p>
            </article>
          ))}
        </section>

        <section className="mt-6 grid gap-4">
          {mvpSmokeTestItems.map((item) => (
            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" key={item.id}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-mono text-xs font-black uppercase text-slate-500">{item.id}</p>
                  <h2 className="mt-1 text-xl font-black text-slate-950">{item.label}</h2>
                </div>
                <StatusBadge status={item.status} />
              </div>

              <dl className="mt-4 grid gap-3 text-sm leading-6">
                <div>
                  <dt className="font-black text-slate-600">Route</dt>
                  <dd className="mt-1 font-mono font-bold text-slate-900">
                    {item.route ? (
                      <Link className="underline decoration-slate-300 underline-offset-4 hover:text-sky-700" href={item.route}>
                        {item.route}
                      </Link>
                    ) : (
                      "No route"
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="font-black text-slate-600">Notes</dt>
                  <dd className="mt-1 font-semibold text-slate-800">{item.notes}</dd>
                </div>
              </dl>
            </article>
          ))}
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-rose-950">
            <h2 className="text-xl font-black">Launch claim warning</h2>
            <p className="mt-2 text-sm font-bold leading-6">
              Blocked items must not be presented as launched features.
            </p>
          </div>
          <div className="rounded-2xl border border-sky-200 bg-sky-50 p-5 text-sky-950">
            <h2 className="text-xl font-black">Local-only boundary</h2>
            <ul className="mt-3 grid gap-2 text-sm font-bold leading-6">
              <li>Local child profile is browser-local.</li>
              <li>Preview progress is browser-local.</li>
              <li>No Firestore, diagnostics, mastery, attempts, sessions, aggregates, or dashboard writes are added by this checklist.</li>
            </ul>
          </div>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-2">
          <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-950">
            <h2 className="text-xl font-black">Manual demo script</h2>
            <ol className="mt-3 grid list-decimal gap-2 pl-5 text-sm font-bold leading-6">
              <li>Open <code>/</code>.</li>
              <li>Click “Začať teraz”.</li>
              <li>On <code>/child</code>, optionally create a local profile.</li>
              <li>Open the suggested first lesson.</li>
              <li>Complete all activities.</li>
              <li>Click “Dokončiť lekciu”.</li>
              <li>Return to <code>/child/curriculum?previewCompleted=1</code>.</li>
              <li>Confirm the recommended next step changed.</li>
              <li>Clear local progress and confirm it resets only locally.</li>
            </ol>
          </article>
          <article className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-950">
            <h2 className="text-xl font-black">Do not demo as ready</h2>
            <ul className="mt-3 grid list-disc gap-2 pl-5 text-sm font-bold leading-6">
              <li>Official ŠVP alignment</li>
              <li>Account analytics</li>
              <li>Diagnostics or mastery</li>
              <li>Multi-device sync</li>
              <li>Teacher or classroom workflows</li>
            </ul>
          </article>
        </section>
      </div>
    </main>
  );
}

function StatusBadge({ status }: { status: MvpSmokeTestStatus }) {
  return (
    <span className={`inline-flex w-fit rounded-full border px-3 py-1 text-xs font-black uppercase ${statusClasses[status]}`}>
      {statusLabels[status]}
    </span>
  );
}
