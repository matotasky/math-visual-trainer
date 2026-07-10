import { QuantityNumberSensePreview } from "@/components/curriculum/QuantityNumberSensePreview";
import { PreviewLessonShell } from "@/components/curriculum/PreviewLessonShell";
import { getQuantityAndNumberSensePreviewGuard } from "@/lib/curriculum/preview-guards";

export default function QuantityAndNumberSensePreviewPage() {
  const previewGuard = getQuantityAndNumberSensePreviewGuard();

  if (!previewGuard.canRenderPreview) {
    return (
      <PreviewLessonShell
        conceptBadges={["ukážka"]}
        lessonSubtitle="Táto preview lekcia sa momentálne nedá zobraziť."
        lessonTitle="Ukážka nie je dostupná"
      >
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm font-bold leading-6 text-amber-950">
          Skús sa vrátiť na ukážkovú cestu a vybrať inú lekciu.
        </div>
      </PreviewLessonShell>
    );
  }

  return (
    <PreviewLessonShell
      conceptBadges={["množstvo", "porovnanie", "číselná os"]}
      lessonNumber="1"
      lessonSubtitle="Učíme sa rozumieť tomu, čo číslo znamená."
      lessonTitle="Množstvo a porozumenie číslam"
      parentTip="Nech dieťa ukáže prstom, kde vidí množstvo, nie iba povie číslo."
      totalLessonsInPath={5}
    >
      <QuantityNumberSensePreview
        nextStep={{
          href: "/child/curriculum/number-line-and-comparison",
          label: "Pokračovať na ďalšiu lekciu",
          description: "Ďalej si vyskúšaš číselnú os a porovnávanie."
        }}
      />
    </PreviewLessonShell>
  );
}
