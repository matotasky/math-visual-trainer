import Link from "next/link";
import { QuantityNumberSensePreview } from "@/components/curriculum/QuantityNumberSensePreview";
import { getQuantityAndNumberSensePreviewGuard } from "@/lib/curriculum/preview-guards";

export default function QuantityAndNumberSensePreviewPage() {
  const previewGuard = getQuantityAndNumberSensePreviewGuard();

  if (!previewGuard.canRenderPreview) {
    return (
      <section className="py-8">
        <div className="mx-auto max-w-3xl rounded-lg border border-amber-200 bg-amber-50 p-5">
          <h1 className="text-2xl font-bold text-slate-950">Ukážka nie je dostupná</h1>
          <p className="mt-2 text-sm leading-6 text-amber-950">
            Táto preview lekcia sa momentálne nedá zobraziť.
          </p>
          <BackLink />
        </div>
      </section>
    );
  }

  return (
    <section className="py-6">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl border border-sky-200 bg-sky-50 p-5 shadow-sm md:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <span className="inline-flex w-fit rounded-full bg-white px-3 py-1 text-xs font-bold uppercase text-sky-800 shadow-sm">
                Preview lekcia
              </span>
              <h1 className="mt-4 text-3xl font-black text-slate-950 md:text-5xl">
                Množstvo a porozumenie číslam
              </h1>
              <p className="mt-4 max-w-2xl text-lg font-semibold leading-8 text-slate-700">
                Učíme sa rozumieť tomu, čo číslo znamená.
              </p>
            </div>
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <p className="text-sm font-bold uppercase text-slate-500">Bez skóre</p>
              <p className="mt-1 text-sm leading-6 text-slate-700">Nebudeš hodnotený/á.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <InfoPill text="Táto lekcia je zatiaľ ukážka." />
            <InfoPill text="Dokončenie sa uloží iba v tomto prehliadači." />
            <InfoPill text="Nebudeš hodnotený/á." />
          </div>

          <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-950">
            {previewGuard.warning}
          </p>
        </div>

        <QuantityNumberSensePreview
          nextStep={{
            href: "/child/curriculum/number-line-and-comparison",
            label: "Pokračovať na ďalšiu lekciu",
            description: "Ďalej si vyskúšaš číselnú os a porovnávanie."
          }}
        />

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <BackLink />
          <p className="text-sm leading-6 text-slate-500">
            Toto je iba náhľad lekcie. Nezapisuje pokrok do účtu a nie je súčasťou diagnostiky.
          </p>
        </div>
      </div>
    </section>
  );
}

function InfoPill({ text }: { text: string }) {
  return <p className="rounded-xl bg-white p-3 text-sm font-bold leading-6 text-slate-700 shadow-sm">{text}</p>;
}

function BackLink() {
  return (
    <Link
      className="inline-flex min-h-11 w-fit items-center justify-center rounded-md bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-800"
      href="/child/curriculum"
    >
      Späť na školské učivo
    </Link>
  );
}
