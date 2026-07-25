import type { Metadata } from "next";
import Link from "next/link";
import { previewLearningPaths } from "@/data/curriculum/sk-math/preview-paths";
import { validatePreviewLearningPaths } from "@/lib/curriculum/preview-path-validation";

export const metadata: Metadata = {
  title: "Preview Learning Paths | Math Visual Trainer"
};

function StatusBadge({ status }: { status: string }) {
  const statusClassName =
    status === "active"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : "border-amber-200 bg-amber-50 text-amber-800";

  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-black uppercase ${statusClassName}`}>
      {status}
    </span>
  );
}

function LocalizedTextBlock({
  label,
  sk,
  en
}: {
  label: string;
  sk: string;
  en: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <p className="text-xs font-black uppercase tracking-wide text-slate-500">{label}</p>
      <dl className="mt-2 grid gap-2 text-sm leading-6">
        <div>
          <dt className="font-black text-slate-700">sk</dt>
          <dd className="font-semibold text-slate-900">{sk}</dd>
        </div>
        <div>
          <dt className="font-black text-slate-700">en</dt>
          <dd className="font-semibold text-slate-900">{en}</dd>
        </div>
      </dl>
    </div>
  );
}

export default function PreviewPathsPage() {
  const validationIssues = validatePreviewLearningPaths();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-950 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <p className="text-sm font-black uppercase tracking-wide text-sky-700">Internal</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">Preview Learning Paths</h1>
          <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-slate-700">
            Read-only developer overview. This page does not change child progress, diagnostics, mastery,
            Firestore, or dashboard data.
          </p>
          <Link
            className="mt-4 inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-black text-slate-800 transition hover:border-sky-300 hover:bg-sky-50"
            href="/internal/mvp-smoke-test"
          >
            Open MVP smoke test checklist
          </Link>
        </div>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-black">Validation Issues</h2>
              <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">
                Static structure checks from `validatePreviewLearningPaths()`.
              </p>
            </div>
            <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase text-slate-700">
              {validationIssues.length} issue{validationIssues.length === 1 ? "" : "s"}
            </span>
          </div>

          {validationIssues.length === 0 ? (
            <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-900">
              No validation issues found.
            </p>
          ) : (
            <ul className="mt-4 grid gap-3">
              {validationIssues.map((issue) => (
                <li
                  className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950"
                  key={`${issue.pathId}-${issue.message}`}
                >
                  <p className="font-black">{issue.pathId}</p>
                  <p className="mt-1 font-semibold">{issue.message}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-6 grid gap-5">
          {previewLearningPaths.map((path) => (
            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6" key={path.id}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-slate-500">Path id</p>
                  <h2 className="mt-1 break-words font-mono text-xl font-black text-slate-950">{path.id}</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  <StatusBadge status={path.status} />
                  <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-black uppercase text-slate-700">
                    {path.lessons.length} lesson{path.lessons.length === 1 ? "" : "s"}
                  </span>
                </div>
              </div>

              <div className="mt-5 grid gap-3 lg:grid-cols-2">
                <LocalizedTextBlock en={path.title.en} label="Title" sk={path.title.sk} />
                <LocalizedTextBlock en={path.description.en} label="Description" sk={path.description.sk} />
                <LocalizedTextBlock en={path.audienceNote.en} label="Audience note" sk={path.audienceNote.sk} />
                <LocalizedTextBlock en={path.localOnlyNote.en} label="Local-only note" sk={path.localOnlyNote.sk} />
              </div>

              {path.lessons.length > 0 ? (
                <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
                  <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                    <thead className="bg-slate-50 text-xs font-black uppercase tracking-wide text-slate-600">
                      <tr>
                        <th className="px-3 py-3">Step</th>
                        <th className="px-3 py-3">Lesson id</th>
                        <th className="px-3 py-3">Href</th>
                        <th className="px-3 py-3">Title sk</th>
                        <th className="px-3 py-3">Title en</th>
                        <th className="px-3 py-3">Skills sk/en</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {path.lessons.map((lesson) => (
                        <tr key={lesson.id}>
                          <td className="px-3 py-3 font-black text-slate-950">{lesson.step}</td>
                          <td className="px-3 py-3 font-mono text-xs font-bold text-slate-700">{lesson.id}</td>
                          <td className="px-3 py-3 font-mono text-xs font-bold text-slate-700">{lesson.href}</td>
                          <td className="px-3 py-3 font-semibold text-slate-800">{lesson.title.sk}</td>
                          <td className="px-3 py-3 font-semibold text-slate-800">{lesson.title.en}</td>
                          <td className="px-3 py-3 font-bold text-slate-700">
                            {lesson.skills.sk.length} / {lesson.skills.en.length}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-bold leading-6 text-amber-950">
                  This draft path has no lesson rows yet.
                </p>
              )}
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
