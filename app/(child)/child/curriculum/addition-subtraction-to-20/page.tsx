import { AdditionSubtractionTo20Preview } from "@/components/curriculum/AdditionSubtractionTo20Preview";
import { PreviewLessonShell } from "@/components/curriculum/PreviewLessonShell";

export default function AdditionSubtractionTo20PreviewPage() {
  return (
    <PreviewLessonShell
      conceptBadges={["spájanie", "uberanie", "do 20"]}
      lessonNumber="3"
      lessonSubtitle="Učíme sa spájať skupiny, uberať, posúvať sa po číselnej osi a dopĺňať do 10."
      lessonTitle="Sčítanie a odčítanie do 20"
      parentTip="Všímajte si, či dieťa spája a odoberá skupiny, nie iba háda výsledok."
      totalLessonsInPath={5}
    >
      <AdditionSubtractionTo20Preview
        nextStep={{
          href: "/child/curriculum/make-10-and-bridge-through-10",
          label: "Pokračovať na ďalšiu lekciu",
          description: "Ďalej si vyskúšaš doplnenie do 10 a prechod cez 10."
        }}
      />
    </PreviewLessonShell>
  );
}
