import { NumberLineComparisonPreview } from "@/components/curriculum/NumberLineComparisonPreview";
import { PreviewLessonShell } from "@/components/curriculum/PreviewLessonShell";

export default function NumberLineAndComparisonPreviewPage() {
  return (
    <PreviewLessonShell
      conceptBadges={["číselná os", "porovnanie", "usporiadanie"]}
      lessonNumber="2"
      lessonSubtitle="Učíme sa hľadať čísla na číselnej osi, porovnávať ich a usporiadať."
      lessonTitle="Číselná os a porovnávanie"
      parentTip="Pýtajte sa, prečo je číslo viac vpravo alebo viac vľavo."
      totalLessonsInPath={5}
    >
      <NumberLineComparisonPreview
        nextStep={{
          href: "/child/curriculum/addition-subtraction-to-20",
          label: "Pokračovať na ďalšiu lekciu",
          description: "Ďalej si vyskúšaš sčítanie a odčítanie do 20."
        }}
      />
    </PreviewLessonShell>
  );
}
